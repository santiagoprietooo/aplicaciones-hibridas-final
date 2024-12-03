import { NavLink } from "react-router-dom";
import { ShoppingCart, BadgeDollarSign, X } from 'lucide-react';
import { useState } from "react";
import MainTitle from "../components/MainTitle";

const popularProducts = [
    {
        id : "river-plate-camiseta-titular-2024",
        title : "Camiseta titular 24/25",
        image : "Images/Products/Camiseta-Actual/river-plate-camiseta-titular-2024.png",
        price : 119999
    },
    {
        id : "river-plate-camiseta-alternativa-2024",
        title : "Camiseta alternativa 24/25",
        image : "Images/Products/Camiseta-Actual/river-plate-camiseta-suplente-2024.png",
        price : 119999
    },
    {
        id : "river-plate-campera-rompeviento-2024",
        title : "Campera Rompeviento 24/25",    
        image : "Images/Products/river-plate-campera-rompeviento-2024.png",
        price : 169999
    }
]

function HomeView() {
    let [ loginModal, setModal ] = useState(false);

    const activateModal = () => {
        setModal(true);
    }

    const hiddenModal = () => {
        setModal(false);
    }

    return (
        <>
            <section>
                <div className="h-screen w-full bg-cover bg-center home-background">
                    <div className="flex flex-col items-start justify-end gap-2 p-10 h-full w-1/2 text-white">
                        <MainTitle title={
                            <span>La tienda del mil<span className="text-[#E2211C]">lona</span>rio</span>
                        }/>

                        <p className="text-xl">Bienvenido a nuestra tienda, acá vas a encontrar todos los artículos relacionados al Club Atlético River Plate. Desde camisetas actuales hasta ropa retro, y todo esto con la posibilidad de pagar en la cantidad de cuotas que usted guste. Podés empezar a mirar nuestra página de <NavLink to="/products" className="text-red-400 underline">productos</NavLink> donde vas a encontrar eso que buscas.</p>
                    </div>
                </div>

                <main>
                    <div className="flex flex-col justify-center items-center p-4 w-full bg-white">
                        <h2 className="mb-4 text-black text-2xl font-semibold text-center uppercase">
                            Productos destacados
                        </h2>

                        <div className="flex flex-row items-center justify-evenly gap-4 pb-4">
                            {
                                popularProducts.map(product => {
                                    return <div key={product.id} className="flex flex-col items-center gap-3 p-2 bg-white border-2 border-black rounded-md">
                                        <h2 className="text-lg text-center font-bold">
                                            River Plate <br/> {product.title}                                    
                                        </h2>

                                        <div className="flex flex-col items-center overflow-hidden">
                                            <img
                                                src={product.image} alt={product.title}
                                                className="w-2/3 transform transition-transform duration-300 ease-in-out hover:scale-125"
                                            />
                                        </div>

                                        <p className="text-lg">
                                            <span className="font-semibold">Precio: </span> ${product.price},00
                                        </p>

                                        <div className="flex flex-col items-center gap-1 w-full">
                                            <NavLink
                                                to={`/product/${product.id}`}
                                                className="p-2 w-full bg-red-600 text-white text-center font-semibold rounded-sm transition-colors hover:bg-red-700"
                                            >
                                                <span
                                                    className="flex flex-row items-center justify-center gap-4"
                                                >
                                                    <BadgeDollarSign className="size-5" /> Ver este artículo
                                                </span>
                                            </NavLink>

                                            <button
                                                type="button"
                                                onClick={activateModal}
                                                className="p-2 w-full text-center font-semibold rounded-sm transition-colors hover:bg-gray-200"
                                            >
                                                <span
                                                    className="flex flex-row items-center justify-center gap-4"
                                                >
                                                    <ShoppingCart className="size-5" /> Agregar al carrito
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </main>

                <div
                    className={loginModal ? "fixed top-0 right-0 bottom-0 left-0 z-20 bg-black bg-opacity-40" : "hidden"}
                >
                    <div className="flex flex-col items-center justify-center p-5 bg-white rounded-es-xl rounded-ee-xl">
                        <div className="flex justify-end w-full">
                            <button
                                type="button"
                                onClick={hiddenModal}
                                className="flex items-center justify-center p-2 rounded-full transition-colors hover:bg-black hover:bg-opacity-15"
                            >
                                <X className="size-6 text-black" />
                            </button>
                        </div>

                        <div className="text-center mb-8">
                            <p className="text-2xl font-semibold uppercase">¡No estás registrado!</p>
                            <p>Para comprar productos tenés que crearte una cuenta o inicar sesión en caso de que ya tengas una.</p>
                        </div>

                        <div className="flex flex-col items-center gap-2 w-1/2">
                            <NavLink
                                to="/log-in"
                                className="w-full p-2 bg-red-600 text-white text-center font-semibold rounded-md transition-colors hover:bg-red-800"
                            >
                                Crear una cuenta
                            </NavLink>

                            <NavLink
                                to="/sign-in"
                                className="w-full p-2 text-center font-semibold rounded-md transition-colors hover:bg-gray-200"
                            >
                                Iniciar sesión
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeView;