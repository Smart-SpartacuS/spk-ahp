/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useNilaiAlternatif = create(
  devtools((set, get) => ({
    dtNilaiAlternatif: [],
    setNilaiAlternatif: () => {
      try {
        const dataNilaiAlternatif =
          JSON.parse(localStorage.getItem("nilaiAlternatif")) || [];

        set((state) => ({ ...state, dtNilaiAlternatif: dataNilaiAlternatif }));
        return {
          status: "berhasil",
        };
      } catch (error) {
        return {
          status: "error",
          error: error,
        };
      }
    },
    // tambah data
    addData: async (row) => {
      try {
        set(() => ({
          dtNilaiAlternatif: row,
        }));
        // mengambil isi state
        const isiState = get().dtNilaiAlternatif;
        console.log({ isiState });
        // konversi json ke string
        // tambahkan ke localstorage
        localStorage.setItem("nilaiAlternatif", JSON.stringify(isiState));
        return {
          status: "berhasil tambah",
          data: row,
        };
      } catch (error) {
        return {
          status: "error",
          data: error,
        };
      }
    },
  }))
);

export default useNilaiAlternatif;
