import MainTitle from "../../components/MainTitle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCamisetaView() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        camiseta: "Camiseta Actual",
        categoria: "Titular",
        temporada: "",
        color: "",
        imagen_principal: "/Images/Products/",
        imagen_secundaria: "/Images/Products/",
        imagen_terciaria: "/Images/Products/",
        imagen_cuaternaria: "/Images/Products/",
        genero: "Masculino",
        talle: [],
        unidades: "",
        precio: "",
    });

    const handleData = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;

        setFormData((prevState) => {
            const updatedTalle = checked
                ? [...prevState.talle, id]
                : prevState.talle.filter((talle) => talle !== id);
            return { ...prevState, talle: updatedTalle };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const endPoint = "http://127.0.0.1:3000/api/camisetas/";
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(formData),
            };

            const response = await fetch(endPoint, config);

            if (!response.ok) {
                console.error(response);
            } else {
                setFormData({
                    camiseta: "Camiseta Actual",
                    categoria: "Titular",
                    temporada: "",
                    color: "",
                    imagen_principal: "/Images/Products/",
                    imagen_secundaria: "/Images/Products/",
                    imagen_terciaria: "/Images/Products/",
                    imagen_cuaternaria: "/Images/Products/",
                    genero: "Masculino",
                    talle: [],
                    unidades: "",
                    precio: "",
                });

                navigate("/admin/products_list");
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    return (<>
        <section className="mt-20 min-h-screen">
            <div className="p-5">
                <MainTitle title="Agregar nueva camiseta" />
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
                                onChange={handleData}
                                value={formData.camiseta}
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
                                onChange={handleData}
                                value={formData.categoria}
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
                                onChange={handleData}
                                value={formData.temporada}
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
                                onChange={handleData}
                                value={formData.color}
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
                                    onChange={handleData}
                                    value={formData.imagen_principal}
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
                                    onChange={handleData}
                                    value={formData.imagen_secundaria}
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
                                    onChange={handleData}
                                    value={formData.imagen_terciaria}
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
                                    onChange={handleData}
                                    value={formData.imagen_cuaternaria}
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
                                onChange={handleData}
                                value={formData.genero}
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
                                            checked={formData.talle.includes(talle)}
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
                                onChange={handleData}
                                value={formData.unidades}
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
                                    onChange={handleData}
                                    value={formData.precio}
                                    className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mt-8 w-max">
                            <button
                                type="submit"
                                disabled={formData.precio <= 0}
                                className="p-2 bg-red-600 text-white text-center font-semibold rounded-lg transition-colors hover:bg-red-800 disabled:bg-opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red-600 disabled:hover:bg-opacity-40"
                            >
                                Agregar camiseta
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </>);
}

export default AddCamisetaView;