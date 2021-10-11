const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');

const app = require("../index");

const ACCESS_SECRET = "67150a61ce9088f7cdddda574ef237e32acc7086c7b89cc831f3c6192aa3703abad10a241908127322e311f3528e8bc5d961aae4f9f9a14fc63736b5ffc6499e";
const generateToken = (username) => {
    return jwt.sign({
        username: username
    }, ACCESS_SECRET);  
};

describe('Testing Profile Routes', () => {
	const testUsername = "passwordis123";
	const accessToken = generateToken(testUsername);
	const profileDetails = {
		languages: ["Japanese", "Korean"],
		proficiencies: [3, 4]
	}

	context('CREATE: /api/profile', () => {
		it('Able to create profile without error', async () => {
			const res = await chai.request(app)
				.post(`/api/profile`)
				.send(profileDetails)
				.set("Authorization", `Bearer ${accessToken}`);
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