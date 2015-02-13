var express = require("express"),
    app = express(),
    port = 3700,
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    flash = require("connect-flash"),
    mongoose = require("mongoose"),
    mongoController = require("./server/controllers/mongo-controller"),
    passport = require("./server/controllers/authorization-controller"),
    session = require('express-session');

mongoose.connect("mongodb://localhost:27017/newsfeed");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(__dirname + '/client'));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get("/", function (req, res){
  res.sendFile( __dirname + "/client/views/index.html");
});

app.get("/api/messages", mongoController.listMessages);
app.post("/api/messages", mongoController.createMessage);
app.post("/api/users", mongoController.createUser);
app.get("/api/nextMessages", mongoController.listNextMessages);

app.get("/login", function (req, res){
  res.sendFile( __dirname + "/client/views/login.html")
});
// })

app.get("/signup", function (req, res){
  res.sendFile( __dirname + "/client/views/signup.html")
});


app.post("/login", passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/user",
  failureFlash: true
}));

// app.post("/login", function(req, res, next) {
//   console.log(req.body);
//   res.send(200);
// })

app.get("/user", function (req, res){
  if(req.session.passport.user === undefined){
    res.redirect("/login");
  }
  else {
    res.sendFile( __dirname + "/client/views/user.html")
  }
});



var io = require('socket.io').listen(app.listen(port));

/*io.sockets.on('connection', function (socket) {
  socket.emit('message', { message: 'welcome to the chat' });
  socket.on('send', function (data) {
    io.sockets.emit('message', data);
  });
});*/


console.log("Listening on port " + port);
