import MainTitle from '../components/MainTitle';
import NoPhoto from '/public/Images/no-user-pfp.png'
import Loader from '../components/Loader';
import { Edit, Trash, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';

function PerfilView() {
    let [ signedUser, setSignedUser ] = useState(null);
    let [ deletePerfil, setDeletePerfil ] = useState(null);
    let [ modal, setModal ] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    
    const getUser = async (id) => {
        const endPoint = `http://127.0.0.1:3000/api/users/${id}`;
        const config = {
            method: "GET",
            headers: {'Content-Type' : 'application/json'}
        }
        const response = await fetch(endPoint, config);

        if(!response.ok) {
            console.error("No se encontró el perfil con ID.");
        }
    
        const data = await response.json();
        setSignedUser(data.data);
    }

    useEffect(() => {
        getUser(id);
    }, [id]);

    async function deleteCuenta(id) {
        try {
            const endPoint = `http://127.0.0.1:3000/api/users/${id}`;
            const config = {
                method: 'DELETE',
                headers: {'Content-Type' : 'application/json'}
            }
            const response = await fetch(endPoint, config);

            if(!response.ok) {
                console.error("ERROR AL BORRAR LA CUENTA.");
            }

            navigate("/log-in");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        } catch (error) {
            console.error("Error en la solicitud.");
            throw error;
        }
    }

    const showModal = (id) => {
        setModal(modal = !modal);
        setDeletePerfil(id)
    }

    return(<>
        {!signedUser ?
        <section className='mt-20 min-h-screen'>
            <div className="p-5">
                <Loader />
            </div>
        </section>
        :
        <section className='mt-20 min-h-screen'>
            <div className="p-5">
                <MainTitle title={<span>Perfil de {signedUser.name}</span>}/>
            </div>

            <div className="p-5">
                <div className="flex flex-col items-end gap-4 p-5 border border-neutral-300 rounded-lg">
                    <div className='w-full'>
                        <div className='size-32 bg-cover bg-center bg-no-repeat rounded-full' style={ !signedUser.photoURL ? { backgroundImage : `url(${NoPhoto})` } : { backgroundImage : `url(${signedUser.photoURL})` } }></div>
                    </div>

                    <dl className='w-full'>
                        <dt className='font-bold'>Mi ID:</dt>
                        <dd className='mb-4'>{signedUser._id}</dd>

                        <dt className='font-bold'>Nombre:</dt>
                        <dd className='mb-4'>{signedUser.name || "No definido aún..."}</dd>

                        <dt className='font-bold'>Correo electrónico:</dt>
                        <dd className='mb-4'>{signedUser.email}</dd>

                        <dt className='font-bold'>Biografía:</dt>
                        <dd className='mb-4'>{signedUser.bio || "No definido aún..."}</dd>
                    </dl>

                    <NavLink
                        to={`/perfil/editar/${signedUser._id}`}
                        className="flex flex-row items-center gap-4 p-2 bg-red-700 text-white font-semibold rounded-md transition-colors hover:bg-red-600"
                    >
                        <span>Editar mi perfil</span>
                        <Edit className='size-5'/>
                    </NavLink>
                </div>
            </div>

            <div className="flex flex-row items-center justify-center p-5">
                <button
                    type="button"
                    onClick={() => {showModal(signedUser._id)}}
                    className='flex flex-row items-center gap-4 p-4 bg-white text-red-700 font-semibold border-2 border-red-700 rounded-lg transition-colors hover:bg-red-700 hover:text-white'
                >
                    <span>Borrar mi cuenta</span>
                    <Trash className='size-5'/>
                </button>
            </div>

            <div className={ modal ? "fixed top-0 right-0 bottom-0 left-0 z-20 bg-black bg-opacity-40" : "hidden" }>
                <div className="absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2 flex flex-col items-center gap-10 w-max p-5 bg-white rounded-lg">
                    <div className="flex flex-row items-start gap-10">
                        <span className="text-lg font-semibold">¿Estás seguro de que querés borrar esta cuenta? Esta acción es irreversible.</span>
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
                            onClick={() => {deleteCuenta(deletePerfil); showModal()}}
                            className="flex items-center justify-center p-3 bg-red-700 text-white font-semibold rounded-lg transition-colors hover:bg-red-600"
                        >
                            Sí, borrar.
                        </button>
                    </div>
                </div>
            </div>
        </section> 
        }
    </>);
}

export default PerfilView;