/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";

const usePerbandinganKriteria = create(
  devtools((set, get) => ({
    dtPerbandinganKriteria: [],
    setPerbandinganKriteria: () => {
      try {
        const dataPerbandinganKriteria =
          JSON.parse(localStorage.getItem("perbandinganKriteria")) || [];

        set((state) => ({
          ...state,
          dtPerbandinganKriteria: dataPerbandinganKriteria,
        }));
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
          dtPerbandinganKriteria: row,
        }));
        // mengambil isi state
        const isiState = get().dtPerbandinganKriteria;
        // konversi json ke string
        // tambahkan ke localstorage
        localStorage.setItem("perbandinganKriteria", JSON.stringify(isiState));
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

export default usePerbandinganKriteria;
