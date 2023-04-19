



import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Lunch = () => {
  const [lunchData, setLunchData] = useState([]);

  const fetchData = async () => {
    const result = await axios.get("http://localhost:3001/api/lunch");
    setLunchData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFieldClick = async (id, field, currentValue) => {
    const { value: newValue } = await Swal.fire({
      title: `Edit ${field}`,
      input: 'text',
      inputValue: currentValue,
      showCancelButton: true,
    });
  
    if (newValue && newValue !== currentValue) {
      const updatedItems = lunchData.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: newValue };
        }
        return item;
      });
  
      setLunchData(updatedItems);
  
      axios
        .put(`http://localhost:3001/api/lunch/${id}`, { ...updatedItems.find((item) => item.id === id) })
        .catch((error) => {
          console.error('Error updating item:', error);
        });
    }
  };

  const handleAddNewItem = async () => {
    const formHtml = `
      <div>
        <label for="title">Title:</label>
        <input id="title" type="text" />
      </div>
      <div>
        <label for="description">Description:</label>
        <input id="description" type="text" />
      </div>
      <div>
        <label for="image">Image:</label>
        <input id="image" type="text" />
      </div>
      <div>
        <label for="gram">Gram:</label>
        <input id="gram" type="number" />
      </div>
      <div>
        <label for="kcal">Kcal:</label>
        <input id="kcal" type="number" />
      </div>
      <div>
        <label for="price">Price:</label>
        <input id="price" type="number" />
      </div>
    `;

    const { value: formValues } = await Swal.fire({
      title: "Add new item",
      html: formHtml,
      focusConfirm: false,
      preConfirm: () => {
        return {
          title: document.getElementById("title").value,
          description: document.getElementById("description").value,
          image: document.getElementById("image").value,
          gram: document.getElementById("gram").value,
          kcal: document.getElementById("kcal").value,
          price: document.getElementById("price").value,
        };
      },
    });

    if (formValues) {
      const newItem = {
        id: Date.now(),
        title: formValues.title,
        description: formValues.description,
        image: formValues.image,
        gram: formValues.gram,
        kcal: formValues.kcal,
        price: formValues.price,
        count: 0,
        priceTotal: 0,
      };

      const updatedItems = [...lunchData, newItem];
      setLunchData(updatedItems);

      axios.post("http://localhost:3001/api/lunch", newItem).catch((error) => {
        console.error("Error adding new item:", error);
      });
    }
  };

  return (
    <div>
      <button onClick={handleAddNewItem}>Add new item</button>
      {lunchData.map((item) => (
        <div key={item.id}>
          <p onClick={() => handleFieldClick(item.id, "title", item.title)}>
            {item.title}
          </p>
          <p
            onClick={() =>
              handleFieldClick(item.id, "description", item.description)
            }
          >
            {item.description}
          </p>
          <p onClick={() => handleFieldClick(item.id, "image", item.image)}>
            {item.image}
          </p>
          <p onClick={() => handleFieldClick(item.id, "gram", item.gram)}>
            {item.gram}
          </p>
          <p onClick={() => handleFieldClick(item.id, "kcal", item.kcal)}>
            {item.kcal}
          </p>
          <p onClick={() => handleFieldClick(item.id, "price", item.price)}>
            {item.price}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Lunch;
