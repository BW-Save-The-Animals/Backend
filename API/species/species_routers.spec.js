const server = require("../../server");
const request = require("supertest");

jest.useFakeTimers();

describe("users routes", () => {
  it("should get species", done => {
    request(server)
      .get("/api/species")
      // .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .then(result => {
        expect(result.body).toBeInstanceOf(Array);
        expect(result.body.length).toBe(8);
        done();
      });
  });
});
