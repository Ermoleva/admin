import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./lunch.scss"
import Swal from 'sweetalert2';

const Lunch = () => {
  const [dataLunch, setDataLunch] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get('http://localhost:3001/api/lunch');
      setDataLunch(result.data);
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
        const updatedLunchData = dataLunch.map((item) =>
          item.id === id ? { ...item, [field]: result.value } : item
        );
        setDataLunch(updatedLunchData);
  
        const updatedLunchItem = updatedLunchData.find((item) => item.id === id);
  
        axios
          .put(`http://localhost:3001/api/lunch/${id}`, updatedLunchItem)
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
      title: 'Add new item',
      html: `
        <input id="title" class="swal2-input" placeholder="Title">
        <input id="description" class="swal2-input" placeholder="Description">
        <input id="gram" class="swal2-input" placeholder="Gram">
        <input id="kcal" class="swal2-input" placeholder="Kcal">
        <input id="price" class="swal2-input" placeholder="Price">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const price = document.getElementById('price').value;
  
        return {
          id: dataLunch.length + 1,
          title: document.getElementById('title').value,
          description: document.getElementById('description').value,
          gram: document.getElementById('gram').value,
          kcal: document.getElementById('kcal').value,
          price: price,
          count: 0,
          priceTotal: price,
        };
      },
    }).then((result) => {
      if (result.value) {
        const newItem = result.value;
        setDataLunch([...dataLunch, newItem]);
  
        axios
          .post('http://localhost:3001/api/lunch', newItem)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error('Error adding new item:', error);
          });
      }
    });
  };


  const deleteLunch = async (id) => {
    try {
      await axios.delete(`/api/lunch/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting lunch:", error);
    }
  };
  
  

  return (
    <div className="lunch">
      <div className="lunch__top">
        <h1 className="lunch__name">Ланч</h1>
        <button className='lunch__add' onClick={handleAddNewItem}>+ Добавить новый продукт</button>
        </div>
      {dataLunch.map((item) => (
        <div key={item.id} className="item">
          <h2 className='lunch__title' onClick={() => handleFieldClick(item.id, 'title', item.title)}>{item.title}</h2>
          <p className='lunch__text' onClick={() => handleFieldClick(item.id, 'gram', item.gram)}>Gram: {item.proteins}</p>
          <p className='lunch__text' onClick={() => handleFieldClick(item.id, 'description', item.description)}>{item.description}</p>
          <p className='lunch__text' onClick={() => handleFieldClick(item.id, 'kcal', item.kcal)}>Kcal: {item.kcal}</p>
          <p className='lunch__text' onClick={() => handleFieldClick(item.id, 'price', item.price)}>Price: {item.price}</p>
          <p className='lunch__text' onClick={() => handleFieldClick(item.id, 'count', item.count)}>Count: {item.count}</p>
          <p className='lunch__text' onClick={() => handleFieldClick(item.id, 'priceTotal', item.priceTotal)}>Price Total: {item.priceTotal}</p>
          <button
            className="lunch__del"
            onClick={() => deleteLunch(item.id)}
          >
            X Удалить
          </button>
        </div>
      ))}
    </div>
  );
  
};

export default Lunch;
