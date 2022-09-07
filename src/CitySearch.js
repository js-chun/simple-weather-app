import React, { useState, useCallback } from "react"
import axios from "axios"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import Button from "@mui/material/Button"
import Autocomplete from "@mui/material/Autocomplete"
import debounce from "lodash.debounce"
import { Root, classes } from "./styles/CitySearchStyles"

const limit = 10

export default function CitySearch(props) {
	const { phoneView } = props
	const [city, setCity] = useState("")
	const [inputCity, setInputCity] = useState("")
	const [searchCities, setSearchCities] = useState([])

	const handleChange = (evt, newValue) => {
		setCity(newValue)
		if (newValue) {
			setInputCity(`${newValue.name}, ${newValue.country}`)
			setSearchCities([])
		}
	}
	const findCities = async (value) => {
		const sCities = await axios.get(
			`https://api.api-ninjas.com/v1/city?name=${value}&limit=${limit}`,
			{ headers: { "X-Api-Key": process.env.REACT_APP_CITY_KEY } }
		)
		setSearchCities(sCities.data)
	}
	const debounceQuery = useCallback(
		debounce((value) => {
			if (value) {
				findCities(value)
			}
		}, 200),
		[]
	)
	const handleInputChange = async (evt) => {
		setInputCity(evt.target.value)
		if (evt.target.value) {
			debounceQuery(evt.target.value)
		}
	}
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
