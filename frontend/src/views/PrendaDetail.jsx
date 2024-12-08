import MainTitle from "../components/MainTitle";
import PriceFormatter from "../components/PriceFormater";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

function PrendaDetailView() {
    let   [ productoBuscado, setProductoBuscado ] = useState(null);
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const { id } = useParams();

    const getProducts = async (id) => {
        const endPoint = `https://aplicaciones-hibridas-final.vercel.app/api/ropa/${id}`;
        const config = {
            method: "GET",
            headers: {'Content-Type' : 'application/json'}
        }
        const response = await fetch(endPoint, config);

        if(!response.ok) {
            console.error("No se encontró la prenda con ID.");
        }

        const data = await response.json();
        console.log(data.data);

        setProductoBuscado(data.data);
    }

    useEffect(() => {
        getProducts(id);
    }, [id]);

    if(!productoBuscado) {
        return <p>ERROR - No se encontró este producto.</p>;
    }

    const productImages = [
        {
            currentIndex: 0,
            image: productoBuscado.imagen_principal
        },
        {
            currentIndex: 1,
            image: productoBuscado.imagen_secundaria
        },
        {
            currentIndex: 2,
            image: productoBuscado.imagen_terciaria
        },
        {
            currentIndex: 3,
            image: productoBuscado.imagen_cuaternaria
        }
    ]

    const validImages = productImages.filter(image => image.image);
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex - 1 + validImages.length) % validImages.length
        );
    };
    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex + 1) % validImages.length
        );
    };

    return (
        <>
            <section className="min-h-screen mt-20">
                <div className="flex flex-row gap-5 p-5">
                    <div className="relative flex justify-center items-center h-[70vh] w-7/12 rounded-lg overflow-hidden">
                        <button
                            type="button"
                            className="flex items-center justify-center h-full p-1 bg-neutral-400 transition-colors ease-in hover:bg-neutral-500 disabled:bg-opacity-30 disabled:hover:bg-neutral-400 disabled:hover:bg-opacity-30 disabled:cursor-not-allowed"
                            onClick={handlePrev}
                            disabled={validImages.length === 1}
                        >
                            <ChevronLeft className="size-8 text-white" />
                        </button>

                        {validImages.length > 0 && (
                            <div
                                className={validImages.length > 1 ? "h-full w-full bg-cover bg-no-repeat bg-center" : "h-full w-full bg-no-repeat bg-contain" }
                                style={{ backgroundImage : `url(${validImages[currentIndex].image})` }}
                            ></div>
                        )}

                        <button
                            type="button"
                            className="flex items-center justify-center h-full p-1 bg-neutral-400 transition-colors ease-in hover:bg-neutral-500 disabled:bg-opacity-30 disabled:hover:bg-neutral-400 disabled:hover:bg-opacity-30 disabled:cursor-not-allowed"
                            onClick={handleNext}
                            disabled={validImages.length === 1}
                        >
                            <ChevronRight className="size-8 text-white" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-5 w-full p-5">
                        <MainTitle title={`${productoBuscado.prenda} - ${productoBuscado.temporada} - ${productoBuscado.color}`}/>

                        <div>
                            <p><span className="text-[#E2211C] font-semibold">Temporada: </span>{productoBuscado.temporada}</p>
                            <p>
                                <span className="text-[#E2211C] font-semibold">
                                    Precio:
                                </span> {PriceFormatter.format(productoBuscado.precio)}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PrendaDetailView;