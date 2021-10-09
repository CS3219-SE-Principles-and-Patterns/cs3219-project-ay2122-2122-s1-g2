const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const app = require("../index");

describe('Testing Login Routes', () => {
	const testUsername = "notjustatest";
	const testPassword = "itsalifestyle";
	const loginDetails = { 
		username: testUsername,
		password: testPassword
	};
	context('POST: /api/login/register', () => {
		it('Inserts into database with correct details', async () => {
			const res = await chai.request(app)
				.post(`/api/login/register`)
				.send(loginDetails);
			assert.ifError(res.error);
		});

		it('Throws error with already created username', async () => {
			const res = await chai.request(app)
				.post(`/api/login/register`)
				.send(loginDetails);
			assert.ifError(!res.error);
		});
	});

	context('GET: /api/login/', () => {
		it('Able to get all inserted data', async () => {
			const res = await chai.request(app)
				.get(`/api/login`);
			if (!res.error && res.body.data.length == 0) {
				res.error = new Error("Unable to get any data in request body...");
			}
			assert.ifError(res.error);
		});
	});

	context('GET: /api/login/:username', () => {
		it('Able to get specific inserted data', async () => {
			const res = await chai.request(app)
				.get(`/api/login/${testUsername}`);
			if (!res.error && res.body.data.username != testUsername) {
				res.error = new Error("Unable to get the inserted user");
			}
			assert.ifError(res.error);
		});
	});

	context('POST: /api/login/login', () => {
		it('Able to login with correct userdetails', async () => {
			const res = await chai.request(app)
				.post(`/api/login/login`)
				.send(loginDetails);
			assert.ifError(res.error);
		});

		it('Throw error upon incorrect username', async () => {
			const res = await chai.request(app)
				.post(`/api/login/login`)
				.send({ 
					username: "nottheusername",
					password: testPassword
				});
			assert.ifError(!res.error);
		});

		it('Throw error upon incorrect password', async () => {
			const res = await chai.request(app)
				.post(`/api/login/login`)
				.send({ 
					username: testUsername,
					password: "notthepassword"
				});
			assert.ifError(!res.error);
		});
	});

	context('PUT: /api/login/update', () => {
		it('Should update with accessToken', async () => {
			const loginRes = await chai.request(app)
				.post(`/api/login/login`)
				.send(loginDetails);
			const accessToken = loginRes.body.accessToken;
			const res = await chai.request(app)
				.put(`/api/login/update`)
				.send(loginDetails)
				.set("Authorization", `Bearer ${accessToken}`);
			assert.ifError(res.error);
		});

		it('Should not update without accessToken', async () => {
			const res = await chai.request(app)
				.put(`/api/login/update`)
				.send(loginDetails)
			assert.ifError(!res.error);
		});
	});

	context('POST: /api/login/token', () => {
		it('Should get accessToken from refreshToken & be able to update', async () => {
			const loginRes = await chai.request(app)
				.post(`/api/login/login`)
				.send(loginDetails);
			const refreshToken = loginRes.body.refreshToken;

			const tokenRes = await chai.request(app)
				.post(`/api/login/token`)
				.send({refreshToken: refreshToken});
			const accessToken = tokenRes.body.accessToken;

			const updateRes = await chai.request(app)
				.put(`/api/login/update`)
				.send(loginDetails)
				.set("Authorization", `Bearer ${accessToken}`);

			assert.ifError(updateRes.error);
		});
	});

	context('DELETE: /api/login/:username', () => {
		it('Able to delete without error', async () => {
			const res = await chai.request(app)
				.delete(`/api/login/${testUsername}`);
			assert.ifError(res.error);
		});
	});
});