import React from "react";
import {Link} from "react-router-dom"

const Footer = ({links}) => {
    return (
        <footer className="navbar navbar-light bg-light">
            2019 @ Neil Hendricks
            <ul className="nav">
            {
                links.map(
                    (link) => <li className="nav-item">
                        <Link className="nav-link"
                        to={link.path}>{link.label}</Link>
                    </li>
                )
            }
            </ul>
        </footer>
    )
}

export default Footer;