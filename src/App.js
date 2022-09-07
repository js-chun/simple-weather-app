import { useState } from "react"
import PageContent from "./PageContent"
import CitySearch from "./CitySearch"
import WeatherData from "./WeatherData"
import useMediaQuery from "@mui/material/useMediaQuery"

function App() {
	const phoneView = useMediaQuery("(max-width: 600px)")

	let initialCity = JSON.parse(window.localStorage.getItem("weather_city"))
	if (Object.keys(initialCity).length === 0) {
		initialCity = ""
	}
	const [city, setCity] = useState(initialCity)

	const [units, setUnits] = useState("metric")

	const handleSubmit = (cityObj) => {
		setCity(cityObj)
		window.localStorage.setItem("weather_city", JSON.stringify(city))
	}

	const handleUnitChange = (isMetric) => {
		if (isMetric) {
			setUnits("metric")
		} else {
			setUnits("imperial")
		}
	}

	return (
		<PageContent phoneView={phoneView}>
			<CitySearch
				handleSubmit={handleSubmit}
				units={units}
				phoneView={phoneView}
			/>
			{city && (
				<WeatherData
					city={city}
					units={units}
					handleUnitChange={handleUnitChange}
					phoneView={phoneView}
				/>
			)}
		</PageContent>
	)
}

export default App
