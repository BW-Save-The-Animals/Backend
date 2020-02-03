const express = require("express");
const Users = require("./users/users_models");
const Campaigns = require("./campaigns/campaigns_models");

////////////////////////////////////////////   USERS

function validateUserId(req, res, next) {
  const { id } = req.params;
  //   console.log("validate ", id);

  if (RegExp(/^\d+$/).test(id) !== true) {
    res.status(500).json({ message: "Invalid user ID" });
    return true;
  }

  Users.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
    });
}

function validateUser(req, res, next) {
  const userData = req.body;

  if (
    userData &&
    userData.name &&
    userData.email &&
    userData.password &&
    userData.about &&
    userData.user_type
  ) {
    if (
      RegExp(/^[a-zA-Z ]{3,30}$/).test(userData.name) &&
      RegExp(
        /^([a-zA-Z0-9_\-\.]{2,50})@([a-zA-Z0-9_\-\.]{2,50})\.([a-zA-Z]{2,5})$/
      ).test(userData.email) &&
      userData.password.length >= 12 &&
      userData.about.length >= 10 &&
      userData.about.length <= 200 &&
      RegExp(/^\d{1}$/).test(userData.user_type)
    ) {
      next();
    } else {
      res.status(400).json({ message: "wrong user data" });
    }
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

///////////////////// CAMPAIGNS

function validateCampaign(req, res, next) {
  const campaignData = req.body;

  if (
    campaignData &&
    campaignData.title &&
    campaignData.photo &&
    campaignData.description &&
    campaignData.urgency_level &&
    campaignData.funding_goal &&
    campaignData.deadline &&
    campaignData.specie_id
  ) {
    if (
      RegExp(/^[a-zA-Z ]{3,30}$/).test(campaignData.title) &&
      RegExp(
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
      ).test(campaignData.photo) &&
      campaignData.description.length >= 10 &&
      campaignData.description.length <= 200 &&
      RegExp(/^\d{1}$/).test(campaignData.urgency_level) &&
      RegExp(/^\d{1,10}$/).test(campaignData.funding_goal) &&
      RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/).test(campaignData.deadline) &&
      RegExp(/^\d{1}$/).test(campaignData.specie_id)
    ) {
      next();
    } else {
      res.status(400).json({ message: "wrong campaign data" });
      console.log(
        RegExp(/^[a-zA-Z ]{3,30}$/).test(campaignData.title),
        RegExp(
          /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
        ).test(campaignData.photo),
        campaignData.description.length >= 10,
        campaignData.description.length <= 200,
        RegExp(/^\d{1}$/).test(campaignData.urgency_level),
        RegExp(/^\d{1,10}$/).test(campaignData.funding_goal),
        RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/).test,
        campaignData.deadline,
        RegExp(/^\d{1}$/).test(campaignData.specie_id)
      );
    }
  } else {
    res.status(400).json({ message: "missing campaign data" });
  }
}

function validateCampaignId(req, res, next) {
  const { id } = req.params;

  if (RegExp(/^\d+$/).test(id) !== true) {
    res
      .status(500)
      .json({ message: "Invalid campaign ID,it should be an integer" });
    return true;
  }

  Campaigns.getById(id)
    .then(campaign => {
      if (campaign) {
        req.campaign = campaign;
        next();
      } else {
        res.status(400).json({ message: "invalid campaign id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
    });
}

/////////////////////////////// AUTH MIDDLEWARE

function protected(req, res, next) {
  if (req.session.loggedInUser) {
    next();
  } else {
    res.status(401).json({ message: "You shall not pass!" });
  }
}

module.exports = {
  validateUserId,
  validateUser,
  validateCampaignId,
  validateCampaign,
  protected
};
