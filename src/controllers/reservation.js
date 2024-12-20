"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const Reservation = require("../models/reservation");
const Room = require("../models/room");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "List Reservations"
            #swagger.description = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
    //Çoklu populate  ["userId", "pizzaId"]
    //tekli populate "userId"
    const data = await res.getModelList(Reservation, {}, ["userId", "roomId"]);

    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Reservation),
      data,
    });
  },

  //CRUD
  create: async (req, res) => {
    /*
    #swagger.tags = ["Reservations"]
    #swagger.summary = "Create Reservations"
    */

    const arrivalDate = new Date(req.body.arrival_date);
    const departureDate = new Date(req.body.departure_date);

    if (arrivalDate >= departureDate) {
      return res.status(400).send({
        error: true,
        message: "Arrival date must be before departure date.",
      });
    }

    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    req.body.night = Math.round(departureDate - arrivalDate) / oneDay;
    req.body.userId = req.user._id;

    //room un bilgilerini al
    const { price } = await Room.findOne(
      { _id: req.body.roomId },
      "price -_id "
    );

    req.body.totalprice = req.body.night * price;
    req.body.price = price;
    console.log(req.body);
    const data = await Reservation.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Get Single Reservations"
        */
    const data = await Reservation.findOne({ _id: req.params.id }).populate([
      "userId",
      "roomId",
    ]);

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Update Reservations"
        */

    const data = await Reservation.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Reservation.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Delete Reservation"
        */

    const data = await Reservation.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
