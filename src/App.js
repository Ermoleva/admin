
import Aside from "./components/Aside/Aside";
import { Route, Routes, useNavigate } from "react-router-dom";
import Candy from "./components/Candies/Candy";
import Lunch from "./components/Lunches/Lunch";
import Que from "./components/Que/Que";
import Article from "./components/Article/Article";
import MealPlan from "./components/MealPlan/MealPlan";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { useEffect } from "react";
import auth from "./api/auth";
import Gallery from "./components/Gallery/Gallery";


function App() {
  const navigate = useNavigate();
  useEffect(() => {
    switch (window.location.pathname) {
      case "/auth": case "": case "/login":
      case "/register": return;
      default: break;
    }
    auth.refresh().catch(err => {
      navigate('/login');
    })
  })
  return (
    <div className="App">
      <Aside />
      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/candyitem" element={<Candy />} />
          <Route path="/lunch" element={<Lunch/>} />
          <Route path="/que" element={<Que/>} />
          <Route path="/article" element={<Article/>} />
          <Route path="/mealPlan" element={<MealPlan/>} />
          <Route path="/gallery" element={<Gallery/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
