import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import Detail from "./Components/Detail";
import Home from "./Components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/list/:page" element={<HomePage />} />
        <Route path="/detail/:slug" element={<Detail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
