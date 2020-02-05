const express = require("express");
const Users = require("./users_models");
const Campaigns = require("../campaigns/campaigns_models");
const router = express.Router();
const { validateUserId, validateUser } = require("../validation");

router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        message: error
      });
    });
});

router.get("/campaigns", (req, res) => {
  const { id } = req.session.loggedInUser;
  console.log(id);
  Campaigns.getUserCampaigns(id)
    .then(campaigns => {
      res.status(200).json(campaigns);
    })
    .catch(err => {
      res.status(500).json({
        message: "something went wrong,could not retrieve the campaigns"
      });
      console.log(err);
    });
});

router.get("/:id", validateUserId, (req, res) => {
  Users.getByCampaign_Id(req.user.id)
    .then(camp => {
      res.status(200).json({ ...req.user, camp });
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong" });
    });
});

module.exports = router;
