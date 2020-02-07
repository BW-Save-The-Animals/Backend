const express = require("express");
const Campaigns = require("./campaigns_models");
const Donations = require("../donations/donations_models");
const Perks = require("../perks/perks_models");
const {
  validateCampaignId,
  validateCampaign,
  validateDonation,
  validatePerk,
  validateBoughtPerk
} = require("../validation");
const router = express.Router();

router.get("/", (req, res) => {
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
  Perks.getByCampaign_Id(req.campaign.id)
    .then(perks => {
      Campaigns.total_Perks_Per_Campaign(req.campaign.id).then(
        PerksCampTotal => {
          Campaigns.total_Donations_Per_Campaigns(req.campaign.id).then(
            donatedCampTotal => {
              var sum = Object.values(
                donatedCampTotal ? donatedCampTotal : [0]
              ).map(function(num, idx) {
                return (
                  parseInt(num) +
                  parseInt(
                    Object.values(PerksCampTotal ? PerksCampTotal : [0])[idx]
                  )
                );
              });
              res.status(200).json({
                ...req.campaign,
                perks,
                total_Amount_Received_For_This_Campaign: sum[0]
              });
            }
          );
        }
      );
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong" });
    });
});

router.post("/", validateCampaign, (req, res) => {
  const campaignData = req.body;
  campaignData.user_id = req.decodedToken.user.id;

  Campaigns.insert(campaignData)
    .then(newCampaign => {
      res.status(200).json(newCampaign);
    })
    .catch(err => res.status(500).json({ message: "Unexpected server error" }));
});

router.put("/:id", validateCampaignId, validateCampaign, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Campaigns.update(changes, id)
    .then(data => {
      Campaigns.getById(id).then(updatedCampaign => {
        res.status(200).json(updatedCampaign);
      });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update campaign" });
    });
});

router.delete("/:id", validateCampaignId, (req, res) => {
  const { id } = req.params;
  Campaigns.remove(id)
    .then(campaign => {
      res.status(202).json({ message: `Campaign with id ${id} deleted.` });
    })
    .catch(err => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

router.post("/:id/donate", validateCampaignId, validateDonation, (req, res) => {
  //check campaign date before inserting a donation?
  const { donation_amount } = req.body;

  Donations.insert({
    user_id: req.decodedToken.user.id,
    campaign_id: req.campaign.id,
    donation_amount
  })
    .then(result => {
      res.status(202).json({
        message: `Success! You donated ${donation_amount} to the '${req.campaign.title}' campaign`
      });
    })
    .catch(err => {
      console.log(err);

      res.status(500).json({ message: "Failed to insert donation" });
    });
});

/////////////////////////////////////// TO CREATE A PERK

router.post("/:id/perks", validateCampaignId, validatePerk, (req, res) => {
  const perksData = req.body;

  Perks.insert({
    title: perksData.title,
    description: perksData.description,
    amount: perksData.amount,
    campaign_id: req.campaign.id
  })
    .then(newCampaign => {
      res.status(200).json(newCampaign);
    })
    .catch(err => res.status(500).json({ message: "Unexpected server error" }));
});

///////////////////////////////////// TO BUY A PERK

router.post(
  "/:id/buy_perks",
  validateCampaignId,
  validateBoughtPerk,
  (req, res) => {
    const SelectedPerksData = req.body;

    Perks.buyPerk({
      user_id: req.decodedToken.user.id,
      perk_id: SelectedPerksData.perk_id
    })
      .then(newBoughtPerk => {
        res.status(200).json(newBoughtPerk);
        console.log(newBoughtPerk);
      })
      .catch(err => {
        res.status(500).json({ message: "Unexpected server error" });
        console.log(err);
      });
  }
);

module.exports = router;
