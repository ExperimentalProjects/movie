import React from "react";
import styled from "styled-components";

function MovieCard(props) {
  return (
    <Container>
      <Poster src={props.Poster} alt="poster" />
      <ColumnDiv>
        <div><strong>{props.Title}</strong></div>
        <div>{props.Year}</div>
      </ColumnDiv>
    </Container>
  );
}

export default MovieCard;

const Container = styled.div`
  box-shadow: -2px -2px 15px 3px #dedada;
  border-radius: 4px;
  padding: 10px;
  color: black;
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${window.innerWidth * 0.9}px;
  max-width: 600px;
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
