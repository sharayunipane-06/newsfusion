import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './Header.css';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { atomWithStorage } from "jotai/utils";

export const new_url = atomWithStorage(null)

function Header() {
    const [Toggle, setToggle] = useState(false);

    return (
        <div className="div1">
            <div className="div2">
                <div className="div3">
                    <h2 className="logo">NewsFusion</h2>
                </div>

                {/* Toggle Menu for Mobile */}
                {Toggle ? (
                    <AiOutlineClose onClick={() => setToggle(!Toggle)} className="ai" />
                ) : (
                    <AiOutlineMenu onClick={() => setToggle(!Toggle)} className="ai" />
                )}

                {Toggle && (
                    <ul className="ul2">
                        <li className="m2">
                            <NavLink to="/" className={({ isActive }) => isActive ? "active_class headbtn1" : "headbtn1"}>
                                Home
                            </NavLink>
                        </li>
                        <li className="m2">
                            <NavLink to="/news" className={({ isActive }) => isActive ? "active_class headbtn1" : "headbtn1"}>
                                News
                            </NavLink>
                        </li>
                        <li className="m2">
                            <NavLink to="/pastnews" className={({ isActive }) => isActive ? "active_class headbtn1" : "headbtn1"}>
                                Past News
                            </NavLink>
                        </li>
                        <li className="m2">
                            <NavLink to="/about" className={({ isActive }) => isActive ? "active_class headbtn1" : "headbtn1"}>
                                About
                            </NavLink>
                        </li>
                    </ul>
                )}

                {/* Navigation Links for Desktop */}
                <ul className="ul">
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? "active_class headbtn" : "headbtn"}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/news" className={({ isActive }) => isActive ? "active_class headbtn" : "headbtn"}>
                            News
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/pastnews" className={({ isActive }) => isActive ? "active_class headbtn" : "headbtn"}>
                            Past News
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={({ isActive }) => isActive ? "active_class headbtn" : "headbtn"}>
                            About
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;

