import React, { useEffect, useState } from "react"
import axios from "axios"
import Paper from "@mui/material/Paper"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Switch from "@mui/material/Switch"
import { styled } from "@mui/material/styles"

const PREFIX = "WD"
const classes = {
	root: `${PREFIX}-root`,
	loc: `${PREFIX}-loc`,
	desc: `${PREFIX}-desc`,
	temp: `${PREFIX}-temp`,
	misc: `${PREFIX}-misc`,
}

const Root = styled("div")(({ theme }) => ({
	[`&.${classes.root}`]: {
		backgroundColor: "#F5F2E7",
	},
	[`& .${classes.loc}`]: {
		fontSize: "2rem",
		marginTop: "0",
		textTransform: "uppercase",
		textAlign: "end",
	},
	[`& .${classes.desc}`]: {
		textTransform: "lowercase",
		fontStyle: "italic",
		marginTop: "0",
		marginBottom: "0.5rem",
		fontSize: "1.2rem",
		opacity: "0.5",
	},
	[`& .${classes.temp}`]: {
		backgroundColor: "#F5F2E7",
		width: "46%",
		display: "inline-block",
		margin: "0 2%",
	},
	[`& .${classes.misc}`]: {
		backgroundColor: "#F5F2E7",
		width: "96%",
		margin: "2%",
	},
}))

export default function WeatherData(props) {
	const { city } = props
	const [weather, setWeather] = useState("")
	useEffect(() => {
		async function getWeather() {
			const result = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&units=${props.units}&appid=${process.env.REACT_APP_WEATHER_KEY}`
			)
			setWeather(result.data)
		}
		getWeather()
	}, [city])
	return (
		<Root className={classes.root}>
			<Paper
				elevation={3}
				sx={{
					backgroundColor: "#395B64",
					color: "#F5F2E7",
					margin: "1rem",
					padding: "1rem",
					width: "500px",
				}}>
				<Typography className={classes.loc}>
					{city.name}, {city.country}
				</Typography>
				{weather && (
					<>
						<section className={classes.desc}>
							<Typography variant="h5">
								{weather.weather[0].main} - {weather.weather[0].description}
							</Typography>
						</section>
						<Card className={classes.temp}>
							<CardContent variant="outlined">
								<Typography>Main Temperature: {weather.main.temp}</Typography>
								<Typography>Feels Like: {weather.main.feels_like}</Typography>
							</CardContent>
						</Card>
						<Card className={classes.temp}>
							<CardContent variant="outlined">
								<Typography>
									Min. Temperature: {weather.main.temp_min}
								</Typography>
								<Typography>
									Max. Temperature: {weather.main.temp_max}
								</Typography>
							</CardContent>
						</Card>
						<br></br>
						<Card className={classes.misc}>
							<CardContent variant="outlined">
								<Typography>Humidity: {weather.main.humidity}</Typography>
								<Typography>Wind Speed: {weather.wind.speed}</Typography>
								<Typography>Wind Deg: {weather.wind.deg}</Typography>
							</CardContent>
						</Card>
					</>
				)}
				<Switch></Switch>
			</Paper>
		</Root>
	)
}
