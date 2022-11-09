const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	color: "#fff",
	fontSize: "40px",
	fontWeight: "bold",
	minWidth: "250px",
	textAlign: "center",
}


function NotFound() {
	return (
		<h1 style={style}>Not Found <span>404</span></h1>
	)
}
export default NotFound;