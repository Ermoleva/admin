import React, { useState, useEffect } from 'react';
import './que.scss'
import Swal from 'sweetalert2';
import api from '../../api/api';

const Que = () => {
  const [dataQue, setDataQue] = useState([]);

  const fetchData = async () => {
    try {
      const result = (await api.get('/faq')).data;
      setDataQue(result);
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
        const updatedQueData = dataQue.map((item) =>
          item.id === id ? { ...item, [field]: result.value } : item
        );
        setDataQue(updatedQueData);
  
        const updatedQueItem = updatedQueData.find((item) => item.id === id);

        api.post('/faq/update', updatedQueItem)
        .then(res => { console.log('faq update', res.data) })
        .catch(err => console.error(err));
      }
    });
  };

  const handleAddNewItem = () => {
    Swal.fire({
      title: 'Add new question',
      html: `
        <input id="title" class="swal2-input" placeholder="Title">
        <input id="description" class="swal2-input" placeholder="Description">
        
      `,
      focusConfirm: false,
      preConfirm: () => {
        
        return {
          title: document.getElementById('title').value,
          description: document.getElementById('description').value
        };
      },
    }).then((result) => {
      if (result.value) {
        const newQueItem = result.value;
        setDataQue([...dataQue, newQueItem]);
  
        api.post('/faq/create', newQueItem)
        .then(res => { 
          newQueItem.id = res.data.id;
          console.log('faq create', res.data)
        })
        .catch(err => console.error(err));
      }
    });
  };


  const deleteQue = async (id) => {
    try {
      await api.post('/faq/delete', { id });
      fetchData();
    } catch (error) {
      console.error("Error deleting que:", error);
    }
  };
  
  
  

  return (
    <div className="que">
      <div className="que__top">
        <h1 >Вопросы</h1>
        <button className='que__add' onClick={handleAddNewItem}>+ Добавить новый продукт</button>
        </div>
      {dataQue.map((item) => (
        <div key={item.id} className="item">
          <h2 className='que__title' onClick={() => handleFieldClick(item.id, 'title', item.title)}>{item.title}</h2>
          <p className='que__text' onClick={() => handleFieldClick(item.id, 'description', item.description)}>{item.description}</p>
          
          <button
            className="que__del"
            onClick={() => deleteQue(item.id)}
          >
            X Удалить
          </button>
        </div>
      ))}
    </div>
  );
  
};

export default Que;
