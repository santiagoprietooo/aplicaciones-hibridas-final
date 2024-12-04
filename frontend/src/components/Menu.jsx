import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../contexts/AuthContext';
import { AdminContext } from "../contexts/AdminContext";
import '../css/Index.css';
import '../css/Tailwind.css';

function Menu() {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    const isUser = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("admin_token");
    const { signOut } = useContext(AuthContext);
    const { signOutForAdmin } = useContext(AdminContext);

    const adminRoutes = [
        {name : "Lista de productos", path : "/admin/products_list",     id : "products-list"},
        {name : "Agregar camisetas",  path : "/admin/add_camiseta",      id : "add-camiseta"},
        {name : "Agregar prendas",    path : "/admin/add_prenda",        id : "add-prenda"}
    ]
    
    const userRoutes = [
        {name : "Inicio",          path : "/",                         id : "home"},
        {name : "Camisetas",       path : "/camisetas",                id : "camisetas"},
        {name : "Prendas",         path : "/prendas",                  id : "prendas"},
        {name : "Perfil",          path : `/perfil/${parsedUser?.id}`, id : "perfil"}
    ]
    
    const defRoutes = [
        {name : "Inicio",          path : "/",             id : "home"},
        {name : "Camisetas",       path : "/camisetas",    id : "camisetas"},
        {name : "Prendas",         path : "/prendas",      id : "prendas"},
        {name : "Iniciar sesión",  path : "/sign-in",      id : "sign-in"},
        {name : "Registrarse",     path : "/log-in",       id : "log-in"}
    ]

    return (
        <nav>
            <ul className="flex flex-row justify-center items-center">
                {
                    !isAdmin ?
                        !isUser ?
                        defRoutes.map(route => (
                            <li key={route.id}>
                                <NavLink
                                    to={route.path}
                                    className="flex justify-center items-center py-10 px-5 h-12 bg-transparent text-white font-medium transition-colors hover:bg-white hover:text-[#E2211C]"
                                >
                                    { route.name }
                                </NavLink>
                            </li>
                        ))
                        :
                        userRoutes.map(route => (
                            <li key={route.id}>
                                <NavLink
                                    to={route.path}
                                    className="flex justify-center items-center py-10 px-5 h-12 bg-transparent text-white font-medium transition-colors hover:bg-white hover:text-[#E2211C]"
                                >
                                    { route.name }
                                </NavLink>
                            </li>
                        ))
                    :
                    adminRoutes.map(route => (
                        <li key={route.id}>
                            <NavLink
                                to={route.path}
                                className="flex justify-center items-center py-10 px-5 h-12 bg-transparent text-white font-medium transition-colors hover:bg-white hover:text-[#E2211C]"
                            >
                                { route.name }
                            </NavLink>
                        </li>
                    ))
                }

                {
                    !isAdmin ?
                        !isUser ?
                        ""
                        :
                        <button
                            type="button"
                            onClick={signOut}
                            className="flex justify-center items-center py-10 px-5 h-12 bg-transparent text-white font-medium transition-colors hover:bg-white hover:text-[#E2211C]"
                        >
                            Cerrar sesión
                        </button>
                    :
                    <button
                    type="button"
                    onClick={signOutForAdmin}
                    className="flex justify-center items-center py-10 px-5 h-12 bg-transparent text-white font-medium transition-colors hover:bg-white hover:text-[#E2211C]"
                    >
                        Cerrar sesión
                    </button>
                }
            </ul>
        </nav>
    );
}

export default Menu;