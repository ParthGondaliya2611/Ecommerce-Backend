import app from "./app.js";
const port = 3030;

app.listen(port, () => {
  console.log(`server is working on http://localhost:${port}`);
});
