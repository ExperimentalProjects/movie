import { API_LOGIN_KEY } from "../../storage";

export const FETCH_LOGGED_IN_USER = "FETCH_LOGGED_IN_USER";
export const LOAD_DASHBOARD_MOVIES = "LOAD_DASHBOARD_MOVIES";
export const LOAD_MOVIE_DETAIL = "LOAD_MOVIE_DETAIL";
const INITIAL_STATE = {
  isLoggedIn: false,
  fetchingUserSession: true
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

    case LOAD_DASHBOARD_MOVIES:
      return { ...state, movies: action.data };

    case LOAD_MOVIE_DETAIL:
      return { ...state, selectedMovie: action.data };

    default:
      return state;
  }
};

export const loadLoggedInUserAction = () => dispatch => {
  let loggedInUser = localStorage.getItem(API_LOGIN_KEY);
  console.log({ loggedInUser });
  dispatch(loginAction(loggedInUser));
};

export const loginAction = id => dispatch => {
  fetch(`http://www.omdbapi.com/?apikey=${id}&type=movie&s=avengers`)
    .then(response => {
      response.json().then(data => {
        //Save key for login
        localStorage.setItem(API_LOGIN_KEY, id);
        dispatch({ type: LOAD_DASHBOARD_MOVIES, data: data.Search });
        dispatch({ type: FETCH_LOGGED_IN_USER, data: id });
      });
    })
    .catch(err => {
      console.log({ err });
    });
};

export const loadMovieDetails = id => dispatch => {
  let apiKey = localStorage.getItem(API_LOGIN_KEY);
  dispatch({type:LOAD_MOVIE_DETAIL, data:undefined})
  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`).then(response =>
    response.json().then(data => {
      console.log({ loadMovieDetails: data });
      dispatch({type:LOAD_MOVIE_DETAIL, data})
    })
  );
};
