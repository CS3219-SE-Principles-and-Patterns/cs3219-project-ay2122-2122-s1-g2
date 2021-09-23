const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const DatabaseManager = require("../database/loginDatabase.js");

const getJwtToken = (data) => {
	const ACCESS_SECRET = "67150a61ce9088f7cdddda574ef237e32acc7086c7b89cc831f3c6192aa3703abad10a241908127322e311f3528e8bc5d961aae4f9f9a14fc63736b5ffc6499e";
	return jwt.sign({
		username: data.username,
		password: data.password
	}, ACCESS_SECRET);
}

const authTokenMW = (req, res, next) => {
	const aHeader = req.headers['authorization'];
	const aToken = aHeader && aHeader.split(' ')[1];t
	if (aToken == null) {
		return res.status(401).send("Authentication token required");
	}

	jwt.verify(aToken, ACCESS_SECRET, (err, user) => {
		if (err) {
			return res.status(403).send("Access Denied: Token is no longer value");
		}
		req.user = user;
		next();
	})
} 

router.get("/", (req, res) => {
	res.json("Login Microservice");
})

router.get("/get", (req, res) => {
	DatabaseManager.getAll((data, err) => {
		if (err) {
			res.status(400).json(err);
		} else {
			res.json(data);
		}
	});
}); 

router.get("/get/:username", (req, res) => {
	DatabaseManager.get({
		username: req.params.username
	}, (data, err) => {
		if (err) {
			res.status(400).json(err);
		} else {
			res.json(data).status(200);
		}
	});
});

router.post("/login", (req, res) => {
	DatabaseManager.get({username: req.body.username}, async (data, err) => {
		if (err) {
			res.status(400).json(err);
		} else {
			const pwIsCorrect = await bcrypt.compare(req.body.password, data.password);
			if (pwIsCorrect) {
				res.json({accessToken: getJwtToken(data)});
			} else {
				res.status(400).json("Username or Password is incorrect.");
			}
			
		}
	});
});

router.post("/register", (req, res) => {
	DatabaseManager.insert(req.body, (data, err) => {
		if (err) {
			res.status(400).json(err);
		} else {
			res.json({accessToken: getJwtToken(data)});
		}
	});
});

router.put("/update", (req, res) => {
	DatabaseManager.update(req.body, (data, err) => {
		if (err) {
			res.status(400).json(err);
		} else {
			res.json({accessToken: getJwtToken(data)});
		}
	});
});

router.delete("/delete/:name", (req, res) => {
	DatabaseManager.delete({
		username: req.params.username
	}, (data, err) => {
		if (err) {
			res.send(err);
		} else {
			res.send(data);
		}
	});
});


module.exports = router;