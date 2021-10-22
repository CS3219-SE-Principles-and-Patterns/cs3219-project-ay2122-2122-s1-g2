const chai = require("chai");
const { assert } = require("chai");
const chaiHttp = require("chai-http");
const jwt = require('jsonwebtoken');
chai.use(chaiHttp);
// const request = require('supertest');
let should = chai.should();

const app = require("../index")
const ACCESS_SECRET = "67150a61ce9088f7cdddda574ef237e32acc7086c7b89cc831f3c6192aa3703abad10a241908127322e311f3528e8bc5d961aae4f9f9a14fc63736b5ffc6499e"
const generateToken = (username) => {
    return jwt.sign({
        username: username
    }, ACCESS_SECRET);  
}

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
            notes: "notes1"
        },
        {
            body: "card2",
            alt: "altText2",
            notes: "notes2"
        }
    ]
}

describe('Testing Flashcard Routes', () => {
    var id;
    context('POST: /api/flashcard', () => {
		it('Able to create flashcard without error', async () => {
			const res = await chai.request(app)
				.post(`/api/flashcard`)
                .set("Authorization", `Bearer ${accessToken}`)
				.send(flashcard);

            id = res.body.data._id;
			assert.ifError(res.error);
		});
	});

    context('PUT: /api/flashcard', () => {
		it('Able to update flashcard without error', async () => {
            const updatedCard = {
                _id: id,
                title: "newTitle",
                flashcards: [
                    {
                        body: "card1",
                        alt: "altText1",
                        notes: "notes1"
                    },
                    {
                        body: "card2",
                        alt: "altText2",
                        notes: "notes2"
                    },
                    {
                        body: "card3",
                        alt: "altText3",
                        notes: "notes3"
                    }
                ]
            }
			const res = await chai.request(app)
				.put(`/api/flashcard`)
                .set("Authorization", `Bearer ${accessToken}`)
				.send(updatedCard);

            if (res.body.data.title != "newTitle") {
                res.error = new Error("Failed to update flashcard title");
            }

            res.body.data.flashcards.should.be.a("array");
            if (res.body.data.flashcards.length != 3) {
                res.error = new Error("Failed to update flashcard cards");
            }
			assert.ifError(res.error);
		});
	});

    context('GET: /api/flashcard', () => {
		it('Able to get all flashcards without error', async () => {
			const res = await chai.request(app)
				.get(`/api/flashcard`)
                .set("Authorization", `Bearer ${accessToken}`);

            res.body.data.should.be.a("array");
			assert.ifError(res.error);
		});
	});

    context('GET : /api/flashcard/:id', () => {
        it('Able to get single flashcard without error', async () => {
			const res = await chai.request(app)
				.get(`/api/flashcard/${id}`)
                .set("Authorization", `Bearer ${accessToken}`);
			assert.ifError(res.error);
		});
    })

    context('DELETE : /api/flashcard/:id', () => {
        it('Able to delete single flashcard without error', async () => {
			const res = await chai.request(app)
				.delete(`/api/flashcard/${id}`)
                .set("Authorization", `Bearer ${accessToken}`);

			assert.ifError(res.error);
		});
    })
});
