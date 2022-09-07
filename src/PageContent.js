import React from "react"
import Typography from "@mui/material/Typography"

export default function PageContent(props) {
	const { phoneView } = props
	const styles = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: phoneView ? "start" : "center",
		height: "100vh",
		backgroundColor: "#2C3333",
		color: "#F5F2E7",
	}

	return (
		<div className="PageContent" style={styles}>
			<Typography
				variant={phoneView ? "h4" : "h2"}
				mb={2}
				mt={phoneView ? 2 : 0}>
				Simple Weather App
			</Typography>
			{props.children}
		</div>
	)
}
