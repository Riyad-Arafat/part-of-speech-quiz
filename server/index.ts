import express, { Express, Request, Response } from "express";
import fs from "fs";
import { Data, WordList } from "./types";
import cors from "cors";

const app: Express = express();
const port = 5555;

app.use(cors());
app.use(express.json());
app.get("/", (_, res: Response) => {
  res.send("Hello World!");
});

// words endpoint that returns 10 random words from the list of words
app.get("/words", (_, res: Response) => {
  const data = getDate();
  const words = data.wordList;
  const randomWords: WordList[] = [];
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    // check if the word is already in the array
    if (randomWords.includes(words[randomIndex])) i--;
    else randomWords.push(words[randomIndex]);
  }
  res.send(randomWords);
});

// endpoint that calculate the rank of the score
app.post("/rank", (req: Request<{ score: number }>, res: Response) => {
  const data = getDate();
  const scores = data.scoresList;
  const score = req.body.score;
  // return bad request if score is provided as a number
  if (typeof score !== "number")
    return res.status(400).send("No score provided");
  let rank = 0;
  // loop through the scores and find the rank of the score
  for (let i = 0; i < scores.length; i++) {
    if (scores[i] < score) {
      rank++;
    }
  }
  // round the rank to the nearest hundredth.
  rank = (rank / scores.length) * 100;
  rank = Math.round(rank * 100) / 100;
  return res.json({ rank });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}/`);
});

// utlity function to get the data from the json file
const getDate = () => {
  const data = fs.readFileSync("./TestData.json", "utf8");
  const json: Data = JSON.parse(data);
  return json;
};
