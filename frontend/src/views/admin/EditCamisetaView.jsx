import MainTitle from "../../components/MainTitle";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProductsView() {
    const navigate = useNavigate();
    const [ productoBuscado, setProductoBuscado ] = useState(null);
    const [ formNewData, setFormNewData ] = useState({
        camiseta: "",
        categoria: "",
        temporada: "",
        color: "",
        imagen_principal: "",
        imagen_secundaria: "",
        imagen_terciaria: "",
        imagen_cuaternaria: "",
        genero: "",
        talle: [],
        unidades: "",
        precio: ""
    });
    const { id } = useParams();
    
    useEffect(() => {
        async function getProduct(id) {
            try {
                const endPoint = `https://aplicaciones-hibridas-final.vercel.app/api/camisetas/${id}`;
                const config = {
                    method : 'GET',
                    headers: {'Content-Type' : 'application/json'}
                }
                const response = await fetch(endPoint, config);

                if(!response.ok) {
                    console.error("No se encontró este producto.");
                }

                const data = await response.json();
                console.log(data.data);

                setFormNewData({
                    camiseta: data.data.camiseta,
                    categoria: data.data.categoria,
                    temporada: data.data.temporada,
                    color: data.data.color || "",
                    imagen_principal: data.data.imagen_principal,
                    imagen_secundaria: data.data.imagen_secundaria || "",
                    imagen_terciaria: data.data.imagen_terciaria || "",
                    imagen_cuaternaria: data.data.imagen_cuaternaria || "",
                    genero: data.data.genero || "",
                    talle: data.data.talle || [],
                    unidades: data.data.unidades || "",
                    precio: data.data.precio
                });

                setProductoBuscado(data.data);
            } catch (error) {
                console.error("Error en la solicitud.", error);
                throw error;
            }
        }

        if(!id) {
            return <p>ERROR</p>
        } else {
            getProduct(id);
        }
    }, [id]);

    const handleData = (e) => {
        const { name, value } = e.target;
        setFormNewData({ ...formNewData, [name]: value });
    }

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;

        setFormNewData((prevState) => {
            const updatedTalle = checked
                ? [...prevState.talle, id]
                : prevState.talle.filter((talle) => talle !== id);
            return { ...prevState, talle: updatedTalle };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const endPoint = `https://aplicaciones-hibridas-final.vercel.app/api/camisetas/${id}`;
            const config = {
                headers: {
                    'Content-Type' : 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(formNewData)
            }
            const response = await fetch(endPoint, config);
            
            if(!response.ok) {
                console.error("No se pudo actualizar.");
            }

            const data = await response.json();
            console.log(data);

            navigate("/admin/products_list");
        } catch (error) {
            console.error("Error en la solicitud de tipo PUT.");
            throw error;
        }
    }

    return(<>
        {!productoBuscado ?
        <div className="mt-20 min-h-screen p-5"><Loader/></div>
        :
        <section className="mt-20 min-h-screen">
            <div className="p-5">
                <MainTitle title={<span><span className="text-red-600">Editar:</span> {productoBuscado.camiseta} {productoBuscado.categoria} - {productoBuscado.temporada} - {productoBuscado.color}</span>}/>
            </div>

            <div className="p-5">
                <form
                    action=""
                    className="flex flex-row gap-6 w-full p-5 border border-neutral-300 rounded-lg"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col items-start gap-4 w-1/3">
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="camiseta" className="w-max font-semibold">
                                Tipo de camiseta:
                            </label>
                            <select
                                name="camiseta"
                                id="camiseta"
                                value={formNewData.camiseta}
                                onChange={handleData}
                                className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                            >
                                <option value="Camiseta Actual">Camiseta Actual</option>
                                <option value="Camiseta Moderna">Camiseta Moderna</option>
                                <option value="Camiseta Retro">Camiseta Retro</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="categoria" className="w-max font-semibold">
                                Categoría de la camiseta:
                            </label>
                            <select
                                name="categoria"
                                id="categoria"
                                value={formNewData.categoria}
                                onChange={handleData}
                                className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                            >
                                <option value="Titular">Titular</option>
                                <option value="Suplente">Suplente</option>
                                <option value="Alternativa">Alternativa</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="temporada" className="w-max font-semibold">
                                Temporada o Año:
                            </label>
                            <input
                                type="text"
                                name="temporada"
                                id="temporada"
                                autoComplete="on"
                                placeholder="ej: 2024/25"
                                value={formNewData.temporada}
                                onChange={handleData}
                                className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="color" className="w-max font-semibold">
                                Color:
                            </label>
                            <input
                                type="text"
                                name="color"
                                id="color"
                                autoComplete="on"
                                placeholder="ej: Bordó"
                                value={formNewData.color}
                                onChange={handleData}
                                className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-4 w-1/3">
                        <div className="flex flex-col gap-2 w-full">
                                <label
                                    htmlFor="imagen_principal"
                                    className="w-max font-semibold"
                                >
                                    Imagen de portada:
                                </label>
                                <input
                                    type="text"
                                    name="imagen_principal"
                                    id="imagen_principal"
                                    autoComplete="off"

                                    value={formNewData.imagen_principal}
                                    onChange={handleData}
                                    className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                                />
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <label
                                    htmlFor="imagen_secundaria"
                                    className="w-max font-semibold"
                                >
                                    Imagen de muestra:
                                </label>
                                <input
                                    type="text"
                                    name="imagen_secundaria"
                                    id="imagen_secundaria"
                                    autoComplete="off"

                                    value={formNewData.imagen_secundaria}
                                    onChange={handleData}
                                    className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                                />
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <label
                                    htmlFor="imagen_terciaria"
                                    className="w-max font-semibold"
                                >
                                    Imágen de muestra:
                                </label>
                                <input
                                    type="text"
                                    name="imagen_terciaria"
                                    id="imagen_terciaria"
                                    autoComplete="off"

                                    value={formNewData.imagen_terciaria}
                                    onChange={handleData}
                                    className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                                />
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <label
                                    htmlFor="imagen_cuaternaria"
                                    className="w-max font-semibold"
                                >
                                    Imagen de muestra:
                                </label>
                                <input
                                    type="text"
                                    name="imagen_cuaternaria"
                                    id="imagen_cuaternaria"
                                    autoComplete="off"

                                    value={formNewData.imagen_cuaternaria}
                                    onChange={handleData}
                                    className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                                />
                            </div>
                    </div>

                    <div className="flex flex-col items-end gap-4 w-1/3">
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="genero" className="w-max font-semibold">
                                Disponible para el género:
                            </label>
                            <select
                                name="genero"
                                id="genero"
                                value={formNewData.genero}
                                onChange={handleData}
                                className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                            >
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Ambos géneros">Ambos géneros</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <span className="w-max font-semibold">
                                Talle/s disponibles:
                            </span>

                            <div className="flex flex-col items-start gap-4 w-full">
                                {["XS", "S", "M", "L", "XL", "XXL"].map((talle) => (
                                    <label
                                        key={talle}
                                        htmlFor={talle}
                                        className="flex flex-row items-center gap-1 checkbox-container"
                                    >
                                        <input
                                            type="checkbox"
                                            id={talle}
                                            checked={formNewData.talle.includes(talle)}
                                            onChange={handleCheckboxChange}
                                            className="checkbox-input"
                                        />
                                        <div className="checkbox"></div>
                                        <span>{talle}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="unidades" className="w-max font-semibold">
                                Unidades:
                            </label>

                            <input
                                type="number"
                                name="unidades"
                                id="unidades"
                                autoComplete="off"
                                min={1}
                                placeholder="ej: 100"
                                value={formNewData.unidades}
                                onChange={handleData}
                                className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="precio" className="w-max font-semibold">
                                Precio:
                            </label>

                            <div className="flex flex-row items-center gap-2 w-full">
                                <div className="bg-blue-200 p-3 rounded-lg">
                                    <span className="font-semibold">ARS</span>
                                </div>

                                <input
                                    type="number"
                                    name="precio"
                                    id="precio"
                                    autoComplete="off"
                                    min={1}
                                    placeholder="ej: 79999"
                                    value={formNewData.precio}
                                    onChange={handleData}
                                    className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mt-8 w-max">
                            <button
                                type="submit"
                                disabled={formNewData.precio <= 0}
                                className="p-2 bg-red-600 text-white text-center font-semibold rounded-lg transition-colors hover:bg-red-800 disabled:bg-opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red-600 disabled:hover:bg-opacity-40"
                            >
                                Guardar cambios
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        }
    </>);
}

export default EditProductsView;