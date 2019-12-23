import React from "react";
import styled from "styled-components";

function MovieCard(props) {
  return (
    <Container>
      <Poster src={props.Poster} />
      <ColumnDiv>
        <div>{props.Title}</div>
        <div>{props.Year}</div>
      </ColumnDiv>
    </Container>
  );
}

export default MovieCard;

const Container = styled.div`
  box-shadow: 1px 1px 1px 1px #888888;
  border-radius: 4px;
  padding: 10px;
  color: black;
  margin: 10px;
  display: flex;
  flex-direction: row;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;

const Poster = styled.img`
  width: 100px;
  height: 100px;
`
