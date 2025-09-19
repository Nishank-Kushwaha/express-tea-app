import express from "express";

const app = express();

app.use(express.json());

let teaData = [];
let nextId = 1;

// Add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;

  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// Get all teas
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// Get a tea by ID
app.get("/teas/:id", (req, res) => {
  const { id } = req.params;

  const tea = teaData.find((t) => t.id === parseInt(id));
  if (tea) {
    res.status(200).send(tea);
  } else {
    res.status(404).send(`Tea with the id ${id} not found`);
  }
});

// Update a tea by ID
app.put("/teas/:id", (req, res) => {
  const { id } = req.params;

  const tea = teaData.find((t) => t.id === parseInt(id));

  if (!tea) {
    res.status(404).send(`Tea with the id ${id} not found`);
  }

  const { name, price } = req.body;

  if (name) tea.name = name;
  if (price) tea.price = price;

  res.status(200).send(tea);
});

// Delete a tea by ID
app.delete("/teas/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = teaData.length;

  teaData = teaData.filter((t) => t.id !== parseInt(id));
  if (teaData.length < initialLength) {
    res.status(200).send(`Tea with the id ${id} deleted successfully`);
  } else {
    res.status(404).send(`Tea with the id ${id} not found`);
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✔️ Server is running on http://127.0.0.1:${PORT}`);
});
