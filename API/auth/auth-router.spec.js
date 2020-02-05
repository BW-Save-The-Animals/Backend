// const server = require("../api/server");
// const request = require("supertest");

// describe("users routes", () => {
// 	it("should had environment var correctly set", () => {
// 		expect(process.env.DB_ENV).toBe("testing");
// 	});

// 	it("should return a register", () => {
// 		return request(server)
// 			.post("/api/auth/register")
// 			.send({
// 				username: "random" + new Date().getTime(),
// 				password: "12345"
// 			})
// 			.set("Content-Type", "application/json")
// 			.set("Accept", "application/json")
// 			.then(result => {
// 				expect(result.status).toBe(201);
// 				expect(result.header["content-type"]).toMatch(/json/);
// 			});
// 	});
// 	it("should return a token", () => {
// 		return request(server)
// 			.post("/api/auth/login")
// 			.send({
// 				username: "abc",
// 				password: "12345"
// 			})
// 			.set("Content-Type", "application/json")
// 			.set("Accept", "application/json")
// 			.then(result => {
// 				expect(result.body.token.length).toBeGreaterThan(50);
// 				expect(result.status).toBe(200);
// 			});
// 	});
// 	it("should get jokes", async () => {
// 		const login = await request(server)
// 			.post("/api/auth/login")
// 			.send({
// 				username: "abc",
// 				password: "12345"
// 			})
// 			.set("Content-Type", "application/json");

// 		const jokes = await request(server)
// 			.get("/api/jokes")
// 			.set("Content-Type", "application/json")
// 			.set("Authorization", login.body.token);

// 		expect(jokes.body.length).toBe(20);
// 		expect(jokes.body[0].id).toBe("0189hNRf2g");
// 	});
// });
