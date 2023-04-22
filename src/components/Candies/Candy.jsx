import React, { useState, useEffect } from "react";
import axios from "axios";
import "./candy.scss"
import Swal from "sweetalert2";

const Candy = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:3005/api/data");
      setData(result.data);
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

        axios
          .put(`http://localhost:3005/api/data/${id}`, updatedItem)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error updating data:", error);
          });
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
          id: data.length + 1,
          title: document.getElementById("title").value,
          description: document.getElementById("description").value,
          proteins: document.getElementById("proteins").value,
          fats: document.getElementById("fats").value,
          carbohydrates: document.getElementById("carbohydrates").value,
          kcal: document.getElementById("kcal").value,
          price: price,
          count: 0,
          priceTotal: price,
        };
      },
    }).then((result) => {
      if (result.value) {
        const newItem = result.value;
        setData([...data, newItem]);

        axios
          .post("http://localhost:3005/api/data", newItem)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error adding new item:", error);
          });
      }
    });
  };

  const deleteCandy = async (id) => {
    try {
      await axios.delete(`/api/data/${id}`);
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
          <p className="candy__text" onClick={() => handleFieldClick(item.id, "count", item.count)}>
            Count: {item.count}
          </p>
          <p className="candy__text"
            onClick={() =>
              handleFieldClick(item.id, "priceTotal", item.priceTotal)
            }
          >
            Price Total: {item.priceTotal}
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
