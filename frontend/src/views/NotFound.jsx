import { Link } from "react-router-dom";

function NotFound() {
    return(
        <>
            <section className="min-h-screen mt-20">
                <div className="flex flex-col gap-5 p-5">
                    <h2 className="text-2xl font-semibold uppercase">404 - Hubo un error</h2>

                    <Link
                        to="/"
                        className="w-max p-2 bg-[#E2211C] text-white text-xl font-normal rounded-lg"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </section>
        </>
    );
}

export default NotFound;