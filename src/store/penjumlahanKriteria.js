/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";

const usePenjumlahanKriteria = create(
  devtools((set, get) => ({
    dtPenjumlahanKriteria: [],
    setPenjumlahanKriteria: () => {
      try {
        const dataPenjumlahanKriteria =
          JSON.parse(localStorage.getItem("penjumlahanKriteria")) || [];
        set((state) => ({
          ...state,
          dtPenjumlahanKriteria: dataPenjumlahanKriteria,
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
          dtPenjumlahanKriteria: row,
        }));
        // mengambil isi state
        const isiState = get().dtPenjumlahanKriteria;
        // konversi json ke string
        // tambahkan ke localstorage
        localStorage.setItem("penjumlahanKriteria", JSON.stringify(isiState));
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

export default usePenjumlahanKriteria;
