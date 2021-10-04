const jwt = require('jsonwebtoken');
require('dotenv').config()

const Flashcard = require("../models/flashcard.js");

const authTokenMW = (req, res) => {
    //const ACCESS_SECRET = process.env.ACCESS_SECRET;
    const ACCESS_SECRET = "67150a61ce9088f7cdddda574ef237e32acc7086c7b89cc831f3c6192aa3703abad10a241908127322e311f3528e8bc5d961aae4f9f9a14fc63736b5ffc6499e";
	const aHeader = req.headers['authorization'];
    const aToken = aHeader && aHeader.split(' ')[1];
    if (aToken == null) {
		return res.status(401).send("User ");
	}
    userCred = {}
	jwt.verify(aToken, ACCESS_SECRET, (err, user) => {
		if (err) {
			return res.status(403).send("Access Denied: Token is no longer valid");
		}
        userCred = user;
	})
    return userCred;
}

exports.get = (req, res) => {
    const user = authTokenMW(req, res);
    if (!user) return;
    Flashcard.findOne({username: user.username}, (err, flashCard) => {
        if (err) {
            res.status(400).json({
                message: "Error",
                error: err
            });
        } else {
            res.json({
                message: "Success",
                data: flashCard.flashcards
            });
        }
    });
}
/*
Sample post request
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
*/
exports.create = (req, res) => {
    var flashcard = Flashcard();
    const user = authTokenMW(req, res);
    if (!user) return;
    flashcard.username = user.username;
    flashcard.flashcards = req.body.flashcards ? req.body.flashcards : [];
    Flashcard.findOne({username: user.username}, (err, oldUserCard) => {
        if (err) {
            res.status(400).json({
                message: "Error",
                error: err
            })
        } else if (!oldUserCard) {
            // no such profile exists so we just put it in
            flashcard.save((err) => {
                if (err) {
                    res.status(400).json({
                        message: "Error",
                        error: err
                    })
                } else {
                    res.json({
                        message: "Success",
                        data: flashcard
                    })
                }
            })
        } else {
            oldUserCard.flashcards = req.body.flashcards ? req.body.flashcards: oldUserCard.flashcards;
            oldUserCard.save((err) => {
                if (err) {
                    res.status(400).json({
                        message: "Update failed",
                        error: err
                    })
                } else {
                    res.json({
                        message: "Flashcards updated",
                        data: oldUserCard.flashcards
                    })
                }
            })
        }
    })   
}

/*
Sample request for putting new flashcard:
{
    "flashcard": {
        "body": "Hi",
        "altText: "Anneyong",
        "difficulty": 3,
        "language": "Korean",
        "title": "Hello world!"
    }
}
*/
exports.put = (req, res) => {
    const user = authTokenMW(req, res);
    if (!user) return;
    var flashCard = req.body.flashcard;
    Flashcard.findOne({username: user.username}, (err, userCard) => {
        if (err) {
            res.status(400).json({
                message: "Error",
                error: err
            })
        } else {
            // assumes user already exists
            userCard.flashcards.push(flashCard);
            userCard.save((err) => {
                if (err) {
                    res.status(400).json({
                        message: "Error",
                        error: err
                    });
                } else {
                    res.json({
                        message: "Update successful",
                        data: userCard
                    });
                }
            })
        }
    });
}

// need to implement delete flashcard functionality
