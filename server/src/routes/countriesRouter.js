const { Router } = require("express");

const countriesRouter = Router();
const {
  getCountries,
  getCountriesById,
} = require("../handlers/countriesHandler");

countriesRouter.get("/", getCountries);
countriesRouter.get("/:id", getCountriesById);

module.exports = countriesRouter;
