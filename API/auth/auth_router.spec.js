const server = require("../../server");
const request = require("supertest");

jest.useFakeTimers();

describe("users routes", () => {
  it("should have environment var correctly set", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  let cookie = "";

  it("should register user and return it back a register", done => {
    request(server)
      .post("/api/auth/register")
      .send({
        email: "random" + new Date().getTime() + "@gmail.com",
        password: "012345678912",
        name: "Random",
        user_type: 1,
        about: "this is a example about statement"
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .then(result => {
        expect(result.status).toBe(201);
        expect(result.header["content-type"]).toMatch(/json/);
        expect(result.body.name).toMatch(/Random/);
        done();
      });
  });

  it("should return a cookie", done => {
    request(server)
      .post("/api/auth/login")
      .send({
        email: "rodrigograca31@gmail.com",
        password: "12345"
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .then(result => {
        cookie = result.header["set-cookie"][0];
        // console.log(cookie);
        expect(result.status).toBe(200);
        expect(cookie).toContain("session_cookie");
        expect(cookie.length).toBeGreaterThan(50);

        done();
      });
  });

  it("should get campaigns", done => {
    request(server)
      .get("/api/users/campaigns")

      .set("Cookie", cookie)
      .set("Content-Type", "application/json")
      .then(result => {
        expect(result.body).toBeInstanceOf(Array);
        expect(result.body.length).toBe(1);
        done();
      });
  });
});
