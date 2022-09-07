import React, { useEffect, useState } from "react"
import axios from "axios"
import Paper from "@mui/material/Paper"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Switch from "@mui/material/Switch"
import { Root, classes, unitSx, notUnitSx } from "./styles/WeatherDataStyles"

const tempUnits = {
	metric: "°C",
	imperial: "°F",
}

const windUnits = {
	metric: "meters/sec",
	imperial: "miles/hr",
}

export default function WeatherData(props) {
	const { city, units, phoneView } = props
	const [weather, setWeather] = useState("")

	useEffect(() => {
		async function getWeather() {
			const result = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&units=${props.units}&appid=${process.env.REACT_APP_WEATHER_KEY}`
			)
			setWeather(result.data)
		}
		if (city) {
			getWeather()
		}
	}, [city, units])

	const handleSwitchChange = (evt) => {
		props.handleUnitChange(evt.target.checked)
	}

	return (
		<Root className={classes.root} phoneView={phoneView}>
			<Paper elevation={3} className={classes.cont}>
				<Typography className={classes.loc}>
					{city.name}, {city.country}
				</Typography>
				{weather && (
					<>
						<section className={classes.desc}>
							<Typography variant="h5">
								{weather.weather[0].main} - {weather.weather[0].description}
								<img
									className={classes.icon}
									src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
									alt={weather.weather[0].description}
								/>
							</Typography>
						</section>
						<Card className={classes.temp}>
							<CardContent variant="outlined">
								<Typography>
									Main Temp: {weather.main.temp}
									{tempUnits[units]}
								</Typography>
								<Typography>
									Feels Like: {weather.main.feels_like}
									{tempUnits[units]}
								</Typography>
							</CardContent>
						</Card>
						<Card className={classes.temp}>
							<CardContent variant="outlined">
								<Typography>
									Min. Temp: {weather.main.temp_min}
									{tempUnits[units]}
								</Typography>
								<Typography>
									Max. Temp: {weather.main.temp_max}
									{tempUnits[units]}
								</Typography>
							</CardContent>
						</Card>
						{!phoneView && <br />}
						<Card className={classes.misc}>
							<CardContent variant="outlined">
								<Typography>Humidity: {weather.main.humidity}%</Typography>
								<Typography>
									Wind Speed: {weather.wind.speed} {windUnits[units]}
								</Typography>
								<Typography>Wind Deg: {weather.wind.deg}&deg;</Typography>
							</CardContent>
						</Card>
					</>
				)}
				<Typography
					component="span"
					sx={units === "imperial" ? unitSx : notUnitSx}>
					°F
				</Typography>
				<Switch checked={units === "metric"} onChange={handleSwitchChange} />
				<Typography
					component="span"
					sx={units === "metric" ? unitSx : notUnitSx}>
					°C
				</Typography>
			</Paper>
		</Root>
	)
}
