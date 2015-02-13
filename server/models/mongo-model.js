var mongoose = require("mongoose");

module.exports.user = mongoose.model("User", {
  name: String,
  password: String,
  avatar: Buffer,
  messages: Array,
  mutedBy: Array

});

module.exports.message = mongoose.model("Message", {
  text: String,
  date: Date,
  author: String,
  likes: Number
})
