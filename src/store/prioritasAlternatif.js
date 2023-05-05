/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";

const usePrioritasAlternatif = create(
  devtools((set, get) => ({
    dtPrioritasAlternatif: [],
    setPrioritasAlternatif: () => {
      try {
        const dataPrioritasAlternatif =
          JSON.parse(localStorage.getItem("prioritasAlternatif")) || [];
        set((state) => ({
          ...state,
          dtPrioritasAlternatif: dataPrioritasAlternatif,
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
        set((state) => {
          const dataAlt = [...state.dtPrioritasAlternatif];
          row.forEach((rowItem) => {
            const index = dataAlt.findIndex(
              (altItem) =>
                altItem.kriteria_id === rowItem.kriteria_id &&
                altItem.alternatif_id === rowItem.alternatif_id
            );
            if (index === -1) {
              dataAlt.push(rowItem);
            } else {
              dataAlt[index] = rowItem;
            }
          });
          // konversi json ke string
          // tambahkan ke localstorage
          localStorage.setItem("prioritasAlternatif", JSON.stringify(dataAlt));
          return {
            status: "berhasil tambah",
            data: row,
          };
        });
      } catch (error) {
        return {
          status: "error",
          data: error,
        };
      }
    },
  }))
);

export default usePrioritasAlternatif;
