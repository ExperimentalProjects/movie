import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadLoggedInUserAction } from "./store/reducers/user";
import {
  Redirect
} from "react-router-dom";

export default function AppRouteContainer (props) {
  let dispatch = useDispatch()
  let isLoggedIn = useSelector(state => state.user.isLoggedIn)
  let fetchingUserSession = useSelector(state => state.user.fetchingUserSession)
  useEffect(() => {
    dispatch(loadLoggedInUserAction())
  }, []);
  if (isLoggedIn) {
    return <>{props.children}</>;
  } else if (fetchingUserSession) {
    return <div>fetching user...</div>;
  } else {
    return <Redirect to="/login" />;
  }
}
