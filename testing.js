// const express = require("express");
// const Users = require("./users/users_models");
// const Campaigns = require("./campaigns/campaigns_models");

// ////////////////////////////////////////////

// function validateUserId(req, res, next) {
//   const { id } = req.params;
//   //   console.log("validate ", id);

//   if (RegExp(/^\d+$/).test(id) !== true) {
//     res.status(500).json({ message: "Invalid user ID" });
//     return true;
//   }

//   Users.getById(id)
//     .then(user => {
//       if (user) {
//         req.user = user;
//         next();
//       } else {
//         res.status(400).json({ message: "invalid user id" });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ message: "error" });
//     });
// }

// function validateUser(req, res, next) {
//   const campaignData = req.body;

//   if (
//     campaignData &&
//     campaignData.title &&
//     campaignData.photo &&
//     campaignData.password &&
//     campaignData.about &&
//     campaignData.urgency_type
//   ) {
//     if (
//       RegExp(/^[a-zA-Z ]{3,30}$/).test(campaignData.title) &&
//       RegExp(
//         /^([a-zA-Z0-9_\-\.]{2,50})@([a-zA-Z0-9_\-\.]{2,50})\.([a-zA-Z]{2,5})$/
//       ).test(campaignData.photo) &&
//       campaignData.password.length >= 12 &&
//       campaignData.about >= 10 &&
//       campaignData.about <= 200 &&
//       RegExp(/^\d{1}$/).test(campaignData.urgency_type)
//     ) {
//       next();
//     } else {
//       res.status(400).json({ message: "wrong user data" });
//     }
//   } else {
//     res.status(400).json({ message: "missing user data" });
//   }
// }

// ///////////////////// CAMPAIGNS

// function validateCampaign(req, res, next) {
//   const campaignData = req.body;

//   if (
//     campaignData &&
//     campaignData.title &&
//     campaignData.photo &&
//     campaignData.description &&
//     campaignData.urgency_level &&
//     campaignData.funding_goal &&
//     campaignData.deadline
//   ) {
//     if (
//       RegExp(/^[a-zA-Z ]{3,30}$/).test(campaignData.title) &&
//       RegExp(
//         /^([a-zA-Z0-9_\-\.]{2,50})@([a-zA-Z0-9_\-\.]{2,50})\.([a-zA-Z]{2,5})$/
//       ).test(campaignData.photo) &&
//       campaignData.description >= 10 &&
//       campaignData.description <= 200 &&
//       RegExp(/^\d{1}$/).test(campaignData.urgency_level) &&
//       RegExp(/^\d{1,10}$/).test(campaignData.funding_goal) &&
//       RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/).test(campaignData.deadline)
//     ) {
//       next();
//     } else {
//       res.status(400).json({ message: "wrong campaign data" });
//     }
//   } else {
//     res.status(400).json({ message: "missing campaign data" });
//   }
// }

// function validateCampaignId(req, res, next) {
//   const { id } = req.params;

//   if (RegExp(/^\d+$/).test(id) !== true) {
//     res
//       .status(500)
//       .json({ message: "Invalid campaign ID,it should be an integer" });
//     return true;
//   }

//   Campaigns.getById(id)
//     .then(campaign => {
//       if (campaign) {
//         req.campaign = campaign;
//         next();
//       } else {
//         res.status(400).json({ message: "invalid campaign id" });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ message: "error" });
//     });
// }

// module.exports = {
//   validateUserId,
//   validateUser,
//   validateCampaign,
//   validateCampaignId
// };
