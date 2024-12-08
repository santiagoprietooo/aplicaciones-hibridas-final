import React from "react";
import Menu from "./Menu";
import Logo from "/public/Icons/river-plate-badge.png";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="fixed top-0 z-20 flex flex-row justify-between items-center w-full bg-[#E2211C]">
            <NavLink
                to="/"
                className="px-5 rounded-full"
            >
                <img src={Logo} alt="Escudo de River Plate."  className="w-16"/>
            </NavLink>

            <Menu />
        </header>
    );
}

export default Header;