const server = require("../../server");
const request = require("supertest");

describe("campaign endpoints", () => {
  it("should have the right environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  let cookie = "";

  it("should set cookie", done => {
    request(server)
      .post("/api/auth/login")
      .send({
        email: "world@zoo.com",
        password: "pass"
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .then(response => {
        cookie = response.header["set-cookie"][0];
        expect(cookie).toContain("session_cookie");
        done();
      });
  });

  it("returns an array of campaigns", () => {
    return request(server)
      .get("/api/campaigns")
      .set("Cookie", cookie)
      .set("Content-Type", "application/json")
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).not.toBe(0);
      });
  });

  it("should get campaigns by id", () => {
    return request(server)
      .get("/api/campaigns/1")
      .set("Cookie", cookie)
      .set("Content-Type", "application/json")
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("title");
      });
  });

});
