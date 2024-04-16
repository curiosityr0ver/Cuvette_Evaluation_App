import "./Loader.css";
function Loader() {
	const display = true;
	return (
		<div
			style={{
				display: display ? "block" : "none",
			}}
			className="lds-ring"
		>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}

export default Loader;
