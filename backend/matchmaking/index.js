const express = require("express");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");
const DatabaseManager = require("./database/matchmakingDatabase");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

const server = http.listen(port, () => {
  console.log(`Server up and running on port ${port}!`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const matchmakingRoutes = require("./routes/matchmakingRoutes.js");
const {
  playerMatcher,
  deletePlayer,
  delay,
} = require("./playerMatchingUtils/utils");

app.use("/api/matchmaking", matchmakingRoutes);

io.on("connection", (socket) => {
  console.log("In backend");
  var questions = [
    {
      question: "Select the correct answer",
      correctAnswer: "No",
      answers: ["Hi", "No", "Eat", "Sh"],
    },
    {
      question: "Select what your heart chooses",
      correctAnswer: "Noooo",
      answers: ["Hiiii", "Noooo", "Eatttt", "Shhhh"],
    },
    {
      question: "Select my answer",
      correctAnswer: "No",
      answers: ["Hi", "No", "Eat", "Sh"],
    },
    {
      question: "Select the wrong answer",
      correctAnswer: "No",
      answers: ["Hi", "No", "Eat", "Sh"],
    },
    {
      question: "correct answer",
      correctAnswer: "No",
      answers: ["Hi", "No", "Eat", "Sh"],
    },
  ];
  let rounds = 0;
  let score = 0;
  let result = 0;
  let Player = {};
  let finishedPlayers = 0;
  let room = "";
  let time = new Date();
  const gameDelay = async () => {
    await delay(25); // choose a timeout of 60 means must choose diff of like 59000
    if (new Date() - time > 20000) {
      rounds++;
      if (rounds != 5) {
        socket.emit("flashcard", questions[rounds]);
        gameDelay();
      } else {
        socket.emit("End game", { result: result, score: score });
        DatabaseManager.put(Player);
      }
    }
  };
  socket.on("Match Player", async (player) => {
    player.rating = await DatabaseManager.getRating(player);
    var matchInfo = await playerMatcher(socket, player, 10);
    var isMatched = matchInfo.matched;
    room = matchInfo.room;
    socket.join();
    if (!isMatched) {
      socket.emit("no match found");
      deletePlayer(player.username);
    } else {
      socket.emit("match found");
      await delay(10);
      Player = player;
      io.to(room).emit("flashcard", questions[0]);
      time = new Date();
      gameDelay();
    }
  });

  socket.on("answer", async (data) => {
    // here we get the database in so we find like 5 random mcqs and send them in
    rounds++;
    time = new Date();
    var increment = 0;
    if (data.gameRes) increment = 1;
    score += (increment * (60000 - data.timing)) / 1200; // the max a player can increase in a game is 50 in 1 round
    result += increment;
    if (rounds == 5) {
      console.log(score, result);
      result = result >= 3;
      if (!result) score = -1 * score;
      score = Math.floor(score);
      Player.rating += score;
      Player.rating = Math.floor(Player.rating);
      Player.result = result;
      socket.emit("Player finished", {
        result: result,
        score: score,
        room: room,
      });
      await DatabaseManager.put(Player);
    } else {
      socket.emit("flashcard", questions[rounds]);
      gameDelay();
    }
  });
  socket.on("Player finished", (data) => {
    finishedPlayers++;
    if (finishedPlayers == 3) {
      io.to(room).emit("End game");
      finishedPlayers = 0;
      rounds = 0;
      result = 0;
      room = "";
      deletePlayer(Player.username);
      socket.leave(Player.username);
      console.log("Deleted");
    } else {
      if (data == null) io.to(room).emit("Player finished");
    }
  });

  socket.on("disconnect", () => {
    deletePlayer(Player.username);
    console.log("Some player disconnected");
  });
});

module.exports = server;
