import { Link } from "react-router-dom"

function Navbar() {
    return(
        <div className="navbar bg-black px-20">
            <div className="flex-1 gap-x-12">
                <Link to="/" className="text-2xl font-medium font-poppins">
                    <span>Anime<span className="text-red-400 font-semibold">Hub</span></span>
                </Link>
                <div className="space-x-5">
                    <Link to="/" className="text-sm font-medium">Home</Link>
                    <Link to="/anime" className="text-sm font-medium">Anime</Link>
                    <Link to="/genre" className="text-sm font-medium">Genre</Link>
                </div>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered text-white w-24 md:w-auto focus:w-80 focus:outline-none" />
                </div>
            </div>
        </div>
    )
}

export default Navbar