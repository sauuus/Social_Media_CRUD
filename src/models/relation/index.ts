import { userModel, Post, Like, Comment, Reply } from "../index";

// User and Post association
userModel.hasMany(Post, {
  foreignKey: "user_id",
  as: "posts", //named as reference
});

Post.belongsTo(userModel, {
  foreignKey: "user_id",
  as: "user",
});

//user and comment association
userModel.hasMany(Comment, {
  foreignKey: "user_id",
  as: "comments",
});

Comment.belongsTo(userModel, {
  foreignKey: "user_id",
  as: " user",
});

// Post and Comment association
Post.hasMany(Comment, {
  foreignKey: "post_id",
  as: "comments",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  as: "post",
});

// User and Reply association
userModel.hasMany(Reply, {
  foreignKey: "user_id",
  as: "replies",
});

Reply.belongsTo(userModel, {
  foreignKey: "user_id",
  as: "user",
});

// Comment and Reply association
Comment.hasMany(Reply, {
  foreignKey: "comment_id",
  as: "replies",
});

Reply.belongsTo(Comment, {
  foreignKey: "comment_id",
  as: "comment",
});

// User and Like association
userModel.hasOne(Like, {
  foreignKey: "user_id",
  as: "like",
});

Like.belongsTo(userModel, {
  foreignKey: "user_id",
  as: "user",
});

// Post and Like association
Post.hasMany(Like, {
  foreignKey: "post_id",
  as: "likes",
});

Like.belongsTo(Post, {
  foreignKey: "post_id",
  as: "post",
});

//in userModel.js
userModel.belongsToMany(Comment, {
  through: Reply,
  foreignKey: "user_id",
  otherKey: "comment_id",
  as: "reply",
});