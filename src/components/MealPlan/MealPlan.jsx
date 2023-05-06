import React, { useEffect, useState } from "react";
import styles from"./MealPlan.module.scss"

import Swal from "sweetalert2";
import api from "../../api/api";

const weekDays = {
  "monday": "Понеділок",
  "tuesday": "Вівторок",
  "wednesday": "Середа",
  "thursday": "Четвер",
  "friday": "П'ятниця",
  "saturday": "Субота",
  "sunday": "Неділя",
}
const mealTypes = {
  "breakfast": ["Завтрак", "7:00 - 9:00"],
  "second_bf": ["Второй завтрак", "10:00 - 11:00"],
  "lunch": ["Обед", "13:00 - 15:00"],
  "afternoon": ["Полдник", "16:00 - 17:00"],
  "dinner": ["Ужин", "19:00 - 20:00"],
}

function localeDayOfWeek(dayOfWeek) {
  return weekDays[dayOfWeek] || dayOfWeek;
}
function localeMeals(meals) {
  return mealTypes[meals] ? mealTypes[meals][0] : meals;
}
function mealsTime(meals) {
  return mealTypes[meals] ? mealTypes[meals][1] : meals;
}

const MealPlan = () => {
  const [programs, setPrograms] = useState([]);

  const fetchData = async () => {
    try {
      const result = (await api.get('/mealplan')).data;
      console.log('program result', result);
      setPrograms(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const editItem = async (program, day, meal) => {
    const { value: updatedText } = await Swal.fire({
      input: "text",
      inputValue: program.plans[day][meal].text,
      showCancelButton: true,
    });

    if (updatedText) {
      await api.post('/mealplan/edit', {
        id: program.id, 
        day, meal, 
        text: updatedText
      })
      program.plans[day][meal].text = updatedText;
      setPrograms([...programs])
    }
  };

  const addProgram = async () => {
    const { value: name } = await Swal.fire({
      title: "Введите название программы",
      input: "text",
      showCancelButton: true,
    });

    const { value: description } = await Swal.fire({
      title: "Введите описание программы",
      input: "textarea",
      showCancelButton: true,
    });

    let plans = {};

    for (const [dayOfWeek, localedDOW] of Object.entries(weekDays)) {
      plans[dayOfWeek] = {};
      for (const [mealType, [localedMeal]] of Object.entries(mealTypes)) {
        const { value: text, isConfirmed } = await Swal.fire({
          title: `Введите блюдо на ${localedMeal} на ${localedDOW}`,
          input: "text",
          showCancelButton: true,
        });
        if (!isConfirmed || !text) continue;
        // if (!isConfirmed) return;
        plans[dayOfWeek][mealType] = { text, gram: 100 };
      }
    }

    let newProgram = (await api.post('/mealplan/create', {
      name, description, plans
    })).data
    if (!Array.isArray(newProgram)) newProgram = [newProgram];

    setPrograms([...programs, ...newProgram]);
  };
  const deleteProgram = async (id) => {
    const result = await Swal.fire({
      title: "Вы уверены, что хотите удалить эту программу?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Удалить",
      cancelButtonText: "Отмена",
    });

    if (result.isConfirmed) {
      await api.post("/mealplan/delete", {id});
      setPrograms(programs.filter((program) => program.id !== id));
    }
  };

  return (
    <div>
      <div className={styles.program__top}>
        <h1 className={styles.program__title} >Программы питания</h1>
        <button className={styles.program__add} onClick={addProgram}>+ Добавить программу</button>
      </div>
      {programs.map((program) => (
        <div key={program.id}>
          <div className={styles.program__name_wrap}>
            <h2>{program.name}</h2>
            <button className={styles.program__del} onClick={() => deleteProgram(program.id)}>
              <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.983 0.48645C10.7181 0.490591 10.4657 0.599651 10.2812 0.789694C10.0966 0.979738 9.99499 1.23524 9.99862 1.50012V2.00012H4.49862C4.36615 1.99832 4.23465 2.02286 4.11175 2.07231C3.98885 2.12176 3.87699 2.19513 3.78269 2.28817C3.68838 2.3812 3.61349 2.49205 3.56238 2.61427C3.51127 2.73649 3.48495 2.86765 3.48495 3.00012H1.99862C1.86611 2.99825 1.73454 3.02273 1.61157 3.07214C1.48861 3.12156 1.37669 3.19492 1.28232 3.28796C1.18795 3.38101 1.11301 3.49188 1.06186 3.61414C1.01071 3.73639 0.984375 3.8676 0.984375 4.00012C0.984375 4.13265 1.01071 4.26385 1.06186 4.38611C1.11301 4.50837 1.18795 4.61924 1.28232 4.71228C1.37669 4.80533 1.48861 4.87869 1.61157 4.9281C1.73454 4.97751 1.86611 5.002 1.99862 5.00012H19.9986C20.1311 5.002 20.2627 4.97751 20.3857 4.9281C20.5086 4.87869 20.6206 4.80533 20.7149 4.71228C20.8093 4.61924 20.8842 4.50837 20.9354 4.38611C20.9865 4.26385 21.0129 4.13265 21.0129 4.00012C21.0129 3.8676 20.9865 3.73639 20.9354 3.61414C20.8842 3.49188 20.8093 3.38101 20.7149 3.28796C20.6206 3.19492 20.5086 3.12156 20.3857 3.07214C20.2627 3.02273 20.1311 2.99825 19.9986 3.00012H18.5123C18.5123 2.86765 18.486 2.73649 18.4349 2.61427C18.3837 2.49205 18.3089 2.3812 18.2145 2.28817C18.1202 2.19513 18.0084 2.12176 17.8855 2.07231C17.7626 2.02286 17.6311 1.99832 17.4986 2.00012H11.9986V1.50012C12.0004 1.36633 11.9754 1.23354 11.925 1.1096C11.8746 0.985655 11.7998 0.873091 11.7051 0.77857C11.6104 0.684049 11.4977 0.609492 11.3737 0.559315C11.2496 0.509138 11.1168 0.48436 10.983 0.48645ZM1.99862 7.00012L3.79159 22.2345C3.90959 23.2415 4.76196 24.0001 5.77596 24.0001H16.2213C17.2353 24.0001 18.0866 23.2415 18.2056 22.2345L19.9986 7.00012H1.99862Z" fill="#64D370"/>
              </svg>
            </button>
          </div>
          <h3>Опис: {program.description}</h3>

          {Object.entries(program.plans).map(([dayOfWeek, meals]) => (
            <div key={dayOfWeek}>
              <h3>{localeDayOfWeek(dayOfWeek)}</h3>
              {Object.entries(meals).map(([type, {text, kcal, gram}]) => (
                <div className={styles.program__item} key={type}>
                  <h4 className={styles.program__name}>{localeMeals(type)} ({mealsTime(type)})</h4>
                  {/* {meal.items.map((item) => ( */}
                    <div className={styles.program__info}>
                      <p onClick={() => editItem(program, dayOfWeek, type)}>{text}</p>
                      {gram && (<span>{gram} гр.</span>)}
                    </div>
                  {/* ))} */}
                </div>
              ))}
            </div>
          ))}

        </div>
      ))}

    </div>
  );
};

export default MealPlan;