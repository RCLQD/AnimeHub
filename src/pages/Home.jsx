import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [animes, setAnimes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 21;

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
    setIsFetching(true);
    try {
      console.log(`Fetching data for page: ${page}`);
      const res = await axios.request({
        ...parameters,
        params: { ...parameters.params, page },
      });
      setAnimes(res.data.data);
      setTotalPages(res.data.meta.totalPage);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const pageToShow = 3;
    let startPage = Math.max(2, currentPage - Math.floor(pageToShow / 2));
    let endPage = Math.min(totalPages - 1, currentPage + pageToShow - 2);

    if (endPage - startPage + 1 < pageToShow) {
      startPage = Math.max(2, endPage - pageToShow + 1);
    }

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
              className="text-white text-sm font-bold absolute bottom-2 left-2 text-shadow hover:underline block group-hover:hidden"
            >
              {anime.title}
            </h1>
            <div className="absolute bottom-0 left-0 right-0 p-2 transform translate-y-5 duration-500 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
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
              <p className="text-[8px] text-white text-shadow">{anime.synopsis}</p>
            </div>
          </div>
        ))}
      </section>
      <div className="flex justify-end mt-10 gap-x-2 items-center">
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} disabled={currentPage === 1} className="bg-black border border-black py-2 px-4 rounded hover:shadow hover:shadow-black">
            Previous
          </button>
        )}
        
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(1)} className="bg-black border border-black py-2 px-4 rounded hover:shadow hover:shadow-black">
            1
          </button>
        )}
        
        {currentPage > 2 && (
          <div className="flex items-end">
            <span className="text-gray-500">...</span>
          </div>
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

        {currentPage < totalPages - 1 && (
          <div className="flex items-end">
            <span className="text-gray-500">...</span>
          </div>
        )}
        
        {currentPage < totalPages && (
          <button onClick={() => setCurrentPage(totalPages)} className="bg-black border border-black py-2 px-4 rounded hover:shadow hover:shadow-black">
            {totalPages}
          </button>
        )}

        {currentPage < totalPages && (
          <button onClick={handleNextPage} className="bg-black border border-black py-2 px-4 rounded hover:shadow hover:shadow-black">
            Next
          </button>
        )}
      </div>
    </main>
  );
}

export default Home;