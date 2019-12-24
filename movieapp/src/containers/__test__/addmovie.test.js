import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddMovie from "../addMovie";

jest.mock("react-redux", () => ({
    useSelector: jest.fn(fn => fn({
        user: {}
    })),
    useDispatch: () => jest.fn()
  }));

  jest.mock("react-router-dom", () => ({
    Redirect: <div></div>
  }));

test("renders app", () => {
  render(<AddMovie />);
  expect(screen.getByText("Genre")).toBeInTheDocument();
  expect(screen.getByText("Title")).toBeInTheDocument();
});
