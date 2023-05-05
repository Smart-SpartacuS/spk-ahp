/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useNilaiKriteria = create(
  devtools((set, get) => ({
    dtNilaiKriteria: [],
    setNilaiKriteria: () => {
      try {
        const dataNilaiKriteria =
          JSON.parse(localStorage.getItem("nilaiKriteria")) || [];
        set((state) => ({
          ...state,
          dtNilaiKriteria: dataNilaiKriteria,
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
          dtNilaiKriteria: row,
        }));
        // mengambil isi state
        const isiState = get().dtNilaiKriteria;
        // konversi json ke string
        // tambahkan ke localstorage
        localStorage.setItem("nilaiKriteria", JSON.stringify(isiState));
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

export default useNilaiKriteria;
