import { API_LOGIN_KEY } from "../../storage";

export const FETCH_LOGGED_IN_USER = "FETCH_LOGGED_IN_USER";
export const FETCH_LOGGED_IN_USER_FAILED = "FETCH_LOGGED_IN_USER_FAILED";
export const LOAD_DASHBOARD_MOVIES = "LOAD_DASHBOARD_MOVIES";
export const LOAD_MOVIE_DETAIL = "LOAD_MOVIE_DETAIL";
export const CHANGE_DISPLAY_MOVIE_LIST = "CHANGE_DISPLAY_MOVIE_LIST";
export const ADD_MOVIE_IN_LOCAL = "ADD_MOVIE_IN_LOCAL";
const INITIAL_STATE = {
  isLoggedIn: false,
  fetchingUserSession: true,
  movies: [],
  localMovie: [],
  displayMovies: []
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LOGGED_IN_USER:
      return {
        ...state,
        isLoggedIn: !!action.data,
        apiKey: action.data,
        fetchingUserSession: false
      };

    case FETCH_LOGGED_IN_USER_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        apiKey: null,
        fetchingUserSession: false
      };

    case LOAD_DASHBOARD_MOVIES:
      return {
        ...state,
        movies: action.data,
        displayMovies: [...action.data, ...state.localMovie]
      };

    case LOAD_MOVIE_DETAIL:
      return { ...state, selectedMovie: action.data };

    case CHANGE_DISPLAY_MOVIE_LIST:
      return { ...state, displayMovies: action.data };

    case ADD_MOVIE_IN_LOCAL:
      return {
        ...state,
        displayMovies: [...state.displayMovies, action.data],
        localMovie: [...state.localMovie, action.data]
      };

    default:
      return state;
  }
};

export const loadLoggedInUserAction = () => dispatch => {
  let loggedInUser = localStorage.getItem(API_LOGIN_KEY);
  if (loggedInUser == "null") loggedInUser = JSON.parse(loggedInUser);
  dispatch(loginAction(loggedInUser));
};

export const loginAction = (id, onSuccess, onFail) => dispatch => {
  if (!!id) {
    fetch(`https://www.omdbapi.com/?apikey=${id}&type=movie&s=avengers`)
      .then(response => {
        response.json().then(data => {
          //Save key for login
          if (data.Response !== "False") {
            localStorage.setItem(API_LOGIN_KEY, id);
            dispatch({ type: LOAD_DASHBOARD_MOVIES, data: data.Search });
            dispatch({ type: FETCH_LOGGED_IN_USER, data: id });
            typeof onSuccess === "function" && onSuccess();
          } else {
            dispatch({ type: FETCH_LOGGED_IN_USER_FAILED });
            typeof onFail === "function" && onFail(data.Error);
          }
        });
      })
      .catch(err => {
        console.log({ err });
        dispatch({ type: FETCH_LOGGED_IN_USER_FAILED });
        typeof onFail === "function" && onFail("Login failed");
      });
  } else {
    dispatch({ type: FETCH_LOGGED_IN_USER_FAILED });
    typeof onFail === "function" && onFail("Login failed");
  }
};

export const loadMovieDetails = id => dispatch => {
  let apiKey = localStorage.getItem(API_LOGIN_KEY);
  dispatch({ type: LOAD_MOVIE_DETAIL, data: undefined });
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
    .then(response =>
      response.json().then(data => {
        console.log({ loadMovieDetails: data });
        dispatch({ type: LOAD_MOVIE_DETAIL, data });
      })
    )
    .catch(err => {
      dispatch({ type: FETCH_LOGGED_IN_USER_FAILED });
    });
};

export const searchMovie = search => dispatch => {
  let apiKey = localStorage.getItem(API_LOGIN_KEY);
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${search}`)
    .then(response =>
      response.json().then(data => {
        if (data.Response !== "False") {
          dispatch({ type: LOAD_DASHBOARD_MOVIES, data: data.Search });
        } else {
          dispatch({ type: LOAD_DASHBOARD_MOVIES, data: null });
        }
      })
    )
    .catch(err => {
      dispatch({ type: LOAD_DASHBOARD_MOVIES, data: null });
    });
};

export const sortByYearAction = movies => dispatch => {
  // to force re-render after sorting
  dispatch({
    type: CHANGE_DISPLAY_MOVIE_LIST,
    data: null
  });
  let sortedMovies = movies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
  dispatch({
    type: CHANGE_DISPLAY_MOVIE_LIST,
    data: sortedMovies
  });
};

export const filterByYear = (movies, year) => dispatch => {
  dispatch({
    type: CHANGE_DISPLAY_MOVIE_LIST,
    data: null
  });
  let filteredMovie = year== "filter" ?  movies : movies.filter(item => item.Year == year);
  dispatch({
    type: CHANGE_DISPLAY_MOVIE_LIST,
    data: filteredMovie
  });
};

export const addAMovieAction = movie => {
  return {
    type: ADD_MOVIE_IN_LOCAL,
    data: movie
  };
};
