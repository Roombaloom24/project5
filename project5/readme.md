// library imports
const express = require("express"); // imports express
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

EXAMPLE...

// more variable setups
const urlEncodedParser = bodyParser.urlencoded({ extended: true }); // set up body parser to parse request.body

// database setup
let database = new nedb({ filename: "database.txt", autoload: true });

// middleware setup for express application
app.use(express.static("public")); // set the default folder for any static files such as assets, css, html
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json()); // Ensure JSON body parsing is applied globally
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
}));
let userdb = new nedb({
  filename: 'userdb.txt',
  autoload: true
});

function requiresAuthentication(req,res,next){
  if (req.session.loggedInUser){
    next()
  } else {
    res.redirect('/login?err=userNotLoggedIn')
  }
};

// default route
app.get("/",(request, response) => {


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
 
  // variable that stores how many visits the page has had
  
});


// dynamic route for every page
app.get("/post/:id", (req, res) => {
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
app.get("/search", (req, res) => {
  // getting the term from the form
  let searchTerm = req.query.searchTerm;

  // using REGular EXPressions to search the text properties of the database
  let databaseSearch = {
    text: new RegExp(searchTerm),
  };

  // find all data objects that use the specific search term
  database.find(databaseSearch, (err, results) => {
    res.render("search.ejs", { posts: results });
  });
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

app.get('/logout', (req,res)=>{
  delete req.session.loggedInUser
  res.redirect('/login')
})
app.post('/signup', (req, res)=>{
  // Check if password exists in the request body
  console.log(req.body);
  if (!req.body.password) {
    console.error("Password is missing in the request body");
    return res.status(400).send("Password is required");
  }

  // first thing is to encrypt the password
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);

  // the data to be added from the form into the user database
  let newUser = {
    username: req.body.username,
    fullname: req.body.fullname,
    password: hashedPassword // encrypted password will be stored in db
  };

  userdb.insert(newUser, (err, insertedUser)=>{
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).send("Error creating user");
    }
    console.log("User successfully inserted:", insertedUser);
    res.redirect('/login');
  });
});

app.post('/authenticate', (req, res) => {
  let data = {
    username: req.body.username,
    password: req.body.password
  };

  let searchQuery = {
    username: data.username
  };

  userdb.findOne(searchQuery, (err, user) => {
    if(err || user == null){
      res.redirect('/login')
      return; // <--- Add this line!
    }
      // ...rest of code
   

    // Check if the password matches
    let encPass = user.password;
    if (bcrypt.compareSync(data.password, encPass)) {
      let session = req.session;
      session.loggedInUser = data.username;
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  
  });
});


app.get('/personalstock',requiresAuthentication, (req, res) => {
  database.find({}).sort({ date: 1 }).exec((err, data) => {
   
    console.log(data); // Log the data for debugging
    res.render('personalstock.ejs', { stockData:data}); // Serialize data
  });
});

app.get('/selfstock', (req, res) => {
  // find needs to use the session.loggedInUser as the search
  database.find({}).sort({ date: 1 }).exec((err, data) => {
   //search here(USER)
    console.log(data); // Log the data for debugging
    res.json(data);
  });
});


app.post('/savestock', express.json(), (req, res) => {
  const { date, price } = req.body;
  console.log("Received data:", req.body); // Log the incoming data

  if (!date || isNaN(price)) {
    console.error("Invalid data:", req.body);
    return res.status(400).send("Invalid data");
  }
  // add user data to database to keep track of who made the pose
  // you can use session.loggedInUser IN THE INSERT 
  database.insert({ date, price: parseFloat(price), user: session.loggedInUser}, (err, newEntry) => {
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
  
  console.log("server started on port 6001,  http://127.0.0.1:6001");
});
// LOOK AT CLASS 25 laod and save, coudl be a way to do this!!!