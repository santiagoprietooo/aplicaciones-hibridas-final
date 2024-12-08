import { Search, SearchXIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import MainTitle from "../components/MainTitle";
import ProductCard from "../components/ProductCard";

function ProductsView() {
    let [ recargar ] = useState(false);
    let [ productos, setProductos ] = useState([]);
    let [ productosFiltrados, setProductosFiltrados ] = useState([]);
    let [ terminoBuscado, setTerminoBuscado ] = useState("");
    let [ terminoMostrado, setTerminoMostrado ] = useState("");

    const getProducts = async () => {
        const resp = await fetch('https://aplicaciones-hibridas-final.vercel.app/api/ropa');
        const data = await resp.json();
        setProductos(data.data);
        setProductosFiltrados(data.data);
    }

    useEffect(() => {
        getProducts();
    }, [recargar]);

    const handleInputChange = (e) => {
        setTerminoBuscado(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const transformTerm = terminoBuscado.trim().toLocaleLowerCase();
        const splitTerm = transformTerm.split(" ");
    
        if (transformTerm) {
            const results = productos.filter((producto) => {
                const productWords = producto.categoria.toLocaleLowerCase().split(" ");
                return splitTerm.every((word) => productWords.includes(word));
            });
    
            setProductosFiltrados(results);
            setTerminoMostrado(terminoBuscado);
        } else {
            setProductosFiltrados(productos);
            setTerminoMostrado("");
        }
    };

    const reestablishProducts = () => {
        setProductosFiltrados(productos);
        setTerminoBuscado("");
        setTerminoMostrado("");
    };

    return (
        <>
            <section className={productosFiltrados.length > 0 ? "mt-20" : "min-h-screen mt-20"}>
                <div className="p-5">
                    <MainTitle title="Prendas"/>
                </div>

                <div className="flex flex-col justify-between">
                    <header
                        className="flex flex-row items-center justify-between w-full p-5 bg-white text-black border-b border-black"
                    >
                        <form action="" onSubmit={handleSubmit} className="relative flex flex-col items-start gap-1">
                            <label htmlFor="search-product" className="w-max font-semibold">
                                Buscar prendas
                            </label>

                            <div className="w-max">
                                <input
                                    type="search"
                                    name="search-product"
                                    id="search-product"
                                    placeholder="Piluso"
                                    autoComplete="off"
                                    value={terminoBuscado}
                                    onChange={handleInputChange}
                                    className="p-3 pr-10 bg-neutral-200 text-black rounded-lg outline-none transition-colors
                                    focus:bg-neutral-300
                                    placeholder:text-black placeholder:text-opacity-50"
                                />

                                <button
                                    type="submit"
                                    className="absolute bottom-0 right-0 p-3 w-max bg-transparent font-semibold"
                                >
                                    <Search />
                                </button>
                            </div>
                        </form>

                        <div className="flex flex-col items-start gap-1">
                            <label htmlFor="sort-by" className="w-max font-semibold">
                                Ordenar por:
                            </label>

                            <select name="sort-by" id="sort-by" className="p-2 text-black bg-neutral-100 rounded-lg outline-none">
                                <option value="popular">Destacados</option>
                                <option value="a-z">Alfabéticamente: De la A - Z</option>
                                <option value="z-a">Alfabéticamente: De la Z - A</option>
                                <option value="higher-price">Precio: Más alto a más bajo</option>
                                <option value="lower-price">Precio: Más bajo a más alto</option>
                            </select>
                        </div>
                    </header>

                    <div className="flex flex-row items-start">
                        {
                            productos.length > 0 ?
                                productosFiltrados.length > 0 ?
                                <div className="grid grid-cols-3 gap-5 w-4/5 p-5">
                                    {productosFiltrados.map((product) => (
                                        <ProductCard
                                            key={product._id}
                                            myId={product._id}
                                            route={`/prenda/${product._id}`}
                                            title={product.prenda}
                                            imgSrc={product.imagen_principal}
                                            temporada={product.temporada}
                                            color={product.color}
                                            precio={product.precio}
                                        />
                                    ))}
                                </div>
                                :
                                <div className="flex flex-col items-center gap-8 min-h-screen w-4/5 p-5">
                                    <p className="text-xl text-center">
                                        No se encontró un resultado para <span className="font-bold">"{terminoMostrado}"</span>.
                                    </p>

                                    <div className="flex flex-row items-center gap-4">
                                        <button
                                            type="button"
                                            onClick={reestablishProducts}
                                            className="flex flex-row items-center gap-2 p-2 bg-red-500 text-white font-semibold rounded-lg transition-colors hover:bg-red-600"
                                        >
                                            <SearchXIcon className="size-5"/> Reestablecer busqueda
                                        </button>
                                    </div>
                                </div>
                            :
                            <Loader />
                        }

                        <aside className="flex flex-col items-start gap-5 min-h-screen w-1/5 p-5">
                            <h3 className="text-2xl font-semibold">Filtros</h3>

                            <div className="flex flex-col items-start gap-4 w-full">
                                <h4 className="text-lg w-full">Género</h4>
                                
                                <ul className="flex flex-col items-start gap-2">
                                    <li>
                                        <label className="flex items-center gap-2 checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="Género"
                                                value="Masculino"
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox"></div>
                                            <span>Masculino</span>
                                        </label>
                                    </li>

                                    <li>
                                        <label className="flex items-center gap-2 checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="Género"
                                                value="Masculino"
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox"></div>
                                            <span>Femenino</span>
                                        </label>
                                    </li>

                                    <li>
                                        <label className="flex items-center gap-2 checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="Género"
                                                value="Masculino"
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox"></div>
                                            <span>Unisex</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col items-start gap-4 w-full">
                                <h4 className="text-lg w-full">Talle</h4>
                                
                                <ul className="flex flex-col items-start gap-2">
                                    <li>
                                        <label className="flex items-center gap-2 checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="Talle"
                                                value="XS"
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox"></div>
                                            <span>XS</span>
                                        </label>
                                    </li>

                                    <li>
                                        <label className="flex items-center gap-2 checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="Talle"
                                                value="S"
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox"></div>
                                            <span>S</span>
                                        </label>
                                    </li>

                                    <li>
                                        <label className="flex items-center gap-2 checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="Talle"
                                                value="M"
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox"></div>
                                            <span>M</span>
                                        </label>
                                    </li>

                                    <li>
                                        <label className="flex items-center gap-2 checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="Talle"
                                                value="L"
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox"></div>
                                            <span>L</span>
                                        </label>
                                    </li>

                                    <li>
                                        <label className="flex items-center gap-2 checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="Talle"
                                                value="XL"
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox"></div>
                                            <span>XL</span>
                                        </label>
                                    </li>

                                    <li>
                                        <label className="flex items-center gap-2 checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="Talle"
                                                value="XXL"
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox"></div>
                                            <span>XXL</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col items-start gap-4 w-full">
                                <h4 className="text-lg w-full">Categoría</h4>
                                
                                <ul className="flex flex-col items-start gap-2">
                                    <li>
                                        <label className="flex items-center gap-2 checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="Talle"
                                                value="Gorros"
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox"></div>
                                            <span>Gorros</span>
                                        </label>
                                    </li>

                                    <li>
                                        <label className="flex items-center gap-2 checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="Talle"
                                                value="Camperas"
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox"></div>
                                            <span>Camperas</span>
                                        </label>
                                    </li>

                                    <li>
                                        <label className="flex items-center gap-2 checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="Talle"
                                                value="Buzos"
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox"></div>
                                            <span>Buzos</span>
                                        </label>
                                    </li>

                                    <li>
                                        <label className="flex items-center gap-2 checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="Talle"
                                                value="Camisetas"
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox"></div>
                                            <span>Camisetas</span>
                                        </label>
                                    </li>

                                    <li>
                                        <label className="flex items-center gap-2 checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="Talle"
                                                value="Remeras"
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox"></div>
                                            <span>Remeras</span>
                                        </label>
                                    </li>

                                    <li>
                                        <label className="flex items-center gap-2 checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="Talle"
                                                value="Pantalones"
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox"></div>
                                            <span>Pantalones</span>
                                        </label>
                                    </li>

                                    <li>
                                        <label className="flex items-center gap-2 checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="Talle"
                                                value="Shorts"
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox"></div>
                                            <span>Shorts</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col items-start gap-4 w-full">
                                <h4 className="text-lg w-full">Color</h4>
                                
                                <ul className="flex flex-col items-start gap-2">
                                    <li>
                                        <label className="flex items-center gap-2 checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="Color"
                                                value="Blanco"
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox"></div>
                                            <span>Blanco</span>
                                        </label>
                                    </li>

                                    <li>
                                        <label className="flex items-center gap-2 checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="Color"
                                                value="Bordó"
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox"></div>
                                            <span>Bordó</span>
                                        </label>
                                    </li>

                                    <li>
                                        <label className="flex items-center gap-2 checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="Color"
                                                value="Negro"
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox"></div>
                                            <span>Negro</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ProductsView;