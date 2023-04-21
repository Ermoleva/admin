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
  app.delete('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const candies = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
  
    const index = candies.findIndex(candy => candy.id === id);
    if (index !== -1) {
      candies.splice(index, 1);
      fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(candies, null, 2));
      res.status(200).json({ message: 'Candy item deleted.' });
    } else {
      res.status(404).json({ message: 'Candy item not found.' });
    }
  });
  



  app.get('/api/lunch', (req, res) => {
    const dataLunch = JSON.parse(fs.readFileSync(path.join(__dirname, 'lunch.json'), 'utf8'));
    res.json(dataLunch);
  });
  app.put('/api/lunch/:id', express.json(), (req, res) => {
      const { id } = req.params;
      const updatedLunchItem = req.body;
    
      const dataLunch = JSON.parse(fs.readFileSync(path.join(__dirname, 'lunch.json'), 'utf8'));
    
      const updatedLunchData = dataLunch.map((item) => (item.id === parseInt(id) ? updatedLunchItem : item));
    
      fs.writeFileSync(path.join(__dirname, 'lunch.json'), JSON.stringify(updatedLunchData), 'utf8');
    
      res.json({ status: 'success', message: 'Data updated successfully' });
    });
  
  app.post('/api/lunch', express.json(), (req, res) => {
      const newLunchItem = req.body;
    
      const dataLunch = JSON.parse(fs.readFileSync(path.join(__dirname, 'lunch.json'), 'utf8'));
    
      dataLunch.push(newLunchItem);
    
      fs.writeFileSync(path.join(__dirname, 'lunch.json'), JSON.stringify(dataLunch), 'utf8');
    
      res.json({ status: 'success', message: 'New item added successfully' });
    });

    app.delete('/api/lunch/:id', (req, res) => {
      const id = parseInt(req.params.id);
      const lunch = JSON.parse(fs.readFileSync(path.join(__dirname, 'lunch.json'), 'utf8'));
    
      const index = lunch.findIndex(lunch => lunch.id === id);
      if (index !== -1) {
        lunch.splice(index, 1);
        fs.writeFileSync(path.join(__dirname, 'lunch.json'), JSON.stringify(lunch, null, 2));
        res.status(200).json({ message: 'Lunch item deleted.' });
      } else {
        res.status(404).json({ message: 'Lunch item not found.' });
      }
    });

  
    app.get('/api/que', (req, res) => {
      const dataQue = JSON.parse(fs.readFileSync(path.join(__dirname, 'questions.json'), 'utf8'));
      res.json(dataQue);
    });
    app.put('/api/que/:id', express.json(), (req, res) => {
        const { id } = req.params;
        const updatedQueItem = req.body;
      
        const dataQue = JSON.parse(fs.readFileSync(path.join(__dirname, 'questions.json'), 'utf8'));
      
        const updatedQueData = dataQue.map((item) => (item.id === parseInt(id) ? updatedQueItem : item));
      
        fs.writeFileSync(path.join(__dirname, 'questions.json'), JSON.stringify(updatedQueData), 'utf8');
      
        res.json({ status: 'success', message: 'Data updated successfully' });
      });
    
    app.post('/api/que', express.json(), (req, res) => {
        const newQueItem = req.body;
      
        const dataQue = JSON.parse(fs.readFileSync(path.join(__dirname, 'questions.json'), 'utf8'));
      
        dataQue.push(newQueItem);
      
        fs.writeFileSync(path.join(__dirname, 'questions.json'), JSON.stringify(dataQue), 'utf8');
      
        res.json({ status: 'success', message: 'New item added successfully' });
      });
  
      app.delete('/api/que/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const que = JSON.parse(fs.readFileSync(path.join(__dirname, 'questions.json'), 'utf8'));
      
        const index = que.findIndex(que => que.id === id);
        if (index !== -1) {
          que.splice(index, 1);
          fs.writeFileSync(path.join(__dirname, 'questions.json'), JSON.stringify(que, null, 2));
          res.status(200).json({ message: 'Question item deleted.' });
        } else {
          res.status(404).json({ message: 'Question item not found.' });
        }
      });
  

  
  
  const port = 3001;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });