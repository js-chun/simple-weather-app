import { useState } from "react"
import CitySearch from "./CitySearch"
import WeatherData from "./WeatherData"
import PageContent from "./PageContent"

const defaultCity = {
	name: "Toronto",
	latitude: 43.7417,
	longitude: -79.3733,
	country: "CA",
	population: 5429524,
	is_capital: false,
}

function App() {
	const [city, setCity] = useState(defaultCity)
	const [units, setUnits] = useState("metric")
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
