import { useState, useEffect } from "react"
import CitySearch from "./CitySearch"
import WeatherData from "./WeatherData"
import PageContent from "./PageContent"

function App() {
	let initialCity = JSON.parse(window.localStorage.getItem("weather_city"))
	if (Object.keys(initialCity).length === 0) {
		initialCity = ""
	}
	const [city, setCity] = useState(initialCity)
	const [units, setUnits] = useState("metric")
	useEffect(() => {
		window.localStorage.setItem("weather_city", JSON.stringify(city))
	}, [city])
	const handleSubmit = (cityObj) => {
		setCity(cityObj)
	}
	const handleUnitChange = (isMetric) => {
		if (isMetric) {
			setUnits("metric")
		} else {
			setUnits("imperial")
		}
	}
	return (
		<PageContent>
			<CitySearch handleSubmit={handleSubmit} units={units} />
			{city && (
				<WeatherData
					city={city}
					units={units}
					handleUnitChange={handleUnitChange}
				/>
			)}
		</PageContent>
	)
}

export default App
