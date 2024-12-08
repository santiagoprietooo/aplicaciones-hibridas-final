import MainTitle from "../components/MainTitle";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditarPerfilView() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ userData, setUserData ] = useState(null);
    const [ userNewData, setUserNewData ] = useState({
        name: "",
        email: "",
        photoURL: "",
        bio: ""
    });

    useEffect(() => {
        const getUserData = async (id) => {
            try {
                const endPoint = `https://aplicaciones-hibridas-final.vercel.app/api/users/${id}`;
                const config = {
                    method: 'GET',
                    headers: {'Content-Type' : 'appilcations/json'},
                }
                const response = await fetch(endPoint, config);
    
                if(!response.ok) {
                    console.error("Error al buscar el usuario.");
                }
    
                const data = await response.json();
                console.log(data.data);
    
                setUserNewData({
                    name: data.data.name || "",
                    email: data.data.email,
                    password: data.data.password,
                    photoURL: data.data.photoURL || "",
                    bio: data.data.bio || ""
                });
    
                setUserData(data.data);
            } catch (error) {
                console.error("Error en la solicitud de tipo PUT:", error);
                throw error;
            }
        }

        if (!id) {
            console.error("No se proporcionó ningún ID.");
        } else {
            getUserData(id);
        }
    }, [id]);

    const handleData = (e) => {
        const { name, value } = e.target;
        setUserNewData({ ...userNewData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const endPoint = `https://aplicaciones-hibridas-final.vercel.app/api/users/${id}`;
            const config = {
                headers: {
                    'Content-Type' : 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(userNewData)
            }
            const response = await fetch(endPoint, config);
            
            if(!response.ok) {
                console.error("No se pudo actualizar el usuario.");
            }

            const data = await response.json();
            console.log(data);

            navigate(`/perfil/${userData._id}`);
        } catch (error) {
            console.error("Error en la solicitud de tipo PUT.");
            throw error;
        }
    }

    return(<>
        {!userData ?
        <div className="mt-20 min-h-screen p-5"><Loader/></div>
        :
        <section className="mt-20 min-h-screen">
            <div className="p-5">
                <MainTitle title="Editar mi perfil"/>
            </div>

            <div className="p-5">
                <form
                    action=""
                    className="flex flex-col gap-6 w-1/2 p-5 border border-neutral-300 rounded-lg"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col items-end gap-4 w-full">
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="name" className="w-max font-semibold">
                                Nombre:
                            </label>

                            <input
                                type="text"
                                name="name"
                                id="name"
                                autoComplete="off"
                                placeholder="ej: Juan Gómez"
                                value={userNewData.name}
                                onChange={handleData}
                                className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="email" className="w-max font-semibold">
                                Correo electrónico:
                            </label>

                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="off"
                                placeholder="ej: juan.gomez@email.com"
                                value={userNewData.email}
                                onChange={handleData}
                                className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="photoURL" className="w-max font-semibold">
                                Foto de perfil:
                            </label>

                            <input
                                type="text"
                                name="photoURL"
                                id="photoURL"
                                autoComplete="off"
                                value={userNewData.photoURL}
                                onChange={handleData}
                                className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="bio" className="w-max font-semibold">
                                Biografía:
                            </label>

                            <textarea
                                name="bio"
                                id="bio"
                                value={userNewData.bio}
                                onChange={handleData}
                                className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                            ></textarea>
                        </div>

                        <div className="flex flex-col gap-2 mt-8 w-max">
                            <button
                                type="submit"
                                disabled={!userNewData.email && !userNewData.password }
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

export default EditarPerfilView;