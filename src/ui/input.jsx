const Input = ({ type = "text", icon, placeholder, state, setState }) => {
	return (
		<label className="flex items-center bg-white rounded-xl px-4 py-1 gap-4">
			<span className="text-lg">{icon}</span>
			<input
				type={type}
				placeholder={placeholder}
				className="w-full text-lg border-none outline-none focus:outline-none focus:ring-0"
				value={state}
				onChange={(e) => setState(e.target.value)}
			/>
		</label>
	);
};

export default Input;
