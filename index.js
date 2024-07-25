const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const geoRouter = require("./routes/geoRouter");
const axios = require("axios");
app.use(express.json());
app.use(cors());
// app.use("/api/geoDb", geoRouter);
app.use("/api/geo", geoRouter);
app.get("/api/weather", async (req, res) => {
	const city = req.query.city;
	try {
		const response = await axios.request({
			method: "GET",
			url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=17a16e8a9428478c10da9793bce74c29`,
		});
		const weatherData = response.data;
		res.json({
			weatherData,
		});
	} catch (error) {
		console.log(error);
		res.send("error");
	}
});

app.listen(port, () => {
	console.log("Listening on Port", port);
});
