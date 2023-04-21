
import Aside from "./components/Aside/Aside";
import { Route, Routes } from "react-router-dom";
import Candy from "./components/Candies/Candy";
import Lunch from "./components/Lunches/Lunch";
import Que from "./components/Que/Que";
import Article from "./components/Article/Article";


function App() {
  return (
    <div className="App">
      <Aside />
      <div className="content">
        <Routes>
          <Route path="/candyitem" element={<Candy />} />
          <Route path="/lunch" element={<Lunch/>} />
          <Route path="/que" element={<Que/>} />
          <Route path="/article" element={<Article/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
