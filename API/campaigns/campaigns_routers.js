const express = require("express");
const Campaigns = require("./campaigns_models");
const { validateCampaignId, validateCampaign } = require("../validation");
const router = express.Router();

router.get("/", (req, res) => {
  Campaigns.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        message: "Unexpected server error"
      });
    });
});

router.get("/:id", validateCampaignId, (req, res) => {
  res.status(200).json(req.campaign);
});

router.post("/", validateCampaign, (req, res) => {
  const campaignData = req.body;
  campaignData.user_id = req.session.loggedInUser.id;

  Campaigns.insert(campaignData)
    .then(newCampaign => {
      res.status(200).json(newCampaign);
    })
    .catch(err =>
      res.status(500).json({ message: "Unexpected server error" })
    );
});

router.put("/:id", validateCampaignId, validateCampaign, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Campaigns.update(changes, id)
    .then(data => {
        Campaigns.getById(id)
          .then(updatedCampaign => { 
            res.status(200).json(updatedCampaign);
          })
      })
    .catch(err => {
      res.status(500).json({ message: "Failed to update campaign" });
    });
});

module.exports = router;
