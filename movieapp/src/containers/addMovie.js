import React, { useState, useEffect, Suspense } from "react";
import styled from "styled-components";
import AppRouteContainer from "../AppRouteContainer";
import { addAMovieAction } from "../store/reducers/user";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Select from "react-select";

const genreOptions = [
  { value: "Action", label: "Action" },
  { value: "Drama", label: "Drama" },
  { value: "Comedy", label: "Comedy" },
  { value: "Romance", label: "Romance" },
  { value: "Horror", label: "Horror" }
];

const languageOptions = [
  { value: "English", label: "English" },
  { value: "Hindi", label: "Hindi" },
  { value: "Spanish", label: "Spanish" },
  { value: "German", label: "German" },
  { value: "Punjabi", label: "Punjabi" }
];

function validateForm(state, setError) {
  let error = {};
  Object.keys(state).forEach(key => {
    if (!state[key]) {
      error[key] = "Required";
    } else {
      if (key === "Year") {
        let yearSelected = parseInt(state[key]);
        let d = new Date();
        let n = d.getFullYear();
        if (!isNaN(yearSelected)) {
          if (yearSelected > n) {
            error[key] = "No future Years";
          }
        } else {
          error[key] = `Enter Valid year, Eg: ${n}`;
        }
      } else if (key === "Plot") {
        if (state[key].length < 100) {
          error[key] = `Enter atlease 100 letter`;
        }
      } else if (key === "Genre") {
        if (state[key].length > 3) {
          error[key] = `You can not select more than 3 Genre`;
        }
      } else if (key === "Poster") {
        let urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (!urlRegex.test(state[key])) {
          error[key] = `Enter Valid URL`;
        }
      }
    }
  });
  if (Object.keys(error).length > 0) {
    setError(error);
    return true;
  } else {
    setError(false);
    return false;
  }
}

function addMovieFunction(state, setError, dispatch, setSuccess) {
  let hasError = validateForm(state, setError);
  if (!hasError) {
    // add movie
    let d = new Date();
    state.imdbID = d.getTime();
    state.local = true;

    let GenreValue = "";
    state.Genre.forEach((item, i) => {
      GenreValue += item.value;
      if (i < state.Genre.length - 1) {
        GenreValue += ", ";
      }
    });
    state.Genre = GenreValue;
    state.Language = state.Language.value;

    dispatch(addAMovieAction(state));
    typeof setSuccess === "function" && setSuccess(true);
  }
}

function Addmovie(props) {
  const dispatch = useDispatch();
  const [Title, setTitle] = useState(null);
  const [Year, setYear] = useState(null);
  const [Genre, setGenre] = useState(null);
  const [Language, setLanguage] = useState(null);
  const [Plot, setPlot] = useState(null);
  const [Poster, setPoster] = useState(null);
  const [Error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    validateForm(
      {
        Title,
        Year,
        Genre,
        Language,
        Plot,
        Poster
      },
      setError
    );
  }, [Title, Year, Genre, Language, Plot, Poster]);
  return (
    <AppRouteContainer>
      {!success && (
        <form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <FieldContainer>
              <Label>Title:</Label>
              <FieldContainerInner>
                <FormInput
                  name="Title"
                  type="text"
                  onBlur={e => setTitle(e.target.value)}
                  maxLength="50"
                ></FormInput>
                {Error.Title && <ErrorMessage>{Error.Title}</ErrorMessage>}
              </FieldContainerInner>
            </FieldContainer>
            <FieldContainer>
              <Label>Year:</Label>
              <FieldContainerInner>
                <FormInput
                  name="Year"
                  type="text"
                  onBlur={e => setYear(e.target.value)}
                ></FormInput>
                {Error.Year && <ErrorMessage>{Error.Year}</ErrorMessage>}
              </FieldContainerInner>
            </FieldContainer>
            <FieldContainer>
              <Label>Genre:</Label>
              <FieldContainerInner>
                <SelectInput>
                  <Select
                    styles={customStyles}
                    name="Genre"
                    type="text"
                    isMulti
                    onChange={option => setGenre(option)}
                    options={genreOptions}
                  />
                </SelectInput>
                {Error.Genre && <ErrorMessage>{Error.Genre}</ErrorMessage>}
              </FieldContainerInner>
            </FieldContainer>
            <FieldContainer>
              <Label>Language:</Label>
              <FieldContainerInner>
                <SelectInput>
                  <Select
                    styles={customStyles}
                    name="Language"
                    type="text"
                    onChange={option => setLanguage(option)}
                    options={languageOptions}
                  />
                </SelectInput>
                {Error.Language && (
                  <ErrorMessage>{Error.Language}</ErrorMessage>
                )}
              </FieldContainerInner>
            </FieldContainer>
            <FieldContainer>
              <Label>Plot:</Label>
              <FieldContainerInner>
                <FormInput
                  name="Plot"
                  type="text"
                  onBlur={e => setPlot(e.target.value)}
                  minLength="100"
                  maxLength="500"
                ></FormInput>
                {Error.Plot && <ErrorMessage>{Error.Plot}</ErrorMessage>}
              </FieldContainerInner>
            </FieldContainer>
            <FieldContainer>
              <Label>Poster:</Label>
              <FieldContainerInner>
                <FormInput
                  name="Poster"
                  type="text"
                  onBlur={e => setPoster(e.target.value)}
                ></FormInput>
                {Error.Poster && <ErrorMessage>{Error.Poster}</ErrorMessage>}
              </FieldContainerInner>
            </FieldContainer>

            <SubmitButton
              onClick={event => {
                event.preventDefault();
                addMovieFunction(
                  {
                    Title,
                    Year,
                    Genre,
                    Language,
                    Plot,
                    Poster
                  },
                  setError,
                  dispatch,
                  setSuccess
                );
              }}
            >
              Add Movie
            </SubmitButton>
          </div>
        </form>
      )}
      {success && <Redirect to="/dashboard" />}
    </AppRouteContainer>
  );
}

export default Addmovie;

const SelectInput = styled.div`
  height: auto;
  min-height: 40px;
  width: 205px;
  font-size: 16px;
  color: black;
  border: 1px solid black;
  border-radius: 4px;
  .css-2b097c-container {
    border-style: none;
    box-shadow: none;
    :focus: {
      border-style: none;
      box-shadow: none;
    }
  }
  .css-yk16xz-control {
    border-style: none;
    box-shadow: none;
    :focus: {
      border-style: none;
      box-shadow: none;
    }
  }
`;

const FormInput = styled.input`
  height: 40px;
  width: 200px;
  font-size: 16px;
  color: black;
  border: 1px solid black;
  border-radius: 4px;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
`;
const FieldContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
`;
const Label = styled.label`
  width: 100px;
  margin-bottom: 10px;
`;
const ErrorMessage = styled.span`
  font-size: 12px;
  color: red;
`;

const SubmitButton = styled.button`
  height: 40px;
  width: 100px;
  margin: 10px;
  font-size: 16px;
  color: black;
  border: 1px solid black;
  border-radius: 4px;
`;

const customStyles = {
  control: base => ({
    ...base,
    border: 0,
    // This line disable the blue border
    boxShadow: "none"
  }),
  container: base => ({
    ...base,
    border: 0,
    // This line disable the blue border
    boxShadow: "none"
  })
};
