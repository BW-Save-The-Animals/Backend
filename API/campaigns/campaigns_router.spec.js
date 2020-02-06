const server = require("../../server");
const request = require("supertest");

describe("server.js module", () => {
  describe("campaign endpoints", () => {
    it("returns 200 http status code", async () => {
      const login = await request(server)
        .get("/api/campaigns")
        .set("Accept-Language", "en")
        .set("Cookie", [
          "session_cookie=s%3APKY0fh0kcfC1hjKhfRFVpUpFvwgmEIGv.m5pzdEw%2FsbAQxf28gtIdDAdWVeV8G4kwzi1%2BFm00ALI"
        ])
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });
});
