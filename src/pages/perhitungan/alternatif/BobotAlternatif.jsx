/** @format */

import React, { useEffect, useRef, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import usePrioritasAlternatif from "../../../store/prioritasAlternatif";

const BobotAlternatif = ({
  dtKriteria,
  dtNilaiAlternatif,
  dtAlternatif,
  kriteria,
}) => {
  // store
  const { setPrioritasAlternatif, dtPrioritasAlternatif, addData } =
    usePrioritasAlternatif();
  // state
  const [bobotMatriks, setBobotMatriks] = useState([]);
  const [jmlKriteria, setJmlKriteria] = useState(0);
  const [filterJumlah, setFilterJumlah] = useState([]);
  const [ci, setCi] = useState({});
  const tableRef = useRef();

  const hitungBobot = () => {
    const sum_b = {};
    // Hitung jumlah nilai berdasarkan alternatif_id_b
    dtNilaiAlternatif.forEach((item) => {
      if (item.kriteria_id === kriteria.id) {
        const { alternatif_id_b, nilai } = item;
        sum_b[alternatif_id_b] = sum_b[alternatif_id_b]
          ? sum_b[alternatif_id_b] + nilai
          : nilai;
      }
    });

    const result = [];

    Object.keys(sum_b).forEach((sum_id_b) => {
      const jumlah_nilai_b = sum_b[sum_id_b];
      // Hitung hasil bagi setiap nilai dengan jumlah nilai pada alternatif_id_a yang sama
      dtNilaiAlternatif.forEach((item) => {
        if (item.kriteria_id === kriteria.id) {
          const { alternatif_id_a, alternatif_id_b, nilai } = item;
          if (alternatif_id_b === sum_id_b) {
            const bobot = (nilai / jumlah_nilai_b).toFixed(2);
            result.push({
              alternatif_id_a,
              alternatif_id_b,
              bobot,
              jumlah_nilai_b,
              kriteria_id: kriteria.id,
            });
          }
        }
      });
    });
    setBobotMatriks(result);
  };

  const totalBobot = () => {
    const sumByKriteria = bobotMatriks.reduce((acc, item) => {
      const { kriteria_id, alternatif_id_a, bobot } = item;
      if (!acc[kriteria_id]) {
        acc[kriteria_id] = {};
      }

      if (!acc[kriteria_id][alternatif_id_a]) {
        acc[kriteria_id][alternatif_id_a] = parseFloat(bobot);
      } else {
        acc[kriteria_id][alternatif_id_a] += parseFloat(bobot);
      }

      return acc;
    }, {});

    const result = [];
    Object.keys(sumByKriteria).forEach((kriteria_id) => {
      if (kriteria_id === kriteria.id) {
        const sum_bobot = sumByKriteria[kriteria_id];
        Object.keys(sum_bobot).forEach((alternatif_id) => {
          const jumlah = sum_bobot[alternatif_id];
          const prioritas = jumlah / jmlKriteria;
          result.push({
            kriteria_id,
            jumlah: jumlah.toFixed(2),
            prioritas: prioritas.toFixed(2),
            alternatif_id,
          });
        });
      }
    });
    addData(result);
  };

  const countCI = () => {
    // mengambil prioritas
    // mengambil bobotMatriks
    // jika alternatif_id_a pada prioritas === alternatif_id_b pada bobotMatriks maka dikalikan kemudian dijumlahkan
    const filterJumlah = [];
    dtPrioritasAlternatif.map((current) => {
      if (current.kriteria_id === kriteria.id) {
        const kriteriaA = current.kriteria_id;
        const alternatif_id = current.alternatif_id;
        const prioritas = parseFloat(current.prioritas);
        const nilai = bobotMatriks
          .filter(
            (m) =>
              m.alternatif_id_b === alternatif_id && m.kriteria_id === kriteriaA
          )
          .map((m) => parseFloat(m.jumlah_nilai_b));
        filterJumlah.push({
          alternatif_id_a: kriteriaA,
          prioritas,
          jumlah_nilai: nilai[0]?.toFixed(2),
        });
      }
    }, []);
    const maks = filterJumlah
      .map((item) => item.jumlah_nilai * item.prioritas)
      .reduce((a, b) => a + b, 0)
      .toFixed(2);

    const CI = (maks - jmlKriteria) / (jmlKriteria - 1);
    // mengambil IR dari localStorage
    const IR = JSON.parse(localStorage.getItem("IR"));
    // mencari nilai IR berdasarkan jmlKriteria
    const nilaiIR = IR.find((item) => item.om === jmlKriteria);
    // // mencari nilai CR
    const nilaiCR = CI / nilaiIR?.ri;
    setCi({ maks, ci: CI.toFixed(3), ri: nilaiIR?.ri, cr: nilaiCR.toFixed(3) });

    setFilterJumlah(filterJumlah);
  };

  useEffect(() => {
    hitungBobot();
    setJmlKriteria(dtKriteria.length);

    return () => {};
  }, [dtNilaiAlternatif, jmlKriteria]);

  useEffect(() => {
    totalBobot();
    setPrioritasAlternatif();
  }, [bobotMatriks]);

  useEffect(() => {
    countCI();

    return () => {};
  }, [dtPrioritasAlternatif]);

  return (
    <div className="flex flex-col">
      <div>
        <h4 className="text-lg font-bold">
          Bobot Alternatif dari kriteria {kriteria.nama}
        </h4>
        <div className="">
          <table className="table table-zebra w-full" ref={tableRef}>
            <tbody>
              <tr>
                <td>Alternatif</td>
                {dtAlternatif.map((desc, idex) => (
                  <td className="font-bold" key={idex}>
                    {desc.nama}
                  </td>
                ))}
                <td className="font-bold">Jumlah</td>
                <td className="font-bold">Bobot Prioritas</td>
              </tr>
              {dtAlternatif.map((row, rowIndex) => {
                return (
                  <tr data-row={rowIndex} key={row.id}>
                    <td className="font-bold">{row.nama}</td>
                    {bobotMatriks &&
                      bobotMatriks.map(
                        (col, colIndex) =>
                          col.alternatif_id_a === row.id && (
                            <td key={colIndex}>{col.bobot}</td>
                          )
                      )}
                    {dtPrioritasAlternatif &&
                      dtPrioritasAlternatif.map(
                        (col, colIndex) =>
                          col.alternatif_id === row.id &&
                          col.kriteria_id === kriteria.id && (
                            <td key={colIndex}>{col.jumlah}</td>
                          )
                      )}
                    {dtPrioritasAlternatif &&
                      dtPrioritasAlternatif.map(
                        (col, colIndex) =>
                          col.alternatif_id === row.id &&
                          col.kriteria_id === kriteria.id && (
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
      <div className="mt-2">
        <h4 className="text-lg font-bold">Menghitung Consistency Index (CI)</h4>
        <MathJaxContext>
          <div className="flex flex-col gap-4 mt-4">
            <MathJax style={{ fontSize: "20px" }}>
              {`\\(\\lambda_{maximum}= \\frac{${filterJumlah
                .map((row) => row.prioritas + "*" + row.jumlah_nilai)
                .join("+")}}{${jmlKriteria}-1}\\)`}
            </MathJax>
            <MathJax style={{ fontSize: "20px" }}>
              {`\\(CI= \\frac{${ci.maks}-${jmlKriteria}}{${jmlKriteria}-1}=${ci.ci}\\)`}
            </MathJax>
            <MathJax style={{ fontSize: "20px" }}>
              {`\\(CR= \\frac{${ci.ci}}{${ci.ri}}=${ci.cr}\\)`}
            </MathJax>
          </div>
        </MathJaxContext>
      </div>
    </div>
  );
};

export default BobotAlternatif;
