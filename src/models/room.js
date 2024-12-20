"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

//User Model:

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
      enum: ["single", "double", "family", "King"],
      required: true,
    },
    bed_space: {
      type: Number,
      min: 1,
      default: function (value) {
        if (this.bed_type == "single") return 1;
        else if (this.bed_type == "double") return 2;
      },

      transform: function (value) {
        if (this.bed_type == "single") return 1;
        else if (this.bed_type == "double") return 2;
      },
    },
    price: {
      type: Number,
      required: true,
      min: 50,
    },
  },
  {
    collection: "rooms",
    timestamps: true,
  }
);

//Model:
module.exports = mongoose.model("Room", RoomSchema);
