import { Route, Routes } from "react-router-dom";
import { Home, Login } from "./pages";

function routes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default routes;
