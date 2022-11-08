export function reducer(state, action) {
	switch (action.type) {
		case "ENTER": return {
			jwt: action.item.jwt,
			user: action.item.user,
			isAuth: action.item.isAuth,
		}
		case "RESET": return {
			jwt: "",
			user: {},
			isAuth: false,
		}
		default: return state;
	}
}