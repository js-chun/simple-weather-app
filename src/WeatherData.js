import React, { useEffect, useState } from "react"
import axios from "axios"
import Paper from "@mui/material/Paper"

export default function WeatherData(props) {
	const { city } = props
	const [weather, setWeather] = useState("")
	useEffect(() => {
		async function getWeather() {
			const result = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${process.env.REACT_APP_WEATHER_KEY}`
			)
			setWeather(result.data)
		}
		getWeather()
	}, [])
	return (
		<Paper
			elevation={2}
			sx={{ margin: "1rem", padding: "1rem", width: "500px" }}>
			<h1>
				{city.name}, {city.country}
			</h1>
			{weather && (
				<>
					<h3>
						{weather.weather[0].main} - {weather.weather[0].description}
					</h3>
					<h5>Main Temp: {weather.main.temp}</h5>
					<h5>Feels Like: {weather.main.feels_like}</h5>
					<h5>Min: {weather.main.temp_min}</h5>
					<h5>Max: {weather.main.temp_max}</h5>
					<h5>Humidity: {weather.main.temp_max}</h5>

					<h5>wind speed: {weather.wind.speed}</h5>
					<h5>wind deg: {weather.wind.deg}</h5>
				</>
			)}
		</Paper>
	)
}
