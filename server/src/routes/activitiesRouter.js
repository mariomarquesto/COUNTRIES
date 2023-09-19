const { Router } = require("express");
const {
  getActivities,
  postActivities,
} = require("../handlers/activitiesHandler");

const activitiesRouter = Router();

activitiesRouter.post("/", postActivities);
activitiesRouter.get("/", getActivities);

module.exports = activitiesRouter;
