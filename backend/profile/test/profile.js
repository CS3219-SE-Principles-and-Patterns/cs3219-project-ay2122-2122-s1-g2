require("dotenv").config();
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
let should = chai.should();
const jwt = require("jsonwebtoken");
const ROUTE = "/api/profile/";

const app = require("../index");

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const generateToken = (username) => {
  return jwt.sign(
    {
      username: username,
    },
    ACCESS_SECRET
  );
};

describe("Testing Profile Routes", () => {
  const testUsername = "passwordis123";
  const accessToken = generateToken(testUsername);
  const profileDetails = {
    username: testUsername,
    languages: ["Japanese", "Korean"],
    proficiencies: [3, 4],
  };

  context("CREATE: /", () => {
    it("Able to create profile successfully", async () => {
      const res = await chai.request(app).post(ROUTE).send(profileDetails);
      res.should.have.status(200);
    });
    it("Error: Create profile with empty body", async () => {
      const res = await chai.request(app).post(ROUTE).send("");
      res.should.have.status(401);
      res.body.should.have
        .property("error")
        .eql("Unable to get user details from database");
    });
  });

  context("UPDATE: /", () => {
    it("Able to update profile successfully", async () => {
      const res = await chai
        .request(app)
        .put(ROUTE)
        .send(profileDetails)
        .set("Authorization", `Bearer ${accessToken}`);
      res.should.have.status(200);
    });
    it("Error: Update profile with empty body", async () => {
      const res = await chai
        .request(app)
        .put(ROUTE)
        .send("")
        .set("Authorization", `Bearer ${accessToken}`);
      res.should.have.status(400);
      res.body.should.have
        .property("error")
        .eql("TypeError: Cannot read property 'length' of undefined");
    });
  });

  context("GET: /", () => {
    it("Able to get profile details successfully", async () => {
      const res = await chai
        .request(app)
        .get(ROUTE)
        .set("Authorization", `Bearer ${accessToken}`);
      res.should.have.status(200);
    });
  });
});
