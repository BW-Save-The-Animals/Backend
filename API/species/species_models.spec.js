jest.useFakeTimers();

const db = require("../../database/db_config");
const Species = require("./species_models");
const SPECIES = "species";

// beforeEach(async () => {
// 	await db(SPECIES).truncate();
// });

describe("Species model", () => {
  describe("insert()", () => {
    // it("inserts the correct number of species", async () => {
    // 	// setup
    // 	await Species.insert({ specie_name: "Cat 2" });
    // 	const hobbits = await db(SPECIES);
    // 	// assertion
    // 	expect(hobbits).toHaveLength(9);
    // });

    it("can find a specie in the db", async () => {
      const allSpecies = await Species.get();
      expect(allSpecies[0]).toMatchObject({ id: 1, specie_name: "Cat" });
      expect(allSpecies[7]).toMatchObject({ id: 8, specie_name: "Fish" });
    });
  });
});
