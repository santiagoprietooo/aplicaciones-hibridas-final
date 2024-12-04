import MainTitle from "../../components/MainTitle";
import Loader from "../../components/Loader";
import PriceFormatter from "../../components/priceFormater";
import { useState, useEffect } from "react";
import { PenBox, Trash, X } from "lucide-react";
import { NavLink } from "react-router-dom";

function ListOfProductsView() {
    const [ productos, setProductos ] = useState([]);
    const [ productToDelete, setProductToDelete ] = useState(null);
    let [ modal, setModal ] = useState(false);

    const getProducts = async () => {
        const endPoint = "http://127.0.0.1:3000/api/camisetas";
        const config = {
            headers: {'Content-Type' : 'application/json'},
            method: 'GET'
        }
        const response = await fetch(endPoint, config);
        const data = await response.json();
        setProductos(data.data);
    }

    useEffect(() => {
        getProducts();
    }, []);

    async function deleteProducts(id) {
        try {
            const endPoint = `http://127.0.0.1:3000/api/camisetas/${id}`;
            const config = {
                method: 'DELETE',
                headers: {'Content-Type' : 'application/json'}
            }
            const response = await fetch(endPoint, config);

            if(!response.ok) {
                console.error("ERROR AL BORRAR");
            }

            getProducts();
        } catch (error) {
            console.error("Error en la solicitud.");
            throw error;
        }
    }

    const [ prendas, setPrendas ] = useState([]);

    const getPrendas = async () => {
        const endPoint = "http://127.0.0.1:3000/api/ropa";
        const config = {
            headers: {'Content-Type' : 'application/json'},
            method: 'GET'
        }
        const response = await fetch(endPoint, config);
        const data = await response.json();
        setPrendas(data.data);
    }

    useEffect(() => {
        getPrendas();
    }, []);

    async function deletePrendas(id) {
        try {
            const endPoint = `http://127.0.0.1:3000/api/ropa/${id}`;
            const config = {
                method: 'DELETE',
                headers: {'Content-Type' : 'application/json'}
            }
            const response = await fetch(endPoint, config);

            if(!response.ok) {
                console.error("ERROR AL BORRAR LA PRENDA");
            }

            getPrendas();
        } catch (error) {
            console.error("Error en la solicitud.");
            throw error;
        }
    }

    const showModal = (id) => {
        setModal(modal = !modal);
        setProductToDelete(id);
    }

    return(<>
        <section className="mt-20 min-h-screen">
            <div className="p-5">
                <MainTitle title="Lista de productos"/>
            </div>

            <div className="flex flex-col items-start gap-5 w-full p-5 bg-neutral-200">
                {   productos.length > 0 ?
                    productos.map((product) => (
                        <div
                            className="flex flex-row items-center justify-between gap-5 w-full p-5 bg-white rounded-lg transition-colors"
                            key={product._id}
                        >
                            <div className="size-36 rounded-md bg-contain bg-center bg-no-repeat" style={{ backgroundImage : `url(${product.imagen_principal})` }}></div>

                            <div className="flex flex-col items-start gap-2 w-full border-x border-black pl-5">
                                <h2 className="text-lg font-bold">
                                    { product.camiseta } { product.categoria } - { product.temporada } { !product.color ? `` : `- ${product.color}` }
                                </h2>

                                <p className="font-semibold">
                                    Género: <span className="font-normal">{ !product.genero ? <span className="font-semibold text-red-700">No definido</span> : product.genero }</span>
                                </p>

                                <p className="font-semibold">
                                    Precio: <span className="font-normal">{ PriceFormatter.format(product.precio) }</span>
                                </p>

                                <p className="font-semibold">
                                    Talles disponibles: <span className="font-normal">{!product.talle.length > 0 ? <span className="font-semibold text-red-700">No hay talles disponibles</span> : product.talle.join(" - ")}</span>
                                </p>

                                <p className="font-semibold">
                                    Unidades disponibles: <span className="font-normal">{!product.unidades > 0 ? <span className="font-semibold text-red-700">Stock agotado</span> : product.unidades }</span>
                                </p>
                            </div>

                            <div className="flex flex-col items-start gap-2 w-1/6">
                                <NavLink
                                    to={`/admin/camiseta_edit/${product._id}`}
                                    className="flex flex-row items-center justify-center gap-3 w-full p-3 bg-slate-300 text-black rounded-lg transition-colors hover:bg-slate-200"
                                >
                                    <span className="font-semibold">Editar</span>
                                    <PenBox className="size-5"/>
                                </NavLink>
                                
                                <button
                                    type="button"
                                    className="flex flex-row items-center justify-center gap-3 w-full p-3 bg-red-600 text-white rounded-lg transition-colors hover:bg-red-500"
                                    onClick={() => showModal(product._id)}
                                >
                                    <span className="font-semibold">Borrar</span>
                                    <Trash className="size-5"/>
                                </button>
                            </div>

                            <div className={ modal ? "fixed top-0 right-0 bottom-0 left-0 z-20 bg-black bg-opacity-40" : "hidden" }>
                                <div className="absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2 flex flex-col items-center gap-10 w-max p-5 bg-white rounded-lg">
                                    <div className="flex flex-row items-start gap-10">
                                        <span className="text-lg font-semibold">¿Estás seguro de que querés borrar este producto?</span>

                                        <button
                                            type="button"
                                            className="flex items-center justify-center rounded-lg transition-colors hover:bg-black hover:bg-opacity-10"
                                            onClick={showModal}
                                        >
                                            <X className="size-8"/>
                                        </button>
                                    </div>

                                    <div className="flex flex-row items-center gap-4">
                                        <button
                                            type="button"
                                            onClick={showModal}
                                            className="flex items-center justify-center p-3 bg-neutral-300 font-semibold rounded-lg transition-colors hover:bg-neutral-200"
                                        >
                                            No, volver.
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {deleteProducts(productToDelete); showModal()}}
                                            className="flex items-center justify-center p-3 bg-red-700 text-white font-semibold rounded-lg transition-colors hover:bg-red-600"
                                        >
                                            Sí, borrar.
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <Loader />
                }

                {   prendas.length > 0 ?
                    prendas.map((prenda) => (
                        <div
                            className="flex flex-row items-center justify-between gap-5 w-full p-5 bg-white rounded-lg transition-colors"
                            key={prenda._id}
                        >
                            <div className="size-36 rounded-md bg-contain bg-center bg-no-repeat" style={{ backgroundImage : `url(${prenda.imagen_principal})` }}></div>

                            <div className="flex flex-col items-start gap-2 w-full border-x border-black pl-5">
                                <h2 className="text-lg font-bold">
                                    { prenda.prenda } - { prenda.temporada } { !prenda.color ? `` : `- ${prenda.color}` }
                                </h2>

                                <p className="font-semibold">
                                    Género: <span className="font-normal">{ !prenda.genero ? <span className="font-semibold text-red-700">No definido</span> : prenda.genero }</span>
                                </p>

                                <p className="font-semibold">
                                    Precio: <span className="font-normal">{ PriceFormatter.format(prenda.precio) }</span>
                                </p>

                                <p className="font-semibold">
                                    Talles disponibles: <span className="font-normal">{!prenda.talle.length > 0 ? <span className="font-semibold text-red-700">No hay talles disponibles</span> : prenda.talle.join(" - ")}</span>
                                </p>

                                <p className="font-semibold">
                                    Unidades disponibles: <span className="font-normal">{!prenda.unidades > 0 ? <span className="font-semibold text-red-700">Stock agotado</span> : prenda.unidades }</span>
                                </p>
                            </div>

                            <div className="flex flex-col items-start gap-2 w-1/6">
                                <NavLink
                                    to={`/admin/prenda_edit/${prenda._id}`}
                                    className="flex flex-row items-center justify-center gap-3 w-full p-3 bg-slate-300 text-black rounded-lg transition-colors hover:bg-slate-200"
                                >
                                    <span className="font-semibold">Editar</span>
                                    <PenBox className="size-5"/>
                                </NavLink>
                                
                                <button
                                    type="button"
                                    className="flex flex-row items-center justify-center gap-3 w-full p-3 bg-red-600 text-white rounded-lg transition-colors hover:bg-red-500"
                                    onClick={() => showModal(prenda._id)}
                                >
                                    <span className="font-semibold">Borrar</span>
                                    <Trash className="size-5"/>
                                </button>
                            </div>

                            <div className={ modal ? "fixed top-0 right-0 bottom-0 left-0 z-20 bg-black bg-opacity-40" : "hidden" }>
                                <div className="absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2 flex flex-col items-center gap-10 w-max p-5 bg-white rounded-lg">
                                    <div className="flex flex-row items-start gap-10">
                                        <span className="text-lg font-semibold">¿Estás seguro de que querés borrar este producto?</span>

                                        <button
                                            type="button"
                                            className="flex items-center justify-center rounded-lg transition-colors hover:bg-black hover:bg-opacity-10"
                                            onClick={showModal}
                                        >
                                            <X className="size-8"/>
                                        </button>
                                    </div>

                                    <div className="flex flex-row items-center gap-4">
                                        <button
                                            type="button"
                                            onClick={showModal}
                                            className="flex items-center justify-center p-3 bg-neutral-300 font-semibold rounded-lg transition-colors hover:bg-neutral-200"
                                        >
                                            No, volver.
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {deletePrendas(productToDelete); showModal()}}
                                            className="flex items-center justify-center p-3 bg-red-700 text-white font-semibold rounded-lg transition-colors hover:bg-red-600"
                                        >
                                            Sí, borrar.
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <p className="font-bold text-lg">NO HAY PRENDAS DISPONIBLES</p>
                }
            </div>
        </section>
    </>);
}

export default ListOfProductsView;