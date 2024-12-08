import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../contexts/AdminContext";
import { Eye, EyeOff } from "lucide-react";
import MainTitle from "../../components/MainTitle";

function SignInToAdmin() {
    const { signIn } = useContext(AdminContext);
    let [ showPassword, setShowPassword ] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(showPassword = !showPassword);
    }

    const [ adminData, setAdminData ] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleData = (e) => {
        const { name, value } = e.target;
        setAdminData({ ...adminData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const endPoint = "http://127.0.0.1:3000/api/admin/login";
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(adminData)
            }
            const response = await fetch(endPoint, config);

            if(!response.ok) {
                console.error("Error al querer iniciar sesión como administrador.");
            }

            const data = await response.json();
            console.log(data);

            setAdminData({
                email: "",
                password: ""
            });

            signIn(data.admin, data.token);
            navigate("/admin");
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return (<>
        <section className="mt-20 min-h-screen">
            <div className="p-5">
                <MainTitle title={
                    <span>
                        Administración para "La tienda del mil<span className="text-[#E2211C]">lona</span>rio"
                    </span>
                }/>
            </div>

            <form
                action=""
                onSubmit={handleSubmit}
                className="flex flex-col items-start gap-4 w-1/2 p-5"
            >
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="email" className="w-max font-semibold">Correo electrónico</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="on"
                        placeholder="admin@istra.dor"
                        onChange={handleData}
                        value={adminData.email}
                        className="p-3 w-full bg-gray-300 rounded-lg outline-none transition-colors placeholder:text-black placeholder:text-opacity-75 focus:bg-gray-100 focus:placeholder:text-opacity-60"
                    />
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="password" className="w-max font-semibold">Contraseña</label>
                    <div className="flex flex-row items-center gap-2">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            autoComplete="off"
                            placeholder="contraseña1234"
                            onChange={handleData}
                            value={adminData.password}
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

                <div className="flex flex-col gap-2 mt-8 w-full">
                    <button
                        type="submit"
                        className="p-2 bg-red-600 text-white text-center font-semibold rounded-lg transition-colors hover:bg-red-800"
                    >
                        Iniciar sesión
                    </button>
                </div>
            </form>
        </section>
    </>);
}

export default SignInToAdmin;