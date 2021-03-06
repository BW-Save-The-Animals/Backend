const express = require("express");
const Users = require("./users/users_models");
const Campaigns = require("./campaigns/campaigns_models");
const jwt = require("jsonwebtoken");

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
    campaignData.specie_id &&
    campaignData.location
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
        RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/).test(campaignData.deadline),
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
      .json({ message: "Invalid campaign ID, it should be an integer" });
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
      res.status(500).json({ message: "Unexpected server error" });
    });
}

function validateEmail(req, res, next) {
  const newUser = req.body;

  Users.getByEmail({ email: newUser.email })
    .then(data => {
      if (!data) {
        //checks if email exists. Next, if not.
        next();
      } else {
        throw new Error("User with email already exists");
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
}

/////////////////////////////// AUTH MIDDLEWARE

function restricted(req, res, next) {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    // if (req.session.loggedInUser) {
    return res.status(401).json({ message: "You shall not pass!" });
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET || "thesecret",
    // callback (err, decodedToken)
    (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "token bad" });
      } else {
        // let's put the decoded token on req
        req.decodedToken = decoded;
      }
    }
  );
  next();
}

//////////////////////////////////////  DONATIONS

function validateDonation(req, res, next) {
  const donationData = req.body;

  if (donationData && donationData.donation_amount) {
    if (RegExp(/^\d{1,12}$/).test(donationData.donation_amount)) {
      next();
    } else {
      res.status(400).json({ message: "wrong donation data" });
    }
  } else {
    res.status(400).json({ message: "missing donation data" });
  }
}

///////////////////////////////////////////   PERKS

function validatePerk(req, res, next) {
  const perkData = req.body;

  if (perkData && perkData.title && perkData.description && perkData.amount) {
    if (
      RegExp(/^[a-zA-Z ]{3,20}$/).test(perkData.title) &&
      RegExp(/^[a-zA-Z ]{3,30}$/).test(perkData.description) &&
      perkData.description.length >= 10 &&
      perkData.description.length <= 200 &&
      RegExp(/^\d{1,12}$/).test(perkData.amount)
    ) {
      next();
    } else {
      res.status(400).json({ message: "wrong perk data" });
    }
  } else {
    res.status(400).json({ message: "missing perk data" });
  }
}

///////////////////////////////////////////

function validateBoughtPerk(req, res, next) {
  const boughtPerkData = req.body;

  if (boughtPerkData && boughtPerkData.perk_id) {
    if (RegExp(/^\d{1,12}$/).test(boughtPerkData.perk_id)) {
      next();
    } else {
      res.status(400).json({ message: "wrong bought perk data" });
    }
  } else {
    res.status(400).json({ message: "missing perk data" });
  }
}

module.exports = {
  validateUserId,
  validateUser,
  validateCampaignId,
  validateCampaign,
  validateEmail,
  restricted,
  validateDonation,
  validatePerk,
  validateBoughtPerk
};
