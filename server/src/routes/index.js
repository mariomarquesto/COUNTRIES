const { Router } = require("express");
const countriesRouter = require('./countriesRouter.js');
const activitiesRouter = require('./activitiesRouter.js');


const router = Router();

router.use('/countries', countriesRouter);
router.use('/activities', activitiesRouter);


module.exports = router;

