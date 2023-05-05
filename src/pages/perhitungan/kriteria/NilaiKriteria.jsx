/** @format */

import React, { useEffect, useRef, useState } from "react";
import useNilaiKriteria from "../../../store/nilaiKriteria";
import MatriksPenjumlahan from "./MatriksPenjumlahan";

const NilaiKriteria = ({ dtKriteria, dtPerbandinganKriteria }) => {
  // store
  const { setNilaiKriteria, dtNilaiKriteria, addData } = useNilaiKriteria();
  // state
  const [bobotMatriks, setBobotMatriks] = useState([]);
  const [jmlKriteria, setJmlKriteria] = useState(0);
  const tableRef = useRef();

  const hitungBobot = () => {
    const sum_b = {};
    // Hitung jumlah nilai berdasarkan kriteria_id_b
    dtPerbandinganKriteria.forEach((item) => {
      const { kriteria_id_b, nilai } = item;

      sum_b[kriteria_id_b] = sum_b[kriteria_id_b]
        ? sum_b[kriteria_id_b] + nilai
        : nilai;
    });

    const result = [];

    Object.keys(sum_b).forEach((sum_id_b) => {
      const jumlah_nilai_b = sum_b[sum_id_b];
      // Hitung hasil bagi setiap nilai dengan jumlah nilai pada kriteria_id_a yang sama
      dtPerbandinganKriteria.forEach((item) => {
        const { kriteria_id_a, kriteria_id_b, nilai } = item;

        if (kriteria_id_b === sum_id_b) {
          const bobot = (nilai / jumlah_nilai_b).toFixed(3);
          result.push({
            kriteria_id_a,
            kriteria_id_b,
            nilai: bobot,
            jumlah_nilai_b,
          });
        }
      });
    });
    setBobotMatriks(result);
  };

  const totalBobot = () => {
    const sum_bobot = {};
    bobotMatriks.forEach((item) => {
      const { kriteria_id_a, nilai } = item;
      sum_bobot[kriteria_id_a] = sum_bobot[kriteria_id_a]
        ? sum_bobot[kriteria_id_a] + parseFloat(nilai)
        : parseFloat(nilai);
    });
    const result = [];
    Object.keys(sum_bobot).forEach((sum_id_a) => {
      const jumlah = sum_bobot[sum_id_a];
      const prioritas = jumlah / jmlKriteria;
      result.push({
        kriteria_id: sum_id_a,
        jumlah: jumlah.toFixed(3),
        prioritas: prioritas.toFixed(3),
      });
    });
    addData(result);
  };

  useEffect(() => {
    hitungBobot();
    setJmlKriteria(dtKriteria.length);

    return () => {};
  }, [dtPerbandinganKriteria, jmlKriteria]);

  useEffect(() => {
    totalBobot();
    setNilaiKriteria();
  }, [bobotMatriks]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-xl font-bold">Matriks Nilai Kriteria</h4>
        <div>
          <table className="table table-zebra w-full" ref={tableRef}>
            <tbody>
              <tr>
                <td>Kriteria</td>
                {dtKriteria.map((desc, idex) => (
                  <td className="font-bold" key={idex}>
                    {desc.nama}
                  </td>
                ))}
                <td className="font-bold">Jumlah</td>
                <td className="font-bold">Bobot Prioritas</td>
              </tr>
              {dtKriteria.map((row, rowIndex) => {
                return (
                  <tr data-row={rowIndex} key={row.id}>
                    <td className="font-bold">{row.nama}</td>
                    {bobotMatriks &&
                      bobotMatriks.map(
                        (col, colIndex) =>
                          col.kriteria_id_a === row.id && (
                            <td key={colIndex}>{col.nilai}</td>
                          )
                      )}
                    {dtNilaiKriteria &&
                      dtNilaiKriteria.map(
                        (col, colIndex) =>
                          col.kriteria_id === row.id && (
                            <td key={colIndex}>{col.jumlah}</td>
                          )
                      )}
                    {dtNilaiKriteria &&
                      dtNilaiKriteria.map(
                        (col, colIndex) =>
                          col.kriteria_id === row.id && (
                            <td key={colIndex}>{col.prioritas}</td>
                          )
                      )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <MatriksPenjumlahan
          dtKriteria={dtKriteria}
          dtNilaiKriteria={dtNilaiKriteria}
          dtPerbandinganKriteria={dtPerbandinganKriteria}
        />
      </div>
    </div>
  );
};

export default NilaiKriteria;
