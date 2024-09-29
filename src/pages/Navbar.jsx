function Navbar() {
    return(
        <div className="navbar bg-black px-20">
            <div className="flex-1 gap-x-12">
                <a className="text-2xl font-medium font-poppins">
                    <span>Anime<span className="text-red-400 font-semibold">Hub</span></span>
                </a>
                <div className="space-x-5">
                    <a className="text-sm font-medium">Anime</a>
                    <a className="text-sm font-medium">Genre</a>
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