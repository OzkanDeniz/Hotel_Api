"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

//Reservation Model:

const ReservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // userId alanında unique: true tanımlı. Bu, her kullanıcının yalnızca bir rezervasyonu olabileceği anlamına gelir. Eğer bir kullanıcı birden fazla rezervasyon yapabilmeli ise unique: true kaldırılmalıdır
      index: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    arrival_date: {
      type: Date,
      required: true,
    },
    //departure_date her zaman arrrival_date tarihinden sonra olmalı
    departure_date: {
      type: Date,
      required: true,
    },
    guest_number: {
      type: Number,
      required: true,
      min: [1, "Guest number must be at least 1."],
    },
    night: {
      type: Number,
      required: true,
      min: [1, "Night count must be at least 1."],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number."],
    },
    totalprice: {
      type: Number,
      required: true,
      min: [0, "Totalprice must be a positive number."],
    },
  },
  {
    collection: "reservations",
    timestamps: true,
  }
);

//Model:
module.exports = mongoose.model("Reservation", ReservationSchema);
