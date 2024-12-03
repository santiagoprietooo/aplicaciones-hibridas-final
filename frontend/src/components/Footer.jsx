import { NavLink } from "react-router-dom";
import { SendHorizontal } from 'lucide-react';

function Footer() {
    return (
        <footer className="flex flex-row items-start justify-between p-5 w-full bg-red-800 text-white">
            <div>
                <p className="text-xl font-bold mb-2">Políticas de sitio web</p>

                <ul>
                    <li>
                        <NavLink
                            to="/latiendadelmillonario-policy/terms-and-conditions"
                            className="font-normal underline"
                        >
                            Términos y condiciones
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/latiendadelmillonario-policy/refund-policy"
                            className="font-normal underline"
                        >
                            Política de reembolso
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/latiendadelmillonario-policy/cookies"
                            className="font-normal underline"
                        >
                            Cookies
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div>
                <p className="text-xl font-bold mb-2">Contacto</p>
                
                <ul className="flex flex-row items-center gap-3">
                    <li>
                        <NavLink
                            to="https://www.instagram.com/?hl=es"
                            target="_blank"
                            className="size-12 flex items-center justify-center bg-white text-red-800 border-2 border-white rounded-full transition-colors hover:bg-red-800 hover:text-white"
                        >
                            <i className="text-3xl fa-brands fa-instagram"></i>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="https://www.tiktok.com/es/"
                            target="_blank"
                            className="size-12 flex items-center justify-center bg-white text-red-800 border-2 border-white rounded-full transition-colors hover:bg-red-800 hover:text-white"
                        >
                            <i className="text-3xl fa-brands fa-tiktok"></i>
                        </NavLink>
                    </li>
                        

                    <li>
                        <NavLink
                            to="https://www.facebook.com/?locale=es_LA"
                            target="_blank"
                            className="size-12 flex items-center justify-center bg-white text-red-800 border-2 border-white rounded-full transition-colors hover:bg-red-800 hover:text-white"
                        >
                            <i className="text-3xl fa-brands fa-facebook-f"></i>
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div>
                <form action="" className="flex flex-row gap-2 items-end">
                    <div className="flex flex-col items-start">
                        <label htmlFor="subscribe-to-form" className="font-bold mb-2">
                            Suscribite y recibí novedades de ofertas
                        </label>

                        <input
                            type="email"
                            id="subscribe-to-form"
                            placeholder="Correo electrónico"
                            className="h-10 p-2 w-full text-black border-2 border-black rounded-lg outline-none"
                        />
                    </div>
                    
                    <div>
                        <button type="submit" className="flex items-center justify-center h-10 p-2 bg-black text-white rounded-lg transition-colors hover:bg-neutral-800">
                            <SendHorizontal className="size-6" />
                        </button>
                    </div>
                </form>
            </div>
        </footer>
    )
}

export default Footer;