/** @format */
import React from "react";

const GetProperty = (obj, prop) => {
  var parts = prop.split(".");
  if (Array.isArray(parts)) {
    var last = parts.length > 1 ? parts.pop() : parts;
    // jika gabungan antara kode dan no urut
    if (last.includes("sks_smt")) {
      return `${obj["subject"]["sks"]}-${obj["subject"]["semester"]}`;
    }
    if (last.includes("schedule_jam")) {
      return `${obj["schedule"]["start"]} - ${obj["schedule"]["finish"]}`;
    }
    var l = parts.length,
      i = 1,
      current = parts[0];
    while ((obj = obj[current]) && i < l) {
      current = parts[i];
      i++;
    }

    if (typeof obj === "object") {
      return obj ? obj[last] : "";
    }
    return obj;
  } else {
    // eslint-disable-next-line no-throw-literal
    throw "parts is not valid array";
  }
};

export default GetProperty;
