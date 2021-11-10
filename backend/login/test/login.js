const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
let should = chai.should();
const ROUTE = "/api/login/";

const app = require("../index");

describe("Testing Login Routes", () => {
  const testUsername = "notjustatest";
  const testPassword = "itsalifestyle";
  const loginDetails = {
    username: testUsername,
    password: testPassword,
  };
  context("POST: /register", () => {
    it("Inserts into database with correct details", async () => {
      const res = await chai
        .request(app)
        .post(ROUTE + "register")
        .send(loginDetails);
      res.should.have.status(200);
    });

    it("Error: Throws error with already created username", async () => {
      const res = await chai
        .request(app)
        .post(ROUTE + "register")
        .send(loginDetails);
      res.should.have.status(400);
    });
  });

  context("GET: /", () => {
    it("Able to get all inserted data", async () => {
      const res = await chai.request(app).get(ROUTE);
      res.should.have.status(200);
      //res.body.data.should.have.lengthOf.above(0);
    });
  });

  context("GET: /:username", () => {
    it("Able to get specific inserted data", async () => {
      const res = await chai.request(app).get(ROUTE + testUsername);
      res.body.data.should.have.property("username").eql(testUsername);
      res.should.have.status(200);
    });
  });

  context("POST: /login", () => {
    it("Able to login with correct userdetails", async () => {
      const res = await chai
        .request(app)
        .post(ROUTE + "login")
        .send(loginDetails);
      res.should.have.status(200);
    });

    it("Unauthenticated: Throw error upon incorrect username", async () => {
      const res = await chai
        .request(app)
        .post(ROUTE + "login")
        .send({
          username: "nottheusername",
          password: testPassword,
        });
      res.should.have.status(401);
    });

    it("Unauthenticated: Throw error upon incorrect password", async () => {
      const res = await chai
        .request(app)
        .post(ROUTE + "login")
        .send({
          username: testUsername,
          password: "notthepassword",
        });
      res.should.have.status(401);
    });
  });

  context("PUT: /update", () => {
    it("Should update", async () => {
      const res = await chai
        .request(app)
        .put(ROUTE + "update")
        .send(loginDetails);
      res.should.have.status(200);
    });
    it("Error: Update with empty body", async () => {
      const res = await chai
        .request(app)
        .put(ROUTE + "update")
        .send("");
      res.should.have.status(400);
    });
  });

  context("POST: /token", () => {
    it("Successful refresh token rotation", async () => {
      const loginRes = await chai
        .request(app)
        .post(ROUTE + "login")
        .send(loginDetails);
      const refreshToken = loginRes.body.refreshToken;

      const updateRes = await chai
        .request(app)
        .post(ROUTE + "token")
        .send({ refreshToken: refreshToken });

      updateRes.should.have.status(200);
    });
    it("Unauthenticated: Empty refresh token", async () => {
      const res = await chai
        .request(app)
        .post(ROUTE + "token")
        .send({ refreshToken: "" });
      res.should.have.status(401);
    });
    it("Unauthorized: Invalid refresh token", async () => {
      const res = await chai
        .request(app)
        .post(ROUTE + "token")
        .send({ refreshToken: "Invalid" });
      res.should.have.status(403);
    });
  });

  context("POST: /verify", () => {
    it("Valid access token", async () => {
      const loginRes = await chai
        .request(app)
        .post(ROUTE + "login")
        .send(loginDetails);
      const { accessToken } = loginRes.body;

      const res = await chai
        .request(app)
        .post(ROUTE + "verify")
        .set("Authorization", `Bearer ${accessToken}`);
      res.should.have.status(200);
    });
    it("Unauthenticated: No access token", async () => {
      const res = await chai.request(app).post(ROUTE + "verify");
      res.should.have.status(401);
    });
    it("Unauthorized: Invalid access token", async () => {
      const res = await chai
        .request(app)
        .post(ROUTE + "verify")
        .set("Authorization", `Bearer invalid`);
      res.should.have.status(403);
    });
  });

  context("DELETE: /:username", () => {
    it("Able to delete without error", async () => {
      const res = await chai.request(app).delete(ROUTE + testUsername);
      res.should.have.status(200);
    });
    it("Error: Delete with invalid id", async () => {
      const res = await chai.request(app).delete(ROUTE + "invalid");
      res.should.have.status(400);
    });
  });
});
