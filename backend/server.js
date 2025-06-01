const app = require("./app");
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Backend running on Vercel');
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
