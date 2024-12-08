import MainTitle from "../components/MainTitle";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function HomeView() {
    const [ productos, setProductos ] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            const endPoint = "http://127.0.0.1:3000/api/camisetas";
            const config = {
                method: 'GET',
                headers: {'Content-Type' : 'application/json'}
            }
            const response = await fetch(endPoint, config);
    
            if(!response.ok) {
                console.error("No se cargaron los productos.");
            } else {
                console.log("Acá están los productos.");
            }
    
            const data = await response.json();
            setProductos(data.data);
        }

        getProducts();
    }, []);

    return (
        <>
            <section>
                <div className="h-screen w-full bg-cover bg-center home-background">
                    <div className="flex flex-col items-start justify-end gap-2 p-10 h-full w-1/2 text-white">
                        <MainTitle title={
                            <span>La tienda del mil<span className="text-[#E2211C]">lona</span>rio</span>
                        }/>

                        <p className="text-xl">Bienvenido a nuestra tienda, acá vas a encontrar todos los artículos relacionados al Club Atlético River Plate. Desde camisetas actuales hasta ropa retro, y todo esto con la posibilidad de pagar en la cantidad de cuotas que usted guste. Podés empezar a mirar nuestra página de <NavLink to="/camisetas" className="text-red-400 underline">productos</NavLink> donde vas a encontrar eso que buscas.</p>
                    </div>
                </div>

                <main>
                    <div className="flex flex-col justify-center items-center p-4 w-full bg-white">
                        <h2 className="text-3xl font-bold text-center uppercase">
                            Productos destacados
                        </h2>

                        {productos == null ?
                            <div className="flex justify-center p-5">
                                <Loader />
                            </div>
                            :
                            <div className="grid grid-cols-3 gap-5 w-11/12 p-5">
                                {productos.slice(0,3).map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        myId={product._id}
                                        route={`/camiseta/${product._id}`}
                                        title={product.camiseta}
                                        imgSrc={product.imagen_principal}
                                        categoria={product.categoria}
                                        temporada={product.temporada}
                                        color={product.color}
                                        precio={product.precio}
                                    />
                                ))}
                            </div>
                        }
                    </div>
                </main>
            </section>
        </>
    )
}

export default HomeView;