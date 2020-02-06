const server = require("../../server");
const request = require("supertest");

const ranger = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

describe("campaign endpoints", () => {
  it("should have the right environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  let cookie = "";
  let n = 20;  //used for testing delete endpoint


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
  }, 30000);

  it("returns an array of campaigns", () => {
    return request(server)
      .get("/api/campaigns")
      .set("Cookie", cookie)
      .set("Content-Type", "application/json")
      .then(res => {
        // console.log('all ', cookie);
        // console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).not.toBe(0);
      });
  }, 30000);

  it("should get campaigns by id", () => {
    return request(server)
      .get("/api/campaigns/2")
      .set("Cookie", cookie)
      .set("Content-Type", "application/json")
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("title");
      });
  }, 30000);

  it("adds new campaign correctly", () => {
    //the mule variable is used to add random letters to the data,
    //ensuring continuous running of test.

    const mule = ranger.charAt(Math.floor(Math.random() * 26)) + "gr" + ranger.charAt(Math.floor(Math.random() * 26)) + "rg";

    return request(server)
      .post("/api/campaigns")
      .send({
        title: `This is a ${mule}`,
        photo: `https://goog.com/b${mule}y`,
        description: "I really don't know",
        urgency_level: "1",
        funding_goal: "23",
        deadline: "05/07/2022",
        specie_id: "1",
        location: "Dangit"
      })
      .set("Cookie", cookie)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .then(response => {
        console.log(response.body);
        // console.log("mule", mule);
        // console.log(cookie);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("location");
      });
  }, 30000);

  it("makes changes to campaign correctly", () => {
    return request(server)
      .put("/api/campaigns/9")
      .send({
        title: "Ask me agaifn but sure",
        photo: "https://goog.com/lobg",
        description: "I really don't know",
        urgency_level: "1",
        funding_goal: "23",
        deadline: "05/07/2022",
        specie_id: "1",
        location: "Dangit"
      })
      .set("Cookie", cookie)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.title).toMatch("Ask me agaifn but sure");
      });
  });

  it("should delete campaigns", () => {
    return request(server)
      .delete(`/api/campaigns/${n}`)
      .set("Cookie", cookie)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .then(response => {
        console.log(n);
        n++;
        console.log(response.body);
        expect(response.status).toBe(202);
        expect(response.body.message).toMatch(/deleted/);
      });
  }, 3000);
});
