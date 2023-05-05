/** @format */

import toast from "react-hot-toast";

const toastShow = (event, position = "top-right") => {
  // if (event.judul === "Berhasil") {
  toast[event.type](event.message, {
    duration: 4000,
    position,
  });
  //   NotificationManager.success(event.message, event.judul);
  // }
};

export default toastShow;
