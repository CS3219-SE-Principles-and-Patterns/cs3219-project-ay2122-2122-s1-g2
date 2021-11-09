const chai = require("chai");
const chaiHttp = require("chai-http");
const jwt = require("jsonwebtoken");
chai.use(chaiHttp);
let should = chai.should();
const ROUTE = "/api/flashcard/";

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

const testUsername = "mastatesta123";
const accessToken = generateToken(testUsername);

const flashcard = {
  username: testUsername,
  title: "randomtitle",
  difficulty: 1,
  language: "Japanese",
  description: "what in the world",
  flashcards: [
    {
      body: "card1",
      alt: "altText1",
      notes: "notes1",
    },
    {
      body: "card2",
      alt: "altText2",
      notes: "notes2",
    },
  ],
};

describe("Testing Flashcard Routes", () => {
  var id;
  context("POST: /", () => {
    it("Able to create flashcard successfully", async () => {
      const res = await chai
        .request(app)
        .post(ROUTE)
        .set("Authorization", `Bearer ${accessToken}`)
        .send(flashcard);
      res.should.have.status(200);
      id = res.body.data._id;
    });
    it("Error: Create flashcard with same title", async () => {
      const res = await chai
        .request(app)
        .post(ROUTE)
        .set("Authorization", `Bearer ${accessToken}`)
        .send(flashcard);
      res.should.have.status(400);
      res.body.should.have
        .property("error")
        .eql("Sorry! Similar card already exists");
    });
  });

  context("PUT: /", () => {
    it("Able to update flashcard successfully", async () => {
      const updatedCard = {
        _id: id,
        title: "newTitle",
        flashcards: [
          {
            body: "card1",
            alt: "altText1",
            notes: "notes1",
          },
          {
            body: "card2",
            alt: "altText2",
            notes: "notes2",
          },
          {
            body: "card3",
            alt: "altText3",
            notes: "notes3",
          },
        ],
      };
      const res = await chai
        .request(app)
        .put(ROUTE)
        .set("Authorization", `Bearer ${accessToken}`)
        .send(updatedCard);
      res.should.have.status(200);
      res.body.data.should.have.property("title").eql("newTitle");
      res.body.data.flashcards.should.be.a("array");
      res.body.data.flashcards.should.have.lengthOf(3);
    });
    it("Error: Update with empty body", async () => {
      const res = await chai
        .request(app)
        .put(ROUTE)
        .set("Authorization", `Bearer ${accessToken}`)
        .send("");
      res.should.have.status(400);
      res.body.should.have
        .property("error")
        .eql("Sorry! Such a card does not exist");
    });
  });

  context("GET: /", () => {
    it("Able to get all flashcards without error", async () => {
      const res = await chai
        .request(app)
        .get(ROUTE)
        .set("Authorization", `Bearer ${accessToken}`);
      res.should.have.status(200);
      res.body.data.should.be.a("array");
    });
  });

  context("GET : /:id", () => {
    it("Able to get single flashcard without error", async () => {
      const res = await chai
        .request(app)
        .get(ROUTE + id)
        .set("Authorization", `Bearer ${accessToken}`);
      res.should.have.status(200);
    });
  });

  context("DELETE : :id", () => {
    it("Able to delete single flashcard without error", async () => {
      const res = await chai
        .request(app)
        .delete(ROUTE + id)
        .set("Authorization", `Bearer ${accessToken}`);
      res.should.have.status(200);
    });
    it("Error: Delete with invalid id", async () => {
      const res = await chai
        .request(app)
        .delete(ROUTE + "123")
        .set("Authorization", `Bearer ${accessToken}`);
      res.should.have.status(400);
      res.body.should.have
        .property("error")
        .eql(
          "TypeError: Argument passed in must be a Buffer or string of 12 bytes or a string of 24 hex characters"
        );
    });
  });
});
