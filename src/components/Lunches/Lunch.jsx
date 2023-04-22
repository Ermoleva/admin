import React, { useState, useEffect } from 'react';
import "./lunch.scss"
import Swal from 'sweetalert2';
import api from '../../api/api';

const Lunch = () => {
  const [dataLunch, setDataLunch] = useState([]);

  const fetchData = async () => {
    try {
      const result = (await api.get('/businesslunch')).data;
      setDataLunch(result);
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
      inputValue: fieldValue + '',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedLunchData = dataLunch.map((item) =>
          item.id === id ? { ...item, [field]: result.value } : item
        );
        setDataLunch(updatedLunchData);
  
        const updatedLunchItem = updatedLunchData.find((item) => item.id === id);

        api.post('/businesslunch/update', updatedLunchItem)
        .then(res => { console.log('buisinesslunch update', res.data) })
        .catch(err => console.error(err));
      }
    });
  };

  const handleAddNewItem = () => {
    Swal.fire({
      title: 'Add new item',
      html: `
        <input id="title" class="swal2-input" placeholder="Title">
        <input id="description1" class="swal2-input" placeholder="Description1">
        <input id="description2" class="swal2-input" placeholder="Description2">
        <input id="description3" class="swal2-input" placeholder="Description3">
        <input id="gram" class="swal2-input" placeholder="Gram">
        <input id="kcal" class="swal2-input" placeholder="Kcal">
        <input id="price" class="swal2-input" placeholder="Price">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const price = document.getElementById('price').value;
  
        return {
          title: document.getElementById('title').value,
          description1: document.getElementById('description1').value,
          description2: document.getElementById('description2').value,
          description3: document.getElementById('description3').value,
          gram: document.getElementById('gram').value,
          kcal: document.getElementById('kcal').value,
          price: price,
        };
      },
    }).then((result) => {
      if (result.value) {
        const newItem = result.value;
        setDataLunch([...dataLunch, newItem]);
  
        api.post('/businesslunch/create', newItem)
        .then(res => { 
          newItem.id = res.data.id;
          console.log('buisinesslunch create', res.data)
        })
        .catch(err => console.error(err));
      }
    });
  };


  const deleteLunch = async (id) => {
    try {
      await api.post('/businesslunch/delete', { id });
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
          <p className='lunch__text' onClick={() => handleFieldClick(item.id, 'gram', item.gram)}>Gram: {item.gram}</p>
          <p className='lunch__text' onClick={() => handleFieldClick(item.id, 'description1', item.description1)}>{item.description1}</p>
          <p className='lunch__text' onClick={() => handleFieldClick(item.id, 'description2', item.description2)}>{item.description2}</p>
          <p className='lunch__text' onClick={() => handleFieldClick(item.id, 'description3', item.description3)}>{item.description3}</p>
          <p className='lunch__text' onClick={() => handleFieldClick(item.id, 'kcal', item.kcal)}>Kcal: {item.kcal}</p>
          <p className='lunch__text' onClick={() => handleFieldClick(item.id, 'price', item.price)}>Price: {item.price}</p>
          {/* <p className='lunch__text' onClick={() => handleFieldClick(item.id, 'count', item.count)}>Count: {item.count}</p>
          <p className='lunch__text' onClick={() => handleFieldClick(item.id, 'priceTotal', item.priceTotal)}>Price Total: {item.priceTotal}</p> */}
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
