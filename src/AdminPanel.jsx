import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminPanel = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get('http://localhost:3001/api/data');
      setData(result.data);
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
        const updatedData = data.map((item) =>
          item.id === id ? { ...item, [field]: result.value } : item
        );
        setData(updatedData);
  
        const updatedItem = updatedData.find((item) => item.id === id);
  
        axios
          .put(`http://localhost:3001/api/data/${id}`, updatedItem)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error('Error updating data:', error);
          });
      }
    });
  };
  

  return (
    <div className="admin-panel">
      {data.map((item) => (
        <div key={item.id} className="item">
          <h2 onClick={() => handleFieldClick(item.id, 'title', item.title)}>{item.title}</h2>
          <p onClick={() => handleFieldClick(item.id, 'description', item.description)}>{item.description}</p>
          {/* Добавьте другие поля, которые вы хотите редактировать здесь */}
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
