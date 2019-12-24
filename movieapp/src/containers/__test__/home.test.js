
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from '../home'

jest.mock("react-redux", () => ({
    useSelector: jest.fn(fn => fn({
        user: {
            isLoggedIn: true, 
            fetchingUserSession: false,
            movies: [],
            localMovie: [],
            displayMovies: []
        }
    })),
    useDispatch: () => jest.fn()
  }));

  const mockSetState = jest.fn();
  jest.mock('react', () => ({
    useState: initial => [initial, mockSetState]
  }));

  jest.mock("react-router-dom", () => ({
    Redirect: <div></div>,
    Link: <div></div>
  }));

test("renders Home", () => {
    render(<Home />);
    expect(screen.getByText("Genre:")).toBeInTheDocument();
    expect(screen.getByText("Title:")).toBeInTheDocument();
  });