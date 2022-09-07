import React, { useState, useCallback } from "react"
import axios from "axios"
import debounce from "lodash.debounce"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import Button from "@mui/material/Button"
import Autocomplete from "@mui/material/Autocomplete"
import { Root, classes } from "./styles/CitySearchStyles"

// Max # of cities searched at a time for City GET request
const LIMIT = 10

export default function CitySearch(props) {
	const { phoneView } = props
	const [city, setCity] = useState("")										// Final city data from selected city suggestion (different from final city used to get weather data)
	const [inputCity, setInputCity] = useState("")					// Name of city in the search bar text field
	const [searchCities, setSearchCities] = useState([])		// Array of cities found from City API GET request used for Autocomplete suggestion

	const findCities = async (value) => {
		const sCities = await axios.get(
			`https://api.api-ninjas.com/v1/city?name=${value}&limit=${LIMIT}`,
			{ headers: { "X-Api-Key": process.env.REACT_APP_CITY_KEY } }
		)
		setSearchCities(sCities.data)
	}

	// Delay sending a GET request for cities until the user has stopped typing
	const debounceQuery = useCallback(
		debounce((value) => {
			if (value) {
				findCities(value)
			}
		}, 200),
		[]
	)
	
	// On selecting a suggested city in the Autocomplete, keeps city data, sets text in search bar, and empties other suggestions
	const handleChange = (evt, newValue) => {
		setCity(newValue)
		if (newValue) {
			setInputCity(`${newValue.name}, ${newValue.country}`)
			setSearchCities([])
		}
	}

	const handleInputChange = async (evt) => {
		setInputCity(evt.target.value)
		if (evt.target.value) {
			debounceQuery(evt.target.value)
		}
	}

	// Sets final city to selected city data and add city to LocalStorage
	const handleSubmit = (evt) => {
		evt.preventDefault()
		props.handleSubmit(city)
	}

	return (
		<Root className={classes.root} phoneView={phoneView}>
			<Paper elevation={3} className={classes.bg}>
				<Autocomplete
					disablePortal
					options={searchCities}
					getOptionLabel={(option) => `${option.name}, ${option.country}`}
					value={city}
					onChange={handleChange}
					inputValue={inputCity}
					disableClearable
					renderInput={(params) => (
						<>
							<TextField
								{...params}
								className={classes.searchText}
								label="City..."
								onChange={handleInputChange}
							/>
							<Button
								className={classes.btn}
								variant="contained"
								onClick={handleSubmit}>
								<SearchIcon />
							</Button>
						</>
					)}
				/>
			</Paper>
		</Root>
	)
}
