/** @format */

import React, { useContext, useEffect, useState } from "react";
import Delete from "../../components/modal/Delete";
import TableComp from "../../components/table/TableComp";
import { ShowModalContext } from "../../context/ShowModalContext";
import useKriteria from "../../store/kriteria";
import Form from "./Form";

const Kriteria = () => {
  // context
  const { showModal, setShowModal } = useContext(ShowModalContext);
  // store
  const { setKriteria, dtKriteria, removeData } = useKriteria();
  // state
  const [id, setId] = useState(false);
  const [dtEdit, setDtEdit] = useState(false);
  // daftar IR
  const IR = [
    { om: 1, ri: 0 },
    { om: 2, ri: 0 },
    { om: 3, ri: 0.58 },
    { om: 4, ri: 0.9 },
    { om: 5, ri: 1.12 },
    { om: 6, ri: 1.24 },
    { om: 7, ri: 1.32 },
    { om: 8, ri: 1.41 },
    { om: 9, ri: 1.46 },
    { om: 10, ri: 1.49 },
  ];
  // get data
  useEffect(() => {
    setKriteria({});
    // menyimpan IR pada local storage
    localStorage.setItem("IR", JSON.stringify(IR));

    return () => {};
  }, []);
  // show data edit
  const setEdit = (row) => {
    setDtEdit(row);
    setShowModal(true);
    console.log(row);
  };
  // show dialog delete
  const setDelete = (id) => {
    setId(id);
  };
  // aksi hapus
  const deletData = async () => {
    await removeData(id);
    setId(false);
  };
  const tambahData = () => {
    setShowModal(true);
    setDtEdit(false);
  };
  // table
  const headTable = ["No", "Nama", "Aksi"];
  const tableBodies = ["nama"];
  return (
    <div>
      <Delete id={id} setId={setId} deletData={deletData} />
      <Form
        showModal={showModal}
        setShowModal={setShowModal}
        dtEdit={dtEdit}
        setDtEdit={setDtEdit}
      />
      {/* The button to open modal */}
      <div className="flex flex-col-reverse items-center sm:flex-row-reverse sm:justify-between">
        <div className="w-fit">
          <label className="btn btn-secondary" onClick={tambahData}>
            Tambah Data
          </label>
        </div>
        <article className="prose lg:prose-xl">
          <h3 className="text-center">Halaman Kriteria</h3>
        </article>
      </div>
      <div className="mt-4">
        <TableComp
          dataTable={dtKriteria}
          headTable={headTable}
          tableBodies={tableBodies}
          setEdit={setEdit}
          setDelete={setDelete}
        />
      </div>
    </div>
  );
};

export default Kriteria;
