/** @format */

import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import GetProperty from "./GetProperty";

const TableComp = ({
  headTable = [],
  dataTable,
  tableBodies,
  setEdit,
  setDelete,
  limit = 10,
  page = 1,
  ubah = true,
  hapus = true,
}) => {
  const showNo = (index) => {
    let noUrut = (page - 1) * limit + index;
    return noUrut + 1;
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead className="">
          <tr>
            {headTable &&
              headTable.map((row, index) => <th key={index}>{row}</th>)}
          </tr>
        </thead>
        <tbody>
          {/* loop tr */}
          {dataTable &&
            dataTable.map((row, index) => (
              <tr key={index} className="hover">
                <td>{showNo(index)}</td>
                {/* loop td */}
                {tableBodies.map((column, index) => {
                  return (
                    <td key={index} className={`px-6 py-4`}>
                      {GetProperty(row, column)}
                    </td>
                  );
                })}
                {/* aksi */}
                <td>
                  <div className="flex flex-row gap-2">
                    {ubah && (
                      <BsFillPencilFill
                        onClick={() => setEdit(row)}
                        size={20}
                        className="cursor-pointer hover:text-red-700"
                      />
                    )}
                    {hapus && (
                      <BsFillTrashFill
                        onClick={() => setDelete(row.id)}
                        size={20}
                        className="cursor-pointer hover:text-yellow-500"
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComp;
