import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import MainTitle from "../components/MainTitle";

function LoginView() {
    const navigate = useNavigate();
    const [ formData, setFormData ] = useState({ name: "", email: "", password: "" });

    let [ showPassword, setShowPassword ] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(showPassword = !showPassword);
    }
    const handleData = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const endPoint = "http://127.0.0.1:3000/api/users/";
            const config = {
                headers: {
                    'Content-Type' : 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(formData)
            }

            const response = await fetch(endPoint, config);
            if(!response.ok) {
                console.error(response);
            }

            const data = await response.json();
            console.log(data);

            setFormData({
                name: "",
                email: "",
                password: "",
            });

            navigate("/sign-in");
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return (
        <>
            <section className="mt-20 min-h-screen">
                <div className="p-5">
                    <MainTitle title="Creá tu cuenta"/>
                </div>

                <div className="flex flex-col gap-8 p-5 w-full">
                    <form action="" className="flex flex-col items-start gap-4 w-full" onSubmit={handleSubmit} autoComplete="on">
                        <div className="flex flex-col gap-2 w-1/2">
                            <label htmlFor="name" className="w-max font-semibold">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                autoComplete="on"
                                placeholder="Juan"
                                onChange={handleData}
                                value={formData.name}
                                className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-1/2">
                            <label htmlFor="email" className="w-max font-semibold">Correo electrónico</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="on"
                                placeholder="juan@gmail.com"
                                onChange={handleData}
                                value={formData.email}
                                className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-1/2">
                            <label htmlFor="password" className="w-max font-semibold">Contraseña</label>
                            <div className="flex flex-row items-center gap-2">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    autoComplete="off"
                                    placeholder="contraseña1234"
                                    onChange={handleData}
                                    value={formData.password}
                                    className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                                />

                                <button
                                    type="button"
                                    className="p-3 bg-red-600 text-white rounded-lg transition-colors hover:bg-red-800"
                                    onClick={handleShowPassword}
                                >
                                    { showPassword ? <EyeOff /> : <Eye /> }
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mt-8 w-1/2">
                            <button
                                type="submit"
                                className="p-2 bg-red-600 text-white text-center font-semibold rounded-lg transition-colors hover:bg-red-800"
                            >
                                Crear cuenta
                            </button>
                        </div>
                    </form>

                    <div className="w-full">
                        <p className="w-1/2 text-center">
                            ¿Ya tenés una cuenta? <NavLink to="/sign-in" className="text-red-600 underline">Inicia sesión.</NavLink>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LoginView;