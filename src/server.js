import express from "express";
import path from "path";

const articlesInfo = {
  "learn-react": {
    upvotes: 0,
    comments: [],
  },
  "learn-node": {
    upvotes: 0,
    comments: [],
  },
  "my-thoughts-on-resumes": {
    upvotes: 0,
    comments: [],
  },
};

const app = express();

app.use(express.static(path.join(__dirname, "/build")));
app.use(express.json());

app.get("/api/articles/:name", (req, res) => {
  const articleName = req.params.name;
  res.status(200).send(articlesInfo[articleName]);
});

app.post("/api/articles/:name/upvote", (req, res) => {
  const articleName = req.params.name;
  articlesInfo[articleName].upvotes += 1;

  res.status(200).json(articlesInfo[articleName]);
});

app.post("/api/articles/:name/add-comment", (req, res) => {
  const { userName, text } = req.body;
  const articleName = req.params.name;
  articlesInfo[articleName].comments.push({ userName, text });

  res.status(200).send(articlesInfo[articleName]);
});

app.get("*", (req, res) => {});

app.listen(9000, () => console.log("listenning on  port 9000 "));
