var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const cors = require("cors");

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

console.log(__dirname);
// Utils
function getPolarity(score_tag) {
  if (score_tag === "NEU") return "neutral";
  if (score_tag === "P" || score_tag === "P+") return "positive";
  if (score_tag === "N" || score_tag === "N+") return "negative";
  return "none";
}

// Variables for url and api key

const apiKey = process.env.API_KEY;
const apiLang = "en";

app.get("/", function (req, res) {
  res.send(
    "This is the server API page, you may access its services via the client app."
  );
});

// POST Route
app.post("/api", async function (req, res) {
  try {
    const url = req.body.url;
    const formdata = new FormData();
    formdata.append("key", apiKey);
    formdata.append("url", url);
    formdata.append("lang", apiLang);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    const response = await fetch(
      "https://api.meaningcloud.com/sentiment-2.1",
      requestOptions
    );
    const result = await response.json();
    return res.json({
      polarity: getPolarity(result.score_tag),
      subjectivity: result.subjectivity.toLowerCase(),
    });
  } catch (err) {
    return res.json({ error: err });
  }
});

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});
