import BeatLoader from "react-spinners/BeatLoader";

function Spinner() {
	const override = {
		transform: "rotate(90deg)",
	}
	return (
		<BeatLoader color="#F6FBF9" size={20} cssOverride={override} />
	)
}

export default Spinner;