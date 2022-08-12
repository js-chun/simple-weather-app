import { styled } from "@mui/material/styles"

const PREFIX = "WD"
const classes = {
	root: `${PREFIX}-root`,
	loc: `${PREFIX}-loc`,
	desc: `${PREFIX}-desc`,
	temp: `${PREFIX}-temp`,
	misc: `${PREFIX}-misc`,
	icon: `${PREFIX}-icon`,
}

const Root = styled("div")(({ theme }) => ({
	[`&.${classes.root}`]: {
		backgroundColor: "#F5F2E7",
	},
	[`& .${classes.loc}`]: {
		fontSize: "2rem",
		marginTop: "0",
		textTransform: "uppercase",
		textAlign: "end",
	},
	[`& .${classes.desc}`]: {
		textTransform: "lowercase",
		fontStyle: "italic",
		marginTop: "0",
		marginBottom: "0.5rem",
		fontSize: "1.2rem",
		opacity: "0.5",
	},
	[`& .${classes.temp}`]: {
		backgroundColor: "#F5F2E7",
		width: "46%",
		display: "inline-block",
		margin: "0 2%",
	},
	[`& .${classes.misc}`]: {
		backgroundColor: "#F5F2E7",
		width: "96%",
		margin: "2%",
	},
	[`& .${classes.icon}`]: {
		width: "36px",
		height: "36px",
		verticalAlign: "bottom",
	},
}))

export { Root, classes }
