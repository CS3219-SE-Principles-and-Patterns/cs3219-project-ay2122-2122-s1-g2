require('dotenv').config()
const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');

const app = require("../index");
const DatabaseManager = require("../database/matchmakingDatabase.js"); 

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const generateToken = (username) => {
    return jwt.sign({
        username: username
    }, ACCESS_SECRET);  
}

describe('Testing Matchmaking Routes', () => {
	const testUsername = "testingmasta123";
	const accessToken = generateToken(testUsername);
	const profileDetails = {
		username: testUsername, 
		ratings:[{language: "Korean", rating: 1000}, {language: "Japanese", rating: 1000}, {language: "Chinese", rating: 1000}], 
		history:[]
	};
	context('INSERT: /api/matchmaking/', () => {
		it('Able to create game user without error', async () => {
			const res = await chai.request(app)
				.post(`/api/matchmaking`)
				.send(profileDetails);
			assert.ifError(res.error);
		});
	});

	context('GETALL: /api/matchmaking/getall', () => {
		it('Able to getAll game user without error', async () => {
			const res = await chai.request(app)
				.get(`/api/matchmaking/getall`)
				.send(profileDetails);
			assert.ifError(res.error);
		});
	});

	context('GET: /api/matchmaking/', () => {
		it('Able to get game user without error', async () => {
			const res = await chai.request(app)
				.get(`/api/matchmaking`)
				.set("Authorization", `Bearer ${accessToken}`)
				.send(profileDetails);
			if (!res.error && res.body.data.username != testUsername) {
				res.error = new Error("Unable to get the updated user");
			}
			assert.ifError(res.error);
		});
	});

	context('UPDATE: /api/matchmaking/', () => {
		it('Able to create game user without error', async () => {
			profileDetails.ratings[0].rating = 1099;
			const res = await DatabaseManager.put(profileDetails);
			assert.ifError(res.error);
		});
	});

	context('GETRATING: /api/matchmaking/', () => {
		it('Able to get game user rating without error', async () => {
			const res = await DatabaseManager.getRating(profileDetails);
			if (res.rating != 1099) {
				res.error = new Error("Unable to get updated rating");
			}
			assert.ifError(res.error);
		});
	});

	context('DELETE: /api/matchmaking/:username', () => {
		it('Able to delete game user without error', async () => {
			const res = await chai.request(app)
				.delete(`/api/matchmaking/${testUsername}`)
			assert.ifError(res.error);
		});
	});
});