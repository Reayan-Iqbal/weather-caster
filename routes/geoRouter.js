const express = require("express");
const axios = require("axios");
const geoRouter = express.Router();
geoRouter.get("/", async (req, res) => {
	const city = req.query.city;
	try {
		const response = await axios.request({
			method: "GET",
			url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
			params: {
				namePrefix: city,
			},
			headers: {
				"X-RapidAPI-Key": "17581a6338msh5f5032bba3a4423p188f99jsn465d8aba6d9a",
				"X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
			},
		});
		const cities = response.data.data;
		const citiesArray = [];
		cities.forEach((obj) => {
			citiesArray.push(obj.name + "," + obj.countryCode);
		});
		res.json({
			citiesArray,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({
			error,
		});
	}
});
module.exports = geoRouter;
