import React, { useState, useEffect } from "react";
import "./candy.scss"
import Swal from "sweetalert2";
import api from "../../api/api";

const Candy = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const result = (await api.get('/candies')).data;
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFieldClick = (id, field, fieldValue) => {
    Swal.fire({
      input: "textarea",
      inputValue: fieldValue,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = data.map((item) =>
          item.id === id ? { ...item, [field]: result.value } : item
        );
        setData(updatedData);

        const updatedItem = updatedData.find((item) => item.id === id);

        api.post('/candies/update', updatedItem)
        .then(res => { console.log('candy update', res.data) })
        .catch(err => console.error(err));
      }
    });
  };

  const handleAddNewItem = () => {
    Swal.fire({
      title: "Add new item",
      html: `
        <input id="title" class="swal2-input" placeholder="Title">
        <input id="description" class="swal2-input" placeholder="Description">
        <input id="proteins" class="swal2-input" placeholder="Proteins">
        <input id="fats" class="swal2-input" placeholder="Fats">
        <input id="carbohydrates" class="swal2-input" placeholder="Carbohydrates">
        <input id="kcal" class="swal2-input" placeholder="Kcal">
        <input id="price" class="swal2-input" placeholder="Price">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const price = document.getElementById("price").value;

        return {
          title: document.getElementById("title").value,
          description: document.getElementById("description").value,
          proteins: document.getElementById("proteins").value,
          fats: document.getElementById("fats").value,
          carbohydrates: document.getElementById("carbohydrates").value,
          kcal: document.getElementById("kcal").value,
          price: price,
        };
      },
    }).then((result) => {
      if (result.value) {
        const newItem = result.value;
        setData([...data, newItem]);

        api.post('/candies/create', newItem)
        .then(res => { 
          newItem.id = res.data.id;
          console.log('candies create', res.data);
        })
        .catch(err => console.error(err));
      }
    });
  };

  const deleteCandy = async (id) => {
    try {
      await api.post('/candies/delete', { id });
      fetchData();
    } catch (error) {
      console.error("Error deleting candy:", error);
    }
  };

  return (
    <div className="candy">
      <div className="candy__top">
      <h1 className="candy__name">Candies</h1>
      <button className="candy__add" onClick={handleAddNewItem}>+Добавить новый продукт</button>
      </div>
      {data.map((item) => (
        <div key={item.id} className="item">
          <h2 className="candy__title" onClick={() => handleFieldClick(item.id, "title", item.title)}>
            {item.title}
          </h2>
          <p className="candy__text"
            onClick={() =>
              handleFieldClick(item.id, "description", item.description)
            }
          >
            {item.description}
          </p>
          <p className="candy__text"
            onClick={() => handleFieldClick(item.id, "proteins", item.proteins)}
          >
            Proteins: {item.proteins}
          </p>
          <p className="candy__text" onClick={() => handleFieldClick(item.id, "fats", item.fats)}>
            Fats: {item.fats}
          </p>
          <p className="candy__text"
            onClick={() =>
              handleFieldClick(item.id, "carbohydrates", item.carbohydrates)
            }
          >
            Carbohydrates: {item.carbohydrates}
          </p>
          <p className="candy__text" onClick={() => handleFieldClick(item.id, "kcal", item.kcal)}>
            Kcal: {item.kcal}
          </p>
          <p className="candy__text" onClick={() => handleFieldClick(item.id, "price", item.price)}>
            Price: {item.price}
          </p>
          <button
            className="candy__del"
            onClick={() => deleteCandy(item.id)}
          >
            X Удалить
          </button>
        </div>
      ))}
    </div>
  );
};

export default Candy;
