// library imports
const express = require("express"); // imports express
const multer = require("multer"); // imports multer -- handles file upload
const bodyParser = require("body-parser"); // imports body parser -- allows us to have a body in server request
const nedb = require("@seald-io/nedb");

// *********************************************
// importing new cookie library
// *********************************************
const cookieParser = require("cookie-parser");

// *********************************************
// importing new authentication libraries
// *********************************************
const expressSession = require('express-session')
const nedbSessionStore = require('nedb-promises-session-store')
const bcrypt = require('bcrypt')

// instantiate express application
const app = express();

// more variable setups
const urlEncodedParser = bodyParser.urlencoded({ extended: true }); // set up body parser to parse request.body
const upload = multer({ dest: "public/uploads" }); // set up multer location to store files

// database setup
let database = new nedb({ filename: "database.txt", autoload: true });

// middleware setup for express application
app.use(express.static("public")); // set the default folder for any static files such as assets, css, html
app.use(urlEncodedParser); // attach body parser to app to parse request.body
app.set("view engine", "ejs"); // attach ejs as templating engine

// *********************************************
// tell the app to use the new cookie parser
// *********************************************
app.use(cookieParser());

// *********************************************
// setting up middleware libraries for auth
// *********************************************
const nedbSessionInit = nedbSessionStore({
  connect: expressSession,
  filename: 'sessions.txt'
})
app.use(expressSession({
  store: nedbSessionInit,
  cookie: {
    maxAge: 365 * 24 * 60 * 60 * 1000
  },
  secret: 'supersecret123'
}))
let userdb = new nedb({
  filename: 'userdb.txt',
  autoload: true
})

// *********************************************
// creating custom middleware
// *********************************************
function requiresAuthentication(req, res, next){
  if(req.session.loggedInUser){
    next()
  } else{
    res.redirect('/login?err=userNotLoggedIn')
  }
}

// default route
app.get("/", requiresAuthentication, (request, response) => {

  // if(request.session.loggedInUser){
    // variable that stores how many visits the page has had
    let newVisits = 1

    console.log(request.cookies)

    if(request.cookies.visits){
      // convert string from the cookie into a number
      newVisits = parseInt(request.cookies.visits) + 1
      // the date is an arbitrary date 100 years in the future, converted to ms
      response.cookie("visits", newVisits, {expires: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000)})
    } else{
      // if the cookie does not exist yet
      response.cookie("visits", newVisits, {expires: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000)})
    }

    let query = {}; // return everything in the db

    // add sorting to my posts
    let sortQuery = {
      timestamp: -1 // -1 means reverse chronological order
    }

    // adding .sort(sortQuery) in between .find() and .exec()
    database.find(query).sort(sortQuery).exec((err, data) => {
      // adding a new property to the data that is sent to my ejs 
      // this needs to be rendered in my ejs
      response.render("mainpage.ejs", { posts: data, visitsToSite: newVisits });
    });
  // } else {
  //   response.redirect('/login?err=notLoggedIn')
  // }
  
});

// route that is attached to the upload form
// uses multer middleware to parse and store image data
app.post("/upload", requiresAuthentication, upload.single("theimage"), (req, res) => {
  let currentDate = new Date(); // create date instance

  // setup structure of data that is stored in the database
  let data = {
    text: req.body.text,
    date: currentDate.toLocaleString(),
    timestamp: currentDate.getTime(),
    likes: 0,
  };

  if (req.file) {
    data.image = "/uploads/" + req.file.filename;
  }

  // ADD or INSERT the data to the database
  database.insert(data, (err, newData) => {
    res.redirect("/"); // once data has been added successfully (no error param), redirect back to / route
  });
});

// dynamic route for every page
app.get("/post/:id",  requiresAuthentication, (req, res) => {
  // look for specific item in database that has the url from the params
  let query = {
    _id: req.params.id, // _id is the property we are searching for in the db
  };

  // searching for one specific post based off the query search
  database.findOne(query, (err, data) => {
    res.render("singlePost.ejs", { post: data });
  });
});

// route that is attached to search form
app.get("/search",  requiresAuthentication, (req, res) => {
  // getting the term from the form
  let searchTerm = req.query.user;

  // using REGular EXPressions to search the text properties of the database
  let databaseSearch = {
    text: new RegExp(searchTerm),
  };

  // find all data objects that use the specific search term
  database.find(databaseSearch, (err, results) => {
    res.render("search.ejs", { searchTerm: databaseSearch });
  });
});

app.get("/searchUser", requiresAuthentication, (req, res) => {
  // getting the term from the form
  let searchTerm = req.query.searchTerm;

  if (!searchTerm) {
    return res.status(400).send("Search term is required");
  }

  // Search for the user in the user database
  userdb.findOne({ username: new RegExp(searchTerm) }, (err, user) => {
    if (err || !user) {
      console.error("User not found or database error:", err);
      return res.status(404).send("User not found");
    }

    // Fetch stock data for the found user
    database.find({ user: user.username }).sort({ date: 1 }).exec((err, stockData) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Failed to retrieve stock data");
      }

      res.json(stockData); // Send the stock data as JSON
    });
  });
});

app.post("/like",  requiresAuthentication, (req, res) => {
  let postId = req.body.postId;

  // *********************************************
  // NEW cookie data being checked and stored if not existing
  // *********************************************
  if (req.cookies[postId] == "set") {
    // if the cookie has already been set, then do not like the post
    res.redirect("/");
  } else {
    // express cookie should be set
    // key: value pair
    // key = postId
    // value = "set"
    // postId: "set"
    // expires is an arbitrary date in the future when the cookie dies
    res.cookie(postId, "set", { expires: new Date(Date.now() + 1000000000) });

    let query = {
      _id: postId,
    };

    let update = {
      // nedb specific syntax to update a numerical value
      $inc: { likes: 1 },
    };

    database.update(query, update, {}, (err, numUpdated) => {
      res.redirect("/");
    });
  }
});

// *********************************************
// adding rendering for new files
// *********************************************
app.get('/register', (req, res)=>{
  res.render('register.ejs')
})
app.get('/login', (req, res)=>{
  res.render('login.ejs')
})
// *********************************************
// adding logout functionality
// *********************************************
app.get('/logout',  requiresAuthentication, (req, res)=>{
  delete req.session.loggedInUser
  res.redirect('/login')
})

app.post('/signup', upload.single("profilePicture"), (req, res)=>{
  // first thing is to encrypt the password
  let hashedPassword = bcrypt.hashSync(req.body.password, 10)

  // the data to be added from the form into the user database
  let newUser = {
    username: req.body.username,
    fullname: req.body.fullname,
    password: hashedPasswor, // encrptyed password will be stored in db
    following: [] // Initialize with an empty array
  }

  userdb.insert(newUser, (err, insertedUser)=>{
    res.redirect('/login')
  })
})

app.post('/authenticate', (req, res)=>{
  let data = {
    username: req.body.username,
    password: req.body.password
  }

  let searchQuery = {
    username: data.username
  }

  userdb.findOne(searchQuery, (err, user)=>{
    if(err || user == null){
      // if the user not found, redirect to login
      res.redirect('/login')
    } else{
      // otherwise user successfully found
      let encPass = user.password
      if(bcrypt.compareSync(data.password, encPass)){
        let session = req.session
        session.loggedInUser = data.username
        res.redirect('/')
      } else{
        res.redirect('/login')
      }
    }
  })
})

// --- STOCK ROUTES (from your custom code) ---
app.post('/follow', requiresAuthentication, express.json(), (req, res) => {
  const loggedInUser = req.session.loggedInUser; // Get the logged-in user from the session
  const userToFollow = req.body.userToFollow; // Get the user to follow from the request body

  if (!userToFollow) {
    return res.status(400).send("User to follow is required");
  }

  // Update the logged-in user's "following" list
  userdb.update(
    { username: loggedInUser }, // Find the logged-in user
    { $addToSet: { following: userToFollow } }, // Add userToFollow to the "following" array (no duplicates)
    {},
    (err, numUpdated) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Failed to follow user");
      }
      if (numUpdated === 0) {
        return res.status(404).send("Logged-in user not found");
      }
      res.status(200).send("User followed successfully");
    }
  );
});

app.get('/following-chart1', requiresAuthentication, (req, res) => {
  const loggedInUser = req.session.loggedInUser; // Get the logged-in user from the session

  // Find the logged-in user's "following" list
  userdb.findOne({ username: loggedInUser }, (err, user) => {
    if (err || !user) {
      console.error("Database error or user not found:", err);
      return res.status(500).send("Failed to retrieve following list");
    }

    const following = user.following || []; // Get the list of followed users

    if (following.length === 0) {
      return res.status(404).send("No users being followed");
    }

    // Fetch stock data for the first followed user
    database.find({ user: following[0] }).sort({ date: 1 }).exec((err, stockData) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Failed to retrieve stock data");
      }

      res.json(stockData); // Send the stock data as JSON
    });
  });
});

app.get('/following-chart2', requiresAuthentication, (req, res) => {
  const loggedInUser = req.session.loggedInUser; // Get the logged-in user from the session

  // Find the logged-in user's "following" list
  userdb.findOne({ username: loggedInUser }, (err, user) => {
    if (err || !user) {
      console.error("Database error or user not found:", err);
      return res.status(500).send("Failed to retrieve following list");
    }

    const following = user.following || []; // Get the list of followed users

    if (following.length === 0) {
      return res.status(404).send("No users being followed");
    }

    // Fetch stock data for the first followed user
    database.find({ user: following[1] }).sort({ date: 1 }).exec((err, stockData) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Failed to retrieve stock data");
      }

      res.json(stockData); // Send the stock data as JSON
    });
  });
});
app.get('/following-chart3', requiresAuthentication, (req, res) => {
  const loggedInUser = req.session.loggedInUser; // Get the logged-in user from the session

  // Find the logged-in user's "following" list
  userdb.findOne({ username: loggedInUser }, (err, user) => {
    if (err || !user) {
      console.error("Database error or user not found:", err);
      return res.status(500).send("Failed to retrieve following list");
    }

    const following = user.following || []; // Get the list of followed users

    if (following.length === 0) {
      return res.status(404).send("No users being followed");
    }

    // Fetch stock data for the first followed user
    database.find({ user: following[2] }).sort({ date: 1 }).exec((err, stockData) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Failed to retrieve stock data");
      }

      res.json(stockData); // Send the stock data as JSON
    });
  });
});
app.get('/following-chart4', requiresAuthentication, (req, res) => {
  const loggedInUser = req.session.loggedInUser; // Get the logged-in user from the session

  // Find the logged-in user's "following" list
  userdb.findOne({ username: loggedInUser }, (err, user) => {
    if (err || !user) {
      console.error("Database error or user not found:", err);
      return res.status(500).send("Failed to retrieve following list");
    }

    const following = user.following || []; // Get the list of followed users

    if (following.length === 0) {
      return res.status(404).send("No users being followed");
    }

    // Fetch stock data for the first followed user
    database.find({ user: following[3] }).sort({ date: 1 }).exec((err, stockData) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Failed to retrieve stock data");
      }

      res.json(stockData); // Send the stock data as JSON
    });
  });
});


app.get('/personalstock', requiresAuthentication, (req, res) => {

    res.render('personalstock.ejs'); // Serialize data
 
});

app.get('/selfstock', requiresAuthentication, (req, res) => {
  database.find({user: req.session.loggedInUser}).sort({ date: 1 }).exec((err, data) => {
    console.log(data); // Log the data for debugging
    res.json(data);
  });
});
app.get('/selfstock2', requiresAuthentication, (req, res) => {
  database.find({user: 'v'}).sort({ date: 1 }).exec((err, data) => {
    console.log(data); // Log the data for debugging
    res.json(data);
  });
});


app.post('/savestock', requiresAuthentication, express.json(), (req, res) => {
  const { date, price } = req.body;
  console.log("Received data:", req.body); // Log the incoming data

  if (!date || isNaN(price)) {
    console.error("Invalid data:", req.body);
    return res.status(400).send("Invalid data");
  }
  // add user data to database to keep track of who made the post
  database.insert({ date, price: parseFloat(price), user: req.session.loggedInUser }, (err, newEntry) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Failed to save");
    }
    console.log("Saved entry:", newEntry);
    res.status(200).send("Saved");
  });
});



app.listen(6001, () => {
  // you can access your dev code via one of two URLs you can copy into the browser
  // http://127.0.0.1:6001/
  // http://localhost:6001/
  console.log("server started on port 6001");
});