import { useState } from "react"
import CitySearch from "./CitySearch"

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
	const handleSubmit = (cityObj) => {
		setCity(cityObj)
	}
	return (
		<div className="App">
			<h1>Simple Weather App</h1>
			<CitySearch handleSubmit={handleSubmit} />
		</div>
	)
}

export default App
