import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './que.scss'
import Swal from 'sweetalert2';

const Que = () => {
  const [dataQue, setDataQue] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get('http://localhost:3001/api/que');
      setDataQue(result.data);
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
  
        axios
          .put(`http://localhost:3001/api/que/${id}`, updatedQueItem)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error('Error updating data:', error);
          });
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
          id: dataQue.length + 1,
          title: document.getElementById('title').value,
          description: document.getElementById('description').value
        };
      },
    }).then((result) => {
      if (result.value) {
        const newQueItem = result.value;
        setDataQue([...dataQue, newQueItem]);
  
        axios
          .post('http://localhost:3001/api/que', newQueItem)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error('Error adding new item:', error);
          });
      }
    });
  };


  const deleteQue = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/que/${id}`);
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
