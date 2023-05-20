import React, { useState, useEffect } from 'react';
import "./article.scss"
import Swal from 'sweetalert2';
import api from '../../api/api';
import tokens from '../../api/tokens';

const Article = () => {
  const [dataArticle, setDataArticle] = useState([]);

  const fetchData = async () => {
    try {
      const result = (await api.get('/blog')).data;
      // const result = await axios.get('http://localhost:3005/api/article');
      setDataArticle(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFieldClick = (id, field, fieldValue) => {
    Swal.fire({
      input: 'textarea',
      inputValue: fieldValue,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedArticleData = dataArticle.map((item) =>
          item.id === id ? { ...item, [field]: result.value } : item
        );
        setDataArticle(updatedArticleData);
  
        const updatedArticleItem = updatedArticleData.find((item) => item.id === id);
  
        api.post('/blog/update', updatedArticleItem)
        .then(res => { console.log('blog update', res.data) })
        .catch(err => console.error(err));
      }
    });
  };

  const handleAddNewItem = () => {
    Swal.fire({
      title: 'Add new Article',
      html: `
        <input id="title" class="swal2-input" placeholder="Title">
        <input id="info1" class="swal2-input" placeholder="info1">
        <input id="info2" class="swal2-input" placeholder="info2">
       
        <input id="info3" class="swal2-input" placeholder="info3">
        
      `,
      focusConfirm: false,
      preConfirm: () => {
        
        return {
          title: document.getElementById('title').value,
          info1: document.getElementById('info1').value,
          info2: document.getElementById('info2').value,
          info3: document.getElementById('info3').value
        };
      },
    }).then((result) => {
      if (result.value) {
        const newArticleItem = result.value;
        setDataArticle([...dataArticle, newArticleItem]);
  
        api.post('/blog/create', newArticleItem)
        .then(res => { 
          newArticleItem.id = res.data.id;
          console.log('blog create', res.data)
        })
        .catch(err => console.error(err));
      }
    });
  };


  const deleteArticle = async (id) => {
    try {
      await api.post('/blog/delete', { id });
      fetchData();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };
  
  function submitForm(e, item, imageId) {
    e.preventDefault();
    const files = document.querySelector(`.article #article${item.id} .image-input${imageId}`);
    if (!files) throw "No file";
    const formData = new FormData();
    formData.append("files", files.files[0]);
    fetch(api.getUri()+"/blog/image/"+item.id+"-"+imageId, {
        method: 'POST',
        headers: { 'Authorization': tokens.getToken() },
        body: formData,
    }).then((res) => {
        res.json().then(j => {
            setTimeout(() => {
                console.log('added file', j);
                fetchData();
            }, 500);
        })
    })
    .catch((err) => console.log("Error occured", err));
  }
  

  return (
    <div className="article">
        <div className="article__top">
            <h2 className="article__name">Статьи</h2>
        <button className='article__add' onClick={handleAddNewItem}>+ Добавить статью</button>
        </div>
      {dataArticle.map((item) => (
        <div key={item.id} id={'article'+item.id} className="item">
          <h2 className='article__title' onClick={() => handleFieldClick(item.id, 'title', item.title)}>{item.title}</h2>
          <p className='article__text' onClick={() => handleFieldClick(item.id, 'info1', item.info1)}>{item.info1}</p>
          <div className="candy__image_container">
            <img src={!item.image1 ? '' : (api.getUri() + '/blog/image/' + item.image1)}
              className="uploaded-image" alt="No image" width={250}/>
            <input className="image-input image-input1" type="file" 
              onChange={(e) => submitForm(e, item, 1)} />
          </div>
          
          <p className='article__text' onClick={() => handleFieldClick(item.id, 'info2', item.info2)}>{item.info2}</p>
          <div className="candy__image_container">
            <img src={!item.image2 ? '' : (api.getUri() + '/blog/image/' + item.image2)}
              className="uploaded-image" alt="No image" width={250}/>
            <input className="image-input image-input2" type="file" 
              onChange={(e) => submitForm(e, item, 2)} />
          </div>

          <p className='article__text' onClick={() => handleFieldClick(item.id, 'info3', item.info3)}>{item.info3}</p>
          <div className="candy__image_container">
            <img src={!item.image3 ? '' : (api.getUri() + '/blog/image/' + item.image3)}
              className="uploaded-image" alt="No image" width={250}/>
            <input className="image-input image-input3" type="file" 
              onChange={(e) => submitForm(e, item, 3)} />
          </div>
          
          <button
            className="article__del"
            onClick={() => deleteArticle(item.id)}
          >
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
  
};

export default Article;
