import React, { useState } from "react";
import styled from "styled-components";
import AppRouteContainer from "../AppRouteContainer";
import { useSelector, useDispatch } from "react-redux";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import {
  searchMovie,
  sortByYearAction,
  filterByYear
} from "../store/reducers/user";

function Home() {
  let movies = useSelector(state => state.user.displayMovies || []);
  let apiMovies = useSelector(state => state.user.movies || []);
  let localMovies = useSelector(state => state.user.localMovie || []);
  let dispatch = useDispatch();
  let [search, setSearch] = useState("");

  let allMovies = [...apiMovies, ...localMovies]
  
  return (
    <AppRouteContainer>
      <HomeContainer>
        <h3>Movie title to search for.</h3>
        <div style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <SearchInput
            name="search"
            type="text"
            onChange={e => setSearch(e.target.value)}
          ></SearchInput>
          <SearchButton onClick={() => dispatch(searchMovie(search))}>
            Search
          </SearchButton>
          <SearchButton onClick={() => dispatch(sortByYearAction(movies))}>
            Sort by Year
          </SearchButton>
          <FilterDropDown
            onChange={e => dispatch(filterByYear(allMovies, e.target.value))}
          >
            <option value="filter">Filter</option>
            { allMovies &&
              allMovies.map((item, i) => (
                <option key={item.Year+i} value={item.Year}>{item.Year}</option>
              ))}
          </FilterDropDown>
          <Link to={`/add`}>
            <SearchButton>Add Movie</SearchButton>
          </Link>
        </div>
        {movies.map((movie, i) => {
          let url = movie.local ? "/dashboard" : `/detail?id=${movie.imdbID}`;
          return (
            <Link key={`${movie.imdbID}_${i}`} to={url}>
              <MovieCard {...movie} />
            </Link>
          );
        })}
      </HomeContainer>
    </AppRouteContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  width: ${window.innerWidth}px;
`;

const SearchInput = styled.input`
  height: 40px;
  width: 200px;
  margin: 10px;
  font-size: 16px;
  color: black;
  border: 1px solid black;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  height: 40px;
  width: 100px;
  margin: 10px;
  font-size: 16px;
  color: black;
  border: 1px solid black;
  border-radius: 4px;
`;

const FilterDropDown = styled.select`
  height: 40px;
  width: 100px;
  margin: 10px;
  font-size: 16px;
  color: black;
  border: 1px solid black;
  border-radius: 4px;
`;
