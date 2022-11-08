import Navbar from "../navbar/Navbar"

const Layout = params => {
	return <>
		<Navbar title={params.title} />
		{params.children}
	</>
}
export default Layout