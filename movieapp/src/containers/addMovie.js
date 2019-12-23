import React, { useState, useEffect, Suspense } from "react";
import styled from "styled-components";
import AppRouteContainer from "../AppRouteContainer";
import { addAMovieAction } from "../store/reducers/user";
import { useDispatch } from "react-redux";
import {
  Redirect
} from "react-router-dom";

function validateForm(state, setError) {
  let error = {}
  Object.keys(state).forEach(key => {
    if (!state[key]) {
      error[key] = "Required"
    } else {
      if (key === "Year") {
        let yearSelected = parseInt(state[key])
        let d = new Date();
        let n = d.getFullYear();
        if (!isNaN(yearSelected)) {
          if (yearSelected > n) {
            error[key] = "No future Years"
          }
        } else {
          error[key] = `Enter Valid year, Eg: ${n}`
        }
      } else if (key === "Plot") {
        if (state[key].length < 100) {
          error[key] = `Enter atlease 100 letter`
        }
      }
      else if (key === "Poster") {
        let urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (!urlRegex.test(state[key])) {
          error[key] = `Enter Valid URL`
        }
      }
    }
  })
  if (Object.keys(error).length > 0) {
    setError(error)
    return true;
  } else {
    setError(false)
    return false
  }
}

function addMovieFunction(state, setError, dispatch, setSuccess) {
  let hasError = validateForm(state, setError)
  if (!hasError) {
    // add movie
    let d = new Date()
    state.imdbID = d.getTime()
    state.local = true
    dispatch(addAMovieAction(state))
    typeof setSuccess === 'function' && setSuccess(true)
  }
}

function Addmovie(props) {
  const dispatch = useDispatch();
  const [Title, setTitle] = useState(null)
  const [Year, setYear] = useState(null)
  const [Genre, setGenre] = useState(null)
  const [Language, setLanguage] = useState(null)
  const [Plot, setPlot] = useState(null)
  const [Poster, setPoster] = useState(null)
  const [Error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    validateForm({
      Title, Year, Genre, Language, Plot, Poster
    }, setError)
  }, [Title, Year, Genre, Language, Plot, Poster]);

  return (
    <AppRouteContainer>
      {!success &&
        <form>
          <div style={{ display: 'flex', flexDirection: "column" }}>
            <FieldContainer>
              <Label>Title:</Label>
              <FormInput name="Title" type="text" onBlur={e => setTitle(e.target.value)} maxLength="50"></FormInput>
              {Error.Title && <ErrorMessage >{Error.Title}</ErrorMessage>}
            </FieldContainer>
            <FieldContainer>
              <Label>Year:</Label>
              <FormInput name="Year" type="text" onBlur={e => setYear(e.target.value)} ></FormInput>
              {Error.Year && <ErrorMessage >{Error.Year}</ErrorMessage>}
            </FieldContainer>
            <FieldContainer>
              <Label>Genre:</Label>
              <SelectInput name="Genre" type="text" onBlur={e => setGenre(e.target.value)} >
                <option value=""></option>
                <option value="Action">Action</option>
                <option value="Romance">Romance</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
              </SelectInput>
              {Error.Genre && <ErrorMessage >{Error.Genre}</ErrorMessage>}
            </FieldContainer>
            <FieldContainer>
              <Label>Language:</Label>
              <SelectInput name="Language" type="text" onBlur={e => setLanguage(e.target.value)} >
                <option value=""></option>
                <option value="Action">English</option>
                <option value="Romance">Hindi</option>
              </SelectInput>
              {Error.Language && <ErrorMessage >{Error.Language}</ErrorMessage>}
            </FieldContainer>
            <FieldContainer>
              <Label>Plot:</Label>
              <FormInput name="Plot" type="text" onBlur={e => setPlot(e.target.value)} minLength="100" maxLength="500" ></FormInput>
              {Error.Plot && <ErrorMessage >{Error.Plot}</ErrorMessage>}
            </FieldContainer>
            <FieldContainer>
              <Label>Poster:</Label>
              <FormInput name="Poster" type="text" onBlur={e => setPoster(e.target.value)} ></FormInput>
              {Error.Poster && <ErrorMessage >{Error.Poster}</ErrorMessage>}
            </FieldContainer>

            <SubmitButton onClick={(event) => {
              event.preventDefault()
              addMovieFunction({
                Title, Year, Genre, Language, Plot, Poster
              }, setError, dispatch, setSuccess)
            }}> Add Movie </SubmitButton>
          </div>
        </form>
      }
      {
        success && <Redirect to="/dashboard" />
      }
    </AppRouteContainer>
  );
}

export default Addmovie;


const SelectInput = styled.select`
       height: 40px;
       width: 200px;
       margin: 10px;
       font-size: 16px;
       color: black;
    `

const FormInput = styled.input`
       height: 40px;
       width: 200px;
       margin: 10px;
       font-size: 16px;
       color: black;
    `

const FieldContainer = styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      padding: 10px;
    `

const Label = styled.label`
       width: 100px;
    `
const ErrorMessage = styled.span`
    font-size: 12px;
    color: red;
  `

const SubmitButton = styled.button`
       height: 40px;
       width: 100px;
       margin: 10px;
       font-size: 16px;
       color: black;
`