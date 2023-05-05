/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

const listMenus = [
  {
    name: "Dashboard",
    to: "/",
  },
  {
    name: "Kriteria",
    to: "kriteria",
  },
  {
    name: "Alternatif",
    to: "alternatif",
  },
  {
    name: "Perhitungan",
    to: "perhitungan",
    subMenu: [
      {
        name: "Kriteria",
        to: "perhitungan/kriteria",
      },
      {
        name: "Alternatif",
        to: "perhitungan/alternatif",
      },
    ],
  },
];

const Menu = () => {
  return (
    <ul className="menu bg-base-100 w-56 p-2 rounded-box">
      {listMenus.map((row, index) => (
        <div key={index}>
          {!row.subMenu && (
            <li>
              <NavLink to={row.to}>{row.name}</NavLink>
            </li>
          )}
          {row.subMenu && <li className="pl-4 mb-1 mt-2">{row.name}</li>}
          {row.subMenu &&
            row.subMenu.map((subRow, subIndex) => (
              <li key={subIndex} className="ml-8">
                <NavLink className="hover:bg-none" to={subRow.to}>
                  {subRow.name}
                </NavLink>
              </li>
            ))}
        </div>
      ))}
    </ul>
  );
};

export default Menu;
