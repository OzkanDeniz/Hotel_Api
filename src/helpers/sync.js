"use strict";

const mongoose = require("mongoose");
const User = require("../models/user");
const Reservation = require("../models/reservation");
const Room = require("../models/room");

/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

// sync():
module.exports = async function () {
  /* CLEAR DATABASE */
  try {
    await User.deleteMany();                    
    await Reservation.deleteMany();
    await Room.deleteMany();
    console.log("- Database and all data DELETED!");
  } catch (error) {
    console.error("Error clearing the database:", error);
    return;
  }
  /* CLEAR DATABASE */

  /* LOAD USERS */
  try {
    const users = require("./user.json");
    await User.insertMany(users);
    console.log("Users added successfully!");
  } catch (error) {
    console.error("Error adding users:", error);
  }

  /* LOAD ROOMS */
  try {
    const rooms = require("./room.json");
    await Room.insertMany(rooms);
    console.log("Rooms added successfully!");
  } catch (error) {
    console.error("Error adding rooms:", error);
  }

  /* LOAD RESERVATIONS */
  try {
    const reservations = require("./reservation.json");
    await Reservation.insertMany(reservations);
    console.log("Reservations added successfully!");
  } catch (error) {
    console.error("Error adding reservations:", error);
  }
};
