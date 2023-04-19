const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());

app.get('/api/data', (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
  res.json(data);
});
app.put('/api/data/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
  
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
  
    const updatedData = data.map((item) => (item.id === parseInt(id) ? updatedItem : item));
  
    fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(updatedData), 'utf8');
  
    res.json({ status: 'success', message: 'Data updated successfully' });
  });

app.post('/api/data', express.json(), (req, res) => {
    const newItem = req.body;
  
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
  
    data.push(newItem);
  
    fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(data), 'utf8');
  
    res.json({ status: 'success', message: 'New item added successfully' });
  });

  // В server/index.js
app.get('/api/lunch', (req, res) => {
  const lunchData = JSON.parse(fs.readFileSync(path.join(__dirname, 'lunch.json'), 'utf8'));
  res.json(lunchData);
});

app.put('/api/lunch/:id', (req, res) => {
  const lunchData = JSON.parse(fs.readFileSync(path.join(__dirname, 'lunch.json'), 'utf8'));
  const updatedItem = req.body;
  const index = lunchData.findIndex((item) => item.id === parseInt(req.params.id, 10));
  lunchData[index] = updatedItem;
  fs.writeFileSync(path.join(__dirname, 'lunch.json'), JSON.stringify(lunchData));
  res.json(updatedItem);
});

app.post('/api/lunch', (req, res) => {
  const lunchData = JSON.parse(fs.readFileSync(path.join(__dirname, 'lunch.json'), 'utf8'));
  const newItem = req.body;
  lunchData.push(newItem);
  fs.writeFileSync(path.join(__dirname, 'lunch.json'), JSON.stringify(lunchData));
  res.json(newItem);
});

  
  const port = 3001;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });