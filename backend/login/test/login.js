const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const app = require("../index");

describe('Testing Login Routes', () => {
	const testUsername = "notjustatest";
	const testPassword = "itsalifestyle";
	console.log(testUsername);
	context('POST: /api/login/register', () => {
		it('Inserts into database', done => {
			chai.request(app)
				.post(`/api/login/register`)
				.send({ 
					"username": testUsername,
					"password": testPassword
				})
				.then((res) => {
					if (res.error) {
						// console.log(res);
						done(res.error.text);
					} else {
						done();
					}
				});
		});
	});

	context('GET: /api/login/', () => {
		it('Able to get all inserted data', done => {
			chai.request(app)
				.get(`/api/login`)
				.then((res) => {
					if (res.error) {
						done(res.error.text);
					} else if (res.body.data.length > 0) {
						done();
					} else {
						done("Unable to get data in request body...")
					}
				});
		});
	});

	context('GET: /api/login/:username', () => {
		it('Able to get specific inserted data', done => {
			chai.request(app)
				.get(`/api/login/${testUsername}`)
				.then((res) => {
					if (res.error) {
						done(res.error.text);
					} else if (res.body.data.username == testUsername) {
						done();
					} else {
						done("Unable to get the inserted user");
					}
				});
		});
	});

	context('POST: /api/login/login', () => {
		it('Able to login', done => {
			chai.request(app)
				.post(`/api/login/login`)
				.send({ 
					username: testUsername,
					password: testPassword
				})
				.then((res) => {
					if (res.error) {
						done(res.error.text);
					} else {
						done();
					}
				});
		});
	});

	context('DELETE: /api/login/:username', () => {
		it('Able to delete without error', done => {
			chai.request(app)
				.delete(`/api/login/${testUsername}`)
				.then((res) => {
					if (res.error) {
						done(res.error.text);
					} else {
						done();
					}
				});
		});
	});
});