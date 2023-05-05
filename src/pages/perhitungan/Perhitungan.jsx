/** @format */

import React, { useEffect } from "react";
import useAlternatif from "../../store/alternatif";
import useKriteria from "../../store/kriteria";
import PerbandinganBerpasangan from "./kriteria/PerbandinganBerpasangan";

const Perhitungan = () => {
  // store
  const { setAlternatif, dtAlternatif } = useAlternatif();
  const { setKriteria, dtKriteria } = useKriteria();
  // get data
  useEffect(() => {
    setAlternatif({});
    setKriteria({});
    return () => {};
  }, []);

  return (
    <div>
      {/* The button to open modal */}
      <div className="flex justify-center">
        <article className="prose lg:prose-xl">
          <h3 className="text-center">Halaman Perhitungan</h3>
        </article>
      </div>
      <div className="mt-4 flex flex-col">
        <PerbandinganBerpasangan dtKriteria={dtKriteria} />
        {/* {dtAlternatif.length > 0 && dtKriteria.length > 0 && (
          <NilaiAlternatif
            dtAlternatif={dtAlternatif}
            dtKriteria={dtKriteria}
          />
        )} */}
      </div>
    </div>
  );
};

export default Perhitungan;
