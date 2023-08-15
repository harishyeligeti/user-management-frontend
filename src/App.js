import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewUser from "./pages/NewUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/newuser" element={<NewUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
