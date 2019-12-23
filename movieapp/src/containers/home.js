import React from "react";
import AppRouteContainer from "../AppRouteContainer";
import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

function Home(props) {
  const movies = useSelector(state => state.user.movies || []);
  return (
    <AppRouteContainer>
      {movies.map(movie => (
        <Link key={movie.imdbID} to={`/detail?id=${movie.imdbID}`}>
          <MovieCard {...movie} />
        </Link>
      ))}
    </AppRouteContainer>
  );
}

export default Home;
