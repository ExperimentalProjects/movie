import React, { useEffect } from "react";
import styled from "styled-components";
import AppRouteContainer from "../AppRouteContainer";
import { useDispatch, useSelector } from "react-redux";
import { loadMovieDetails } from "../store/reducers/user";
import { getUrlParam } from "../utils";

function MovieDetail(props) {
  const dispatch = useDispatch();
  const movieId = getUrlParam("id");
  useEffect(() => {
    dispatch(loadMovieDetails(movieId));
  }, [movieId]);
  const selectedMovie = useSelector(state => state.user.selectedMovie || {});
  const { Title, Poster, ...rest } = selectedMovie
  return (
    <AppRouteContainer>
      <Container>
        <h1>{selectedMovie.Title}</h1>
        <img src={selectedMovie.Poster} />
        <ColumnDiv>
          {Object.keys(rest).map((key) => typeof rest[key] === "string" ? <span><strong>{key}:</strong>{rest[key]}</span> : null)}
        </ColumnDiv>
      </Container>
    </AppRouteContainer>
  );
}

export default MovieDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 24px;
`;
