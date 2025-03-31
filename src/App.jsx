import React from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useEffect, useState } from "react";

//API CONFIGURATION
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

const fetchMovies = async (query = '') => {
  setIsLoading(true);
  setErrorMessage("");
  try {
     const endpoint = query 
     ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc` 
     : `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

     console.log("Attempting to fetch from:", endpoint);
     const response = await fetch(endpoint, API_OPTIONS);
     
     if (!response.ok) {
       const errorData = await response.json().catch(() => ({}));
       console.error("Response not OK:", response.status, response.statusText, errorData);
       console.log({API_KEY});
       throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
     }
     
     const data = await response.json();
     
     if(Date.response ==="false "){
      setErrorMessage( data.error || "No movies found");
      setMoviesList([]);
      return;
     }
     
     setMoviesList(data.results || []);
     console.log("Successfully fetched data:", data);
     
  } catch (error) { 
    console.error("Error fetching movies:", error);
    setErrorMessage(`Failed to fetch movies: ${error.message}`);
  } finally {
    setIsLoading(false);
  }
}
  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]); 

  return (
    <main>
      <div className="pattern"  /> 
      <div className="wrapper">
         <header>
          <img src="/hero.png" alt="Hero Ba  nner" />
          <h1>
            Find <span className="text-gradient">Movie</span> You Will Enjoy Without Any Hassle
          </h1>   
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
         </header>
         <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>
          {isLoading ? (
            <Spinner />
          ): errorMessage ? (<p className="text-red-500 text-3xl">{errorMessage}</p>
          ):(
            <ul>
              {moviesList.map((movie) => (
                 <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
         </section>
      </div>
    </main>
  ) 
}



export default App;