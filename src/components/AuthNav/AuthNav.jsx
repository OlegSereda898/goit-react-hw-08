import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <div className={css.navigation}>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
    </div>
  );
};

export default AuthNav;
