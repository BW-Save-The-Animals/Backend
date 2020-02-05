const express = require("express");
const Campaigns = require("./campaigns_models");
const Donations = require("../donations/donations_models");
const { validateCampaignId, validateCampaign } = require("../validation");
const router = express.Router();

router.get("/", (req, res) => {
  let { title, specie_id, location } = req.body;

  Campaigns.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        message: "Unexpected server error"
      });
      console.log(error);
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

router.delete("/:id", validateCampaignId, (req, res) => {
  const { id } = req.params;
  Campaigns.remove(id)
    .then(campaign => {
      res.status(202).json(campaign);
    })
    .catch(err => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

router.post("/:id/donate", validateCampaignId, (req, res) => {

  //check campaign date before inserting a donation?
  
  Donations.insert({
    user_id: req.session.loggedInUser.id,
    campaign_id: req.campaign.id,
    donation_amount: req.body.donation_amount
  })
    .then(result => {
      res.status(202).json({
        message: "Success! You donated to a campaign"
      });
    })
    .catch(err => {
      console.log(err);
      
      res.status(500).json({ message: "Failed to insert donation" });
    });

});

module.exports = router;
