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
      const dataQue = JSON.parse(fs.readFileSync(path.join(__dirname, 'que.json'), 'utf8'));
      res.json(dataQue);
    });
    app.put('/api/que/:id', express.json(), (req, res) => {
      const { id } = req.params;
      const updatedQueItem = req.body;
      updatedQueItem.id = parseInt(updatedQueItem.id);

      const dataQue = JSON.parse(fs.readFileSync(path.join(__dirname, 'que.json'), 'utf8'));
    
      const updatedQueData = dataQue.map((item) => (parseInt(item.id) === id ? updatedQueItem : item));
    
      fs.writeFileSync(path.join(__dirname, 'que.json'), JSON.stringify(updatedQueData), 'utf8');
    
      res.json({ status: 'success', message: 'Data updated successfully' });
    });
    
    
    app.post('/api/que', express.json(), (req, res) => {
        const newQueItem = req.body;
      
        const dataQue = JSON.parse(fs.readFileSync(path.join(__dirname, 'que.json'), 'utf8'));
      
        dataQue.push(newQueItem);
      
        fs.writeFileSync(path.join(__dirname, 'que.json'), JSON.stringify(dataQue), 'utf8');
      
        res.json({ status: 'success', message: 'New item added successfully' });
      });
  
      app.delete('/api/que/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const que = JSON.parse(fs.readFileSync(path.join(__dirname, 'que.json'), 'utf8'));
      
        const index = que.findIndex(que => que.id === id);
        if (index !== -1) {
          que.splice(index, 1);
          fs.writeFileSync(path.join(__dirname, 'que.json'), JSON.stringify(que, null, 2));
          res.status(200).json({ message: 'Question item deleted.' });
        } else {
          res.status(404).json({ message: 'Question item not found.' });
        }
      });


      app.get('/api/article', (req, res) => {
        const dataArticle = JSON.parse(fs.readFileSync(path.join(__dirname, 'article.json'), 'utf8'));
        res.json(dataArticle);
      });
      app.put('/api/article/:id', express.json(), (req, res) => {
        const { id } = req.params;
        const updatedArticleItem = req.body;
      
        const dataArticle = JSON.parse(fs.readFileSync(path.join(__dirname, 'article.json'), 'utf8'));
      
        const updatedArticleData = dataArticle.map((item) => (item.id === parseInt(id) ? updatedArticleItem : item));
      
        fs.writeFileSync(path.join(__dirname, 'article.json'), JSON.stringify(updatedArticleData), 'utf8');
      
        res.json({ status: 'success', message: 'Data updated successfully' });
      });
      
      
      app.post('/api/article', express.json(), (req, res) => {
          const newArticleItem = req.body;
        
          const dataArticle = JSON.parse(fs.readFileSync(path.join(__dirname, 'article.json'), 'utf8'));
        
          dataArticle.push(newArticleItem);
        
          fs.writeFileSync(path.join(__dirname, 'article.json'), JSON.stringify(dataArticle), 'utf8');
        
          res.json({ status: 'success', message: 'New item added successfully' });
        });
    
        app.delete('/api/article/:id', (req, res) => {
          const id = parseInt(req.params.id);
          const article = JSON.parse(fs.readFileSync(path.join(__dirname, 'article.json'), 'utf8'));
        
          const index = article.findIndex(article => article.id === id);
          if (index !== -1) {
            article.splice(index, 1);
            fs.writeFileSync(path.join(__dirname, 'article.json'), JSON.stringify(article, null, 2));
            res.status(200).json({ message: 'article item deleted.' });
          } else {
            res.status(404).json({ message: 'article item not found.' });
          }
        });
  

  
  
  const port = 3005;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });