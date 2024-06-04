module.exports = function (app, databaseService) {
  //read
  app.get("/locations", (req, res) => {
    databaseService
      .getLocations()
      .then((locations) => {
        res.json(locations);
      })
      .catch((error) => {
        res.json({ message: "Error getting locations 3", error });
      });
  });

  //read 1

  app.get("/locations/:id", (req, res) => {
    const id = req.params.id;
    databaseService
      .getLocations()
      .then((locations) => {
        const location = locations.find((location) => location.id === id);
        if (location) {
          res.json(location);
        } else {
          res.json({ message: "Location not found" });
        }
      })
      .catch((error) => {
        res.json({ message: "Error getting location", error });
      });
  });

  //create
  app.post("/createlocations", (req, res) => {
    const newLocation = req.body;
    console.log(newLocation);
    databaseService
      .crearLocation(newLocation.disp_ID, newLocation.lat, newLocation.lon)
      .then(() => {
        res.json({ message: "Location creada" });
      })
      .catch((error) => {
        res.json({ message: "Error creando location", error });
      });
  });

  //update
  app.put("/updatelocations/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    const location = req.body;
    console.log(location);
    databaseService
      .updateLocation(id, location.lat, location.lon)
      .then(() => {
        res.json({ message: "Location updated" });
      })
      .catch((error) => {
        res.json({ message: "Error updating location 4", error });
      });
  });

  //delete
  app.delete("/deletelocations/:id", (req, res) => {
    const id = req.params.id;
    databaseService
      .deleteLocation(id)
      .then(() => {
        res.json({ message: "Location deleted" });
        console.log(id);
      })
      .catch((error) => {
        console.error("Error deleting location:", error);
        res
          .status(500)
          .json({ message: "Error deleting location", error: error.message });
      });
  });
};
