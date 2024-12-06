import MainTitle from "../components/MainTitle";
import { NavLink } from "react-router-dom";

function NotFound() {
    return(
        <>
            <section className="min-h-screen mt-20">
                <div className="flex flex-col items-center gap-5 p-5">
                    <MainTitle title="404 - Hubo un error"/>

                    <NavLink
                        to="/"
                        className="w-max p-2 bg-red-600 text-white text-xl font-semibold rounded-lg transition-colors hover:bg-red-800"
                    >
                        Volver al inicio
                    </NavLink>
                </div>
            </section>
        </>
    );
}

export default NotFound;