const chai = require("chai");
const chaiHttp = require("chai-http");
const jwt = require('jsonwebtoken');
chai.use(chaiHttp);
const request = require('supertest');
let should = chai.should();

const app = require("../index")
const ACCESS_SECRET = "67150a61ce9088f7cdddda574ef237e32acc7086c7b89cc831f3c6192aa3703abad10a241908127322e311f3528e8bc5d961aae4f9f9a14fc63736b5ffc6499e"
const generateToken = (username) => {
    return jwt.sign({
        username: username
    }, ACCESS_SECRET);  
}

const flashcard = {
    flashcard: {
        body: "Hi",
        altText: "Anneyong",
        difficulty: 3,
        language: "Korean",
        title: "Hello world!"
    }
}

const flashcards = 
{
    "flashcards": [
        {
            "body": "Hi",
            "title": "ML",
            "language": "tagalog",
            "altText": "yolo",
            "difficulty": 5 
        }
    ]
}

describe("POST :api/flashcard", () => {
    it ("Posts a flashcard into user's database", done => {
        chai.request(app)
            .post(`/api/flashcard`)
            .set({'authorization': `Bearer ${generateToken("Ambrose")}`})
            .send(flashcards)
            .end((err, res) => {
                res.body.should.be.a('object');
                // console.log(res.body)
                done();
            })
    })
})


describe('PUT: /api/flashcard', () => {
    beforeEach((done) => {
        // just one element in database
        request(app)
            .post('/api/flashcard/')
            .set({'authorization': `Bearer ${generateToken("Anikesh")}`})
            .send(flashcards)
            .end((err, res) => {
                done();
            });
    });
    it("Puts a flashcard into user's database", done => {
        request(app)
            .put(`/api/flashcard`)
            .set({'authorization': `Bearer ${generateToken("Anikesh")}`})
            .send(flashcard)
            .end((err, res) => {
                res.body.data.flashcards.should.be.a("array")
                done();
            })
    })
})

describe('GET: /api/flashcard', () => {
    beforeEach((done) => {
        chai.request(app)
            .post('/api/flashcard/')
            .set({'authorization': `Bearer ${generateToken("Kendrew")}`})
            .send(flashcards)
            .end((err, res) => {
                done();
            });
    });

    it("should get the application in the database", (done) => {
        chai.request(app)
            .get('/api/flashcard/')
            .set({'authorization': `Bearer ${generateToken("Kendrew")}`})
            .end((err, res) => {
                res.body.data.should.be.a('array');
                done();
            })
    })
})
