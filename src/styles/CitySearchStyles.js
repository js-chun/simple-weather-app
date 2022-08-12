import { styled } from "@mui/material/styles"

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

export { classes, Root }
