var User = require("../models/mongo-model").user;
var Message = require("../models/mongo-model").message;
var moment = require("moment");

module.exports.createUser = function (req , res) {
  var user = new User(req.body);
  user.save(function (error, result){
    res.json(result);
  });
}

module.exports.createMessage = function (req, res) {
  var message = new Message(req.body);
  message.date = moment().format();
  message.save(function (error, result){
    res.json(result);
  });
}

module.exports.listMessages = function (req, res) {

  Message.find({}, {"text":1, "author":1, "likes":1, "_id":0}, {skip: 0, limit: 20, sort: {date: -1}}, function (err, result){
    res.json(result);
  })
}

module.exports.listNextMessages = function (req, res) {

  Message.find({}, {"text":1, "author":1, "likes":1, "_id":0}, {skip: 20, limit: 20, sort: {date: -1}}, function (err, result){
    res.json(result);
  })
}
