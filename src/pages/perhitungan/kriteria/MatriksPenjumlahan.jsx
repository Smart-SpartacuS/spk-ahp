/** @format */

import React, { useEffect, useRef, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import usePenjumlahanKriteria from "../../../store/penjumlahanKriteria";

const MatriksPenjumlahan = ({
  dtKriteria,
  dtNilaiKriteria,
  dtPerbandinganKriteria,
}) => {
  // store
  const { setPenjumlahanKriteria, dtPenjumlahanKriteria, addData } =
    usePenjumlahanKriteria();
  // state
  const [bobotMatriks, setBobotMatriks] = useState([]);
  const [jmlKriteria, setJmlKriteria] = useState(0);
  const [filterJumlah, setFilterJumlah] = useState([]);
  const [cosisten, setConsisten] = useState({});
  const tableRef = useRef();

  const hitungBobot = () => {
    const result = [];

    // Hitung prioritas nilai kriteria berdasarkan kriteria_id_b
    dtPerbandinganKriteria.forEach((item) => {
      const { kriteria_id_a, kriteria_id_b, nilai } = item;
      // mengambil data priotitas nilai kriteria berdasarkan kriteria_id_b
      const prioritas = dtNilaiKriteria.find(
        (current) => current.kriteria_id === kriteria_id_b
      )?.prioritas;

      const bobot = (prioritas * nilai).toFixed(3);
      result.push({
        kriteria_id_a,
        kriteria_id_b,
        bobot,
        prioritas,
      });
    });
    setBobotMatriks(result);
  };

  const totalBobot = () => {
    const sum_bobot = {};
    bobotMatriks.forEach((item) => {
      const { kriteria_id_a, bobot } = item;
      sum_bobot[kriteria_id_a] = sum_bobot[kriteria_id_a]
        ? sum_bobot[kriteria_id_a] + parseFloat(bobot)
        : parseFloat(bobot);
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

  const countCI = () => {
    // mengambil prioritas
    // mengambil bobotMatriks
    // jika kriteria_id_a pada prioritas === kriteria_id_b pada bobotMatriks maka dikalikan kemudian dijumlahkan
    const filterJumlah = [];
    dtPenjumlahanKriteria.map((row) => {
      // mengambil data priotitas nilai kriteria berdasarkan kriteria_id
      const prioritas = dtNilaiKriteria.find(
        (current) => current.kriteria_id === row.kriteria_id
      )?.prioritas;

      filterJumlah.push({
        kriteria_id_a: row.kriteria_id,
        prioritas: parseFloat(prioritas),
        jumlah: parseFloat(row.jumlah),
      });
    }, []);
    const total = filterJumlah
      .map((item) => item.jumlah + item.prioritas)
      .reduce((a, b) => a + b, 0);

    const maks = parseFloat((total / jmlKriteria).toFixed(3));

    const CI = (maks - jmlKriteria) / (jmlKriteria - 1);
    // mengambil IR dari localStorage
    const IR = JSON.parse(localStorage.getItem("IR"));
    // mencari nilai IR berdasarkan jmlKriteria
    const nilaiIR = IR.find((item) => item.om === jmlKriteria);
    // // mencari nilai CR
    const nilaiCR = CI / nilaiIR?.ri;
    setConsisten({
      maks,
      total,
      ci: CI.toFixed(3),
      ri: nilaiIR?.ri,
      cr: nilaiCR.toFixed(3),
    });

    setFilterJumlah(filterJumlah);
  };

  useEffect(() => {
    hitungBobot();
    setJmlKriteria(dtKriteria.length);

    return () => {};
  }, [dtNilaiKriteria, jmlKriteria]);

  useEffect(() => {
    totalBobot();
    setPenjumlahanKriteria();
  }, [bobotMatriks]);

  useEffect(() => {
    countCI();

    return () => {};
  }, [dtPenjumlahanKriteria]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-xl font-bold">Matriks Penjumlahan Kriteria</h4>
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
              </tr>
              {dtKriteria.map((row, rowIndex) => {
                return (
                  <tr data-row={rowIndex} key={row.id}>
                    <td className="font-bold">{row.nama}</td>
                    {bobotMatriks &&
                      bobotMatriks.map(
                        (col, colIndex) =>
                          col.kriteria_id_a === row.id && (
                            <td key={colIndex}>{col.bobot}</td>
                          )
                      )}
                    {dtPenjumlahanKriteria &&
                      dtPenjumlahanKriteria.map(
                        (col, colIndex) =>
                          col.kriteria_id === row.id && (
                            <td key={colIndex}>{col.jumlah}</td>
                          )
                      )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mb-[10%] flex flex-col gap-6">
        <h4 className="text-lg font-bold">Menghitung Consistency Index (CI)</h4>
        <MathJaxContext>
          <div className="flex flex-col gap-4">
            <MathJax style={{ fontSize: "20px" }}>
              {`\\(\\lambda_{maximum}= \\frac{${filterJumlah
                .map((row) => row.jumlah + "+" + row.prioritas)
                .join("+")}}{${jmlKriteria}}\\)`}
            </MathJax>
            <MathJax style={{ fontSize: "20px" }}>
              {`\\(\\lambda_{maximum}= \\frac{${cosisten.total}}{${jmlKriteria}}=${cosisten.maks}\\)`}
            </MathJax>
            <MathJax style={{ fontSize: "20px" }}>
              {`\\(CI= \\frac{${cosisten.maks}-${jmlKriteria}}{${jmlKriteria}-1}=${cosisten.ci}\\)`}
            </MathJax>
            <MathJax style={{ fontSize: "20px" }}>
              {`\\(CR= \\frac{${cosisten.ci}}{${cosisten.ri}}=${cosisten.cr}\\)`}
            </MathJax>
          </div>
        </MathJaxContext>
        {cosisten.cr <= 0.1 ? (
          <p>Karena nilai CR {"<="} 0.1 maka perhitungannya konsisten</p>
        ) : (
          <p>
            Karena nilai CR {">="} 0.1 maka perhitungannya tidak konsisten dan
            tidak bisa diterima mohon memasukan nilai kembali
          </p>
        )}
      </div>
    </div>
  );
};

export default MatriksPenjumlahan;
