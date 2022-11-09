export const login_inputs = [
	{
		name: 'name',
		type: 'text',
		placeholder: "Enter your name",
		validation: {
			required: "Name is required",
			minLength: {
				value: 2,
				message: "You should include at least two chars",
			},

		}
	},
];