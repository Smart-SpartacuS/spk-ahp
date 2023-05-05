/** @format */

import React, { useRef } from "react";

const PrioritasKriteria = ({ dtKriteria }) => {
  const tableRef = useRef();
  return (
    <div>
      <div>
        <h4 className="text-xl font-bold">Prioritas Kriteria</h4>
        <div>
          <table className="table table-zebra w-full" ref={tableRef}>
            <thead>
              <tr>
                <th>Kriteria</th>
                <th>Bobot Prioritas</th>
                <th>CI</th>
              </tr>
            </thead>
            <tbody>
              {dtKriteria.map((row, rowIndex) => {
                return (
                  <tr data-row={rowIndex} key={row.id}>
                    <td className="font-bold">{row.nama}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PrioritasKriteria;
