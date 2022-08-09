import React, { useState } from "react"
import axios from "axios"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import Button from "@mui/material/Button"
import Autocomplete from "@mui/material/Autocomplete"
import { styled } from "@mui/material/styles"

const limit = 10

const PREFIX = "Search"
const classes = {
	root: `${PREFIX}-root`,
	btn: `${PREFIX}-btn`,
}

const Root = styled("div")(({ theme }) => ({
	[`&.${classes.root}`]: {
		backgroundColor: "#F5F2E7",
		marginBottom: "1rem",
	},
	[`& .${classes.btn}`]: {
		backgroundColor: "#2666CF",
		height: "56px",
		opacity: "0.7",
		["&:hover"]: {
			opacity: "1",
		},
		["& svg"]: {
			transform: "scale(1.5)",
		},
	},
}))

export default function CitySearch(props) {
	const [city, setCity] = useState("")
	const [inputCity, setInputCity] = useState("")
	const [searchCities, setSearchCities] = useState([])

	const handleChange = (evt, newValue) => {
		setCity(newValue)
		setInputCity(`${newValue.name}, ${newValue.country}`)
		setSearchCities([])
	}
	const handleInputChange = async (evt) => {
		setInputCity(evt.target.value)
		if (evt.target.value) {
			const sCities = await axios.get(
				`https://api.api-ninjas.com/v1/city?name=${evt.target.value}&limit=${limit}`,
				{ headers: { "X-Api-Key": process.env.REACT_APP_CITY_KEY } }
			)
			setSearchCities(sCities.data)
		}
	}
	const handleSubmit = (evt) => {
		evt.preventDefault()
		props.handleSubmit(city)
	}
	return (
		<Root className={classes.root}>
			<Paper
				elevation={3}
				sx={{ margin: "1rem", padding: "1rem", width: "500px" }}>
				<Autocomplete
					disablePortal
					id="combo-box-demo"
					options={searchCities}
					sx={{ width: 500 }}
					getOptionLabel={(option) => `${option.name}, ${option.country}`}
					value={city}
					onChange={handleChange}
					inputValue={inputCity}
					renderInput={(params) => (
						<>
							<TextField
								{...params}
								sx={{ width: "400px", marginRight: "20px" }}
								label="City..."
								onChange={handleInputChange}
							/>
							<Button
								className={classes.btn}
								sx={{ marginY: "auto" }}
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
