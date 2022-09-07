import { styled } from "@mui/material/styles"

const PREFIX = "Search"
const classes = {
	root: `${PREFIX}-root`,
	bg: `${PREFIX}-bg`,
	searchText: `${PREFIX}-searchText`,
	btn: `${PREFIX}-btn`,
}

const Root = styled("div")(({ theme, phoneView }) => ({
	[`&.${classes.root}`]: {
		backgroundColor: "#F5F2E7",
		marginBottom: "1rem",
		width: phoneView ? "100%" : "35rem",
	},
	[`& .${classes.bg}`]: {
		margin: "4% auto",
		padding: "3%",
		width: "88%",
	},
	[`& .${classes.searchText}`]: {
		width: phoneView ? "100%" : "82%",
		marginRight: "1.25rem",
	},
	[`& .${classes.btn}`]: {
		backgroundColor: "#2666CF",
		height: "3.5rem",
		opacity: "0.7",
		width: phoneView ? "100%" : "10%",
		display: phoneView ? "block" : "inline-block",
		["&:hover"]: {
			opacity: "1",
		},
		["& svg"]: {
			marginTop: "4px",
			transform: "scale(1.5)",
		},
	},
}))

export { classes, Root }
