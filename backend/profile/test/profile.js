const { assert } = require("chai");
require('dotenv').config()
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');

const app = require("../index");

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const generateToken = (username) => {
    return jwt.sign({
        username: username
    }, ACCESS_SECRET);  
};

describe('Testing Profile Routes', () => {
	const testUsername = "passwordis123";
	const accessToken = generateToken(testUsername);
	const profileDetails = {
		username: testUsername,
		languages: ["Japanese", "Korean"],
		proficiencies: [3, 4]
	}

	context('CREATE: /api/profile', () => {
		it('Able to create profile without error', async () => {
			const res = await chai.request(app)
				.post(`/api/profile`)
				.send(profileDetails);
			assert.ifError(res.error);
		});
	});

	context('UPDATE: /api/profile', () => {
		it('Able to update profile without error', async () => {
			const res = await chai.request(app)
				.put(`/api/profile`)
				.send(profileDetails)
				.set("Authorization", `Bearer ${accessToken}`);
			assert.ifError(res.error);
		});
	});

	context('GET: /api/profile', () => {
		it('Able to get profile details without error', async () => {
			const res = await chai.request(app)
				.get(`/api/profile`)
				.set("Authorization", `Bearer ${accessToken}`);
			assert.ifError(res.error);
		});
	});
});