import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";

function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        recordarme: false,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:8000/api/login/", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                email: formData.email,
                password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok){
                login(data.user, data.tokens);
                navigate('/dashboard');
            } else {
                setError(data.message || "Error al iniciar sesión");
            }
        } catch (err) {
            setError("Error de conexión, intente nuevamente")
        } finally {
            setLoading(false);
        }
    };

  return (
    <>
        <div className="login-container">
            <div className="login-box">
                <div className="login-form">
                    <div className="d-flex align-items-center mb-4 gap-2">
                        <img src="/img/logo.png" alt="Logo" width="60" />
                        <p className="fs-5 fw-semibold mb-0">
                            Administrador de Transacciones de Cannabis
                        </p>
                    </div>

                    <h2 className="text-center fs-1 mb-4">Bienvenido</h2>
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <input 
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="example@email.com" 
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input 
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Contraseña" 
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <div className="form-check mb-3">
                            <input 
                                type="checkbox"
                                className="form-check-input"
                                id="recordarme"
                                name="recordarme"
                                checked={formData.recordarme}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="recordarme">
                                Recordarme
                            </label>
                            <span className="float-end">
                                <a href="#">Olvidé mi contraseña</a>
                            </span>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100 btn-init"
                            disabled={loading}
                        >
                            {loading ? "Ingresando...": "Ingresar"}
                        </button>

                        <div className="text-center mt-3">
                            <p>
                                ¿No tienes una cuenta?{" "}
                                <Link to="/register">Regístrate aquí</Link>
                            </p>
                        </div>
                    </form>
                </div>
                <div className="login-img d-none d-md-block">
                    <img src="/img/planta-de-cannabis.jpg" alt="planta"/>
                </div>
            </div>
        </div>
        <footer className="footer-legal text-center py-3">
            Desarrollado por Daniel Esteban Ortega &mdash; Todos los derechos reservados.
        </footer>
    </>
  )
}

export default LoginForm