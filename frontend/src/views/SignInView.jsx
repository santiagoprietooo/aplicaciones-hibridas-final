import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import MainTitle from "../components/MainTitle";

function SignInView() {
    const navigate = useNavigate();
    const { signIn } = useContext(AuthContext);
    const [ formData, setFormData ] = useState({ email: "", password: "" });
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
            const endPoint = "https://aplicaciones-hibridas-final.vercel.app/api/users/login";
            const config = {
                headers: {
                    'Content-Type' : 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(formData)
            }

            const response = await fetch(endPoint, config);
            if (!response.ok) {
                console.error(response);
            }

            const data = await response.json();
            console.log(data);
            
            if(data.token) {
                signIn(data.user, data.token);
                navigate("/");
            } else {
                console.error("Error al iniciar sesión...");
            }

            setFormData({
                email: "",
                password: ""
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    return (
        <>
            <section className="mt-20 min-h-screen">
            <div className="p-5">
                    <MainTitle title="Iniciá sesión"/>
                </div>

                <div className="flex flex-col gap-8 p-5 w-full">
                    <form action="" className="flex flex-col items-start gap-4 w-full" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2 w-1/2">
                            <label htmlFor="email" className="w-max font-semibold">Correo electrónico</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="on"
                                placeholder="ejemplo@gmail.com"
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
                                Iniciar sesión
                            </button>
                        </div>
                    </form>

                    <div className="w-full">
                        <p className="w-1/2 text-center">
                            ¿No tenés una cuenta? <NavLink to="/log-in" className="text-red-600 underline">Registrate.</NavLink>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SignInView;