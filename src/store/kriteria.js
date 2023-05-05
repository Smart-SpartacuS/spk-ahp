/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useKriteria = create(
  devtools((set, get) => ({
    dtKriteria: [],
    setKriteria: async () => {
      try {
        const local = JSON.parse(localStorage.getItem("kriteria")) || [];
        const localSorted = local.sort((a, b) => {
          if (a.nama < b.nama) {
            return -1;
          }
          if (a.nama > b.nama) {
            return 1;
          }
          return 0;
        });
        set((state) => ({ ...state, dtKriteria: localSorted }));
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
        set((prevState) => ({
          dtKriteria: [row, ...prevState.dtKriteria],
        }));
        // mengambil isi state
        const isiState = get().dtKriteria;
        // konversi json ke string
        // tambahkan ke localstorage
        localStorage.setItem("kriteria", JSON.stringify(isiState));
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
    // hapus data
    removeData: async (id) => {
      try {
        set((prevState) => ({
          dtKriteria: prevState.dtKriteria.filter((item) => item.id !== id),
        }));
        // mengambil isi state
        const isiState = get().dtKriteria;
        // konversi json ke string
        // tambahkan ke localstorage
        localStorage.setItem("kriteria", JSON.stringify(isiState));
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
    // ubah data
    updateData: async (id, row) => {
      try {
        set((prevState) => ({
          dtKriteria: prevState.dtKriteria.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                ...row,
              };
            } else {
              return item;
            }
          }),
        }));
        // simpan data
        // mengambil isi state
        const isiState = get().dtKriteria;
        // konversi json ke string
        // tambahkan ke localstorage
        localStorage.setItem("kriteria", JSON.stringify(isiState));
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
  }))
);

export default useKriteria;
