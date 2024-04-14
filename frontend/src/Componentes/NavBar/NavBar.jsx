import { NavLink, Link } from 'react-router-dom';
import React from 'react';
export default function  NavBar(){

    return(
    <>
                    <div className="collapse" id="navbarToggleExternalContent">
                        <div className="bg-dark p-4">
                            <h5 className="text-white h4">Recrutamento online</h5>
                            <li>
                            <Link href="/" className="nav-link text-white">
                            <NavLink className="nav-link activate bi me-2 text-white" width="16" height="16" to="/Candidato">Cadrasto Candidato</NavLink>
                            </Link> {   }
                            <Link href="/" className="nav-link text-white">
                            <NavLink className="nav-link activate bi me-2 text-white" width="16" height="16" to="/Inscricao">Inscrição Candidato</NavLink>
                            </Link>
                            </li>
                            <span className="text-muted">Toggleable via the navbar brand.</span>
                        </div>
                    </div>
                    <nav className="navbar navbar-dark bg-dark mb-5">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </nav>
    
    </>)
}