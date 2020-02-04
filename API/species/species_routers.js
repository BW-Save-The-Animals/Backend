const express = require("express");
const Species = require("./species_models");
const router = express.Router();


/**
 * @swagger
 * /species/:
 *  get:
 *    summary: Get list of species
 *    description: Get list of species
 *    tags: [Species]
 *    consumes:
 *      - application/json
 *    responses:
 *      200:
 *        description: returns array of species
 */

router.get("/", (req, res) => {
  Species.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        message: "Error getting species"
      });
    });
});

module.exports = router;
