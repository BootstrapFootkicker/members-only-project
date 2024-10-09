const userController = require("./userController");
const express = require("express");

exports.grantAccess = async (answer, user, res, req) => {
  if (answer === "2") {
    await userController.addAdminStatus(user);
    res.redirect("/");
  } else {
    req.flash("error_msg", "Invalid input");
    console.log("Invalid input");
    res.redirect("/adminPage");
  }
};
