"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

//User Model:

const passwordEncrypt = require("../helpers/passwordEncrypt");

const RoomSchema = new mongoose.Schema(
  {
    room_number: {
      type: String,
      required: true,
      unique: true,
    },
    image: String,
    bed_type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "rooms",
    timestamps: true,
  }
);

//Model:
module.exports = mongoose.model("Room", RoomSchema);
