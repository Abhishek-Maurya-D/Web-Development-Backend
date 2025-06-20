// Make sure package.json includes: { "type": "module" }

import express from 'express';
const app = express();
const port = 8000;

// Middleware to parse JSON
app.use(express.json());

// In-memory storage
let teaData = [];
let nextId = 1;

// POST /teas - Add a new tea
app.post('/teas', (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

app.get('/teas', (req, res) => {
  res.status(200).send(teaData)
})

// GET /teas - Return all teas
app.get('/teas', (req, res) => {
  res.send(teaData);
});

app.get('/teas/:id', (req, res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id))
  if(!tea) {
    return res.status(404).send('Tea not found')
  }
  res.status(200).send(tea)
})

// update tea
app.put('/teas/:id', (req, res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id))
  if(!tea) {
    return res.status(404).send('Tea not found')
  }
  const {name, price} = req.body
  tea.name = name
  tea.price = price
  res.send(200).send(teas)
})

// delete tea
app.delete('/teas/:id', (req, res) => {
  const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
  if(index === -1){
    return res.status(404).send('Tea not found')
  }
  teaData.splice(index, 1)
  return res.status(204).send("Tea Item deleted");
})

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
