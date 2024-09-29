import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [animes, setAnimes] = useState([]); // Store the fetched anime data

  const parameters = {
    method: 'get',
    url: 'https://anime-db.p.rapidapi.com/anime',
    headers: {
      'x-rapidapi-key': '1a56bfd615msh827c64475836d38p156166jsne5f255e30a1b',
      'x-rapidapi-host': 'anime-db.p.rapidapi.com',
    },
    params: {
      page: 1,
      size: 12, // Adjust based on the number of results you need
    },
  };

  const fetchData = async () => {
    try {
      const res = await axios.request(parameters);
      setAnimes(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <main className="px-20 py-10">
      <button onClick={fetchData}>click to run</button>
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
                  <p className="text-sm text-white text-shadow relative">{genre}</p>
                ))}
              </div>
              <div className="overflow-y-scroll h-[7.5rem] scrollbar-none">
                <p className="text-[8px] text-white text-shadow">{anime.synopsis}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Home;