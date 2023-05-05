/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import Alternatif from "../pages/alternatif/Alternatif";
import Dashboard from "../pages/dashboard/Dashboard";
import Kriteria from "../pages/kriteria/Kriteria";
import PerbandinganBerpasanganAlternatif from "../pages/perhitungan/alternatif/PerbandinganBerpasangan";
import PerbandinganBerpasanganKriteria from "../pages/perhitungan/kriteria/PerbandinganBerpasangan";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="kriteria" element={<Kriteria />} />
      <Route path="alternatif" element={<Alternatif />} />
      <Route path="perhitungan">
        <Route path="kriteria" element={<PerbandinganBerpasanganKriteria />} />
        <Route
          path="alternatif"
          element={<PerbandinganBerpasanganAlternatif />}
        />
      </Route>
    </Routes>
  );
};

export default MyRoutes;
