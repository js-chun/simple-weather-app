import React from "react"
import Typography from "@mui/material/Typography"

export default function PageContent(props) {
	const styles = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: "100vh",
		backgroundColor: "#2C3333",
		color: "#F5F2E7",
	}
	return (
		<div className="PageContent" style={styles}>
			<Typography variant="h2" mb={2}>
				Simple Weather App
			</Typography>
			{props.children}
		</div>
	)
}
