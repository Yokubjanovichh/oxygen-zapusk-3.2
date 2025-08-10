import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Last from "../pages/lastPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/last" element={<Last />} />
    </Routes>
  );
};

export default AppRoutes;
