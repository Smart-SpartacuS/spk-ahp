/** @format */

import { useForm } from "react-hook-form";
import Modal from "../../components/modal/Modal";
import { v1 as uuidv1 } from "uuid";
import { useEffect } from "react";
import useAlternatif from "../../store/alternatif";

const Form = ({ showModal, setShowModal, dtEdit, setDtEdit }) => {
  // @ts-ignore
  // store
  const { addData, updateData } = useAlternatif();
  // react hook form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  // reset form
  const resetForm = () => {
    setValue("id", uuidv1());
    setValue("nama", "");
  };
  // effect
  useEffect(() => {
    if (dtEdit) {
      setValue("id", dtEdit?.id);
      setValue("nama", dtEdit?.nama);
      return;
    }
    resetForm();

    return () => {};
  }, [showModal, dtEdit]);

  // simpan data
  const onSubmit = async (data) => {
    if (dtEdit) {
      await updateData(data.id, data);
      setShowModal(false);
      return;
    }
    await addData(data);
    resetForm();
  };

  return (
    <Modal>
      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid md:grid-cols-2 md:gap-2">
          <input
            type="hidden"
            id="id"
            className="input input-bordered"
            {...register("id", { required: true })}
          />
          <div className="form-control col-span-2">
            <label className="label" htmlFor="nama">
              <span className="label-text">Nama Alternatif</span>
            </label>
            <input
              type="text"
              id="nama"
              placeholder="Masukan nama"
              className="input input-bordered"
              {...register("nama", { required: true })}
            />
            {errors.nama && (
              <span className="text-error text-sm">Tidak boleh kosong</span>
            )}
          </div>
        </div>
        <div className="">
          <button className="btn btn-secondary" type="submit">
            Simpan Data
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Form;
