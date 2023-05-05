/** @format */

import React from "react";
import { v1 as uuidv1 } from "uuid";
import toastShow from "../../services/toast-show";
import useNilai from "../../store/nilai";

const TableNilai = ({ dtAlternatif, dtKriteria, dtNilai }) => {
  // store
  const { addData } = useNilai();
  const submitNilai = (event, kriteria_id, alternatif_id) => {
    const { key, target } = event;
    if (key === "Enter") {
      // Get input value
      const data = {
        id: uuidv1(),
        kriteria_id,
        alternatif_id,
        bobot: target.value,
      };
      addData(data);
      toastShow({ type: "success", message: "Data ditambahkan" });
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <td className="border px-4 py-2" rowSpan={2}>
              Alternatif
            </td>
            <th
              colSpan={dtKriteria.length}
              className="text-center border px-4 py-2"
            >
              Kriteria
            </th>
          </tr>
          <tr>
            {dtKriteria.map((kriteria) => (
              <th className="px-4 py-2 border" key={kriteria.id}>
                {kriteria.nama}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dtAlternatif.map((alternatif) => (
            <tr key={alternatif.id}>
              <td className="border px-4 py-2">{alternatif.nama}</td>
              {dtKriteria.map((kriteria) => {
                const nilai = dtNilai.find(
                  (item) =>
                    item.alternatif_id === alternatif.id &&
                    item.kriteria_id === kriteria.id
                );
                return (
                  <td className="border px-4 py-2" key={kriteria.id}>
                    <input
                      defaultValue={nilai ? parseFloat(nilai.bobot) : ""}
                      className="input input-bordered w-full max-w-xs"
                      onKeyDown={(e) =>
                        submitNilai(e, kriteria.id, alternatif.id)
                      }
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableNilai;
