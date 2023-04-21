import React, { useState, useEffect } from 'react';
import axios from 'axios';
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


  const deleteLunch = async (id) => {
    try {
      await axios.delete(`/api/que/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting que:", error);
    }
  };
  
  

  return (
    <div className="admin-panel">
        <button onClick={handleAddNewItem}>Add new item</button>
      {dataQue.map((item) => (
        <div key={item.id} className="item">
          <h2 onClick={() => handleFieldClick(item.id, 'title', item.title)}>{item.title}</h2>
          <p onClick={() => handleFieldClick(item.id, 'description', item.description)}>{item.description}</p>
          
          <button
            className="btn btn-danger"
            onClick={() => deleteLunch(item.id)}
          >
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
  
};

export default Que;
