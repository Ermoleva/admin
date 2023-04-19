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
app.listen(3001, () => console.log('Server running on port 3001'));
