import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [animes, setAnimes] = useState([]); // Store the fetched anime data
  const [isFetching, setIsFetching] = useState(false); // Manage button disabled status
  const [currentPage, setCurrentPage] = useState(1); // Manage current page
  const [totalPages, setTotalPages] = useState(1); // Manage total pages
  const itemsPerPage = 21; // Number of items per page

  const parameters = {
    method: 'get',
    url: 'https://anime-db.p.rapidapi.com/anime',
    headers: {
      'x-rapidapi-key': '1a56bfd615msh827c64475836d38p156166jsne5f255e30a1b',
      'x-rapidapi-host': 'anime-db.p.rapidapi.com',
    },
    params: {
      page: currentPage,
      size: itemsPerPage,
    },
  };

  const fetchData = async (page) => {
    setIsFetching(true); // Disable the button
    try {
      console.log(`Fetching data for page: ${page}`); // Log the page number
      const res = await axios.request({
        ...parameters,
        params: { ...parameters.params, page },
      });
      console.log('API response:', res.data); // Log the API response
      setAnimes(res.data.data);
      setTotalPages(res.data.meta.totalPage); // Assuming the API returns total pages in meta
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false); // Re-enable the button if needed
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <main className="px-20 py-10">
      <h1 className="text-3xl mb-4">Latest Trends</h1>
      <section className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {animes.map((anime) => (
          <div key={anime._id} className="h-64 overflow-hidden relative group">
            <img
              src={anime.image}
              alt={anime.title}
              className="w-full h-full object-cover absolute opacity-75 transition-transform duration-500 group-hover:opacity-50 group-hover:scale-110"
            />
            <h1
              className="text-white text-sm font-semibold absolute bottom-2 left-2 text-shadow hover:underline block group-hover:hidden"
            >
              {anime.title}
            </h1>
            <div className="px-2 transform translate-y-full duration-500 opacity-0 transition-all group-hover:translate-y-[50%] group-hover:opacity-100">
              <a 
                href={anime.link} 
                rel="noopener noreferrer" 
                className="text-white text-sm font-semibold relative text-shadow hover:underline"
              >
                {anime.title}
              </a>
              <div className="flex gap-x-4">
                {anime.genres.map((genre) => (
                  <p key={genre} className="text-sm text-white text-shadow relative">{genre}</p>
                ))}
              </div>
              <div className="overflow-y-scroll h-[7.5rem] scrollbar-none">
                <p className="text-[8px] text-white text-shadow">{anime.synopsis}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
      <div className="flex justify-end mt-10 gap-x-2">
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} disabled={currentPage === 1} className="bg-black border border-black py-2 px-4 rounded hover:shadow hover:shadow-black">
            Previous
          </button>
        )}
        {generatePageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded ${
              page === currentPage
                ? "bg-[#dca54c] text-black font-semibold"
                : "bg-black text-gray-700 hover:shadow hover:shadow-black"
            }`}
          >
            {page}
          </button>
        ))}
          <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-black border border-black py-2 px-4 rounded hover:shadow hover:shadow-black">
            Next
          </button>
        </div>
    </main>
  );
}

export default Home;