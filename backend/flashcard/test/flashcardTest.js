const chai = require("chai");
const { assert } = require("chai");
const chaiHttp = require("chai-http");
const jwt = require("jsonwebtoken");
chai.use(chaiHttp);
let should = chai.should();
const ROUTE = "/api/flashcard/";

const app = require("../index");
<<<<<<< HEAD
const ACCESS_SECRET = process.env.ACCESS_SECRET;
=======
const ACCESS_SECRET =
  "67150a61ce9088f7cdddda574ef237e32acc7086c7b89cc831f3c6192aa3703abad10a241908127322e311f3528e8bc5d961aae4f9f9a14fc63736b5ffc6499e";
>>>>>>> ambrose
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
<<<<<<< HEAD
  context("POST: /", () => {
    it("Able to create flashcard without error", async () => {
      const res = await chai
        .request(app)
        .post(ROUTE)
        .set("Authorization", `Bearer ${accessToken}`)
        .send(flashcard);
      res.should.have.status(200);
      id = res.body.data._id;
    });
  });

  context("PUT: /", () => {
=======
  context("POST: /api/flashcard", () => {
    it("Able to create flashcard without error", async () => {
      const res = await chai
        .request(app)
        .post(`/api/flashcard`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send(flashcard);

      id = res.body.data._id;
      assert.ifError(res.error);
    });
  });

  context("PUT: /api/flashcard", () => {
>>>>>>> ambrose
    it("Able to update flashcard without error", async () => {
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
  });
});
