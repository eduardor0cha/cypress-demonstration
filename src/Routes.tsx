import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

function routes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<div />} />
    </Routes>
  );
}

export default routes;
