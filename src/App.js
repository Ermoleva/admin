
import Aside from "./components/Aside/Aside";
import { Route, Routes } from "react-router-dom";
import Candy from "./components/Candies/Candy";
import Lunch from "./components/Lunches/Lunch";
function App() {
  return (
    <div className="App">
      <Aside />
      <div className="content">
        <Routes>
          <Route path="/candyitem" element={<Candy />} />
          <Route path="/lunches" element={<Lunch />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
