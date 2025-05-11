const TMDB_API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGFjODk0NmYyMGJhZDllYWE0ZWU5OGFhZDkxYTBlNSIsIm5iZiI6MS42OTU3OTQyNTk0OTQwMDAyZSs5LCJzdWIiOiI2NTEzYzQ1MzA0OTlmMjAwYWJiY2RiNjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.H6A37rbiZdLd7Sp8LoXJaS-ZTQoth68wdCIwaQPq87A"

export const fetchMovies = async ({ category, page }) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`, 
      },
    }
  );
  return res.json();
};

export const fetchMovieDetails = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    }
  );
  return res.json();
};


