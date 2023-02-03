import React from "react";
import "./index.css";
import { NavLink } from "react-router-dom";

function Menu()
{
    return (
        <>
           <div className="menu">
            <NavLink  className="home" to="/">Home</NavLink>
            <NavLink className="about" to="/about">About</NavLink>
            </div>
           
        </>
    )

}
export default Menu;