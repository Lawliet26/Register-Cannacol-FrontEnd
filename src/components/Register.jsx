import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Register.css"

export default function RegisterForm() {

    const [formData, setFormData] = useState({
        password: "",
        password_confirm: "",
        rol:"usuario_final",
        nombre:"",
        apellido:"",
        email:"",
        identificacion:"",
        terminos: false
    })

    const[loading, setLoading] = useState(false);
    const[error, setError] = useState("");
    const[success, setSuccess] = useState("");

    const handleChange=(e) =>{
        const {name, value, type, checked} = e.target
        setFormData(prev => ({
            ...prev,
            [name]:type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit= async(e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        if (formData.password !== formData.password_confirm){
            setError("Las constraseñas no coinciden")
            setLoading(false)
            return;
        }
    
        try {
            const response = await fetch("http://localhost:8000/api/register/", {
                method : "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    password: formData.password,
                    password_confirm: formData.password_confirm,
                    rol: formData.rol,
                    nombre: formData.nombre,
                    apellido: formData.apellido,
                    email: formData.email,
                    identificacion: formData.identificacion,
                    terminos: formData.terminos
                })
            });
    
            const data = await response.json();
    
            if(response.ok){
                setSuccess("Usuario registrado con exito")
    
                setFormData({
                    password: "",
                    password_confirm: "",
                    rol:"usuario_final",
                    nombre:"",
                    apellido:"",
                    email:"",
                    identificacion:"",
                    terminos: false 
                })
            }else{
                setError(data.message || "Error al registrar usuario")
            }
            
        } catch (err) {
            setError("Error de conexion, intente nuevamente. ")
        } finally {
            setLoading(false)
        }
    }



  return (
    <div className="container my-5">
        <div className="row justify-content-center align-items-stretch">
            {/* Formulario */}
            <div className="col-md-6 bg-light p-4 shadow d-flex flex-column rounded-start">
                <h2 className="text-center mb-4">Administrador de Transacciones de Cannabis</h2>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>
                    {/* Rol */}
                    <div className="mb-3">
                        <label htmlFor="rol" className="form-label">Registrarse como:</label>
                        <select 
                            className="form-select" 
                            name="rol" 
                            id="rol" 
                            value={formData.rol}
                            onChange={handleChange}
                            required>
                            <option value="usuario_final">Usuario Final</option>
                            <option value="productor">Productor</option>
                            <option value="comerciante">Comerciante</option>
                        </select>
                    </div>

                    {/* Nombre y Apellido */}
                    <div className="row mb-3">
                        <div className="col">
                            <input 
                            type="text" 
                            className="form-control" 
                            name="nombre"
                            id="nombre" 
                            placeholder="Ingrese su nombre" 
                            value={formData.nombre}
                            onChange={handleChange}
                            required/>
                        </div>
                        <div className="col">
                            <input 
                            type="text" 
                            className="form-control" 
                            name="apellido"
                            id="apellido" 
                            placeholder="Ingrese su apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            required />
                        </div>
                    </div>

                    {/* Identificación */}
                    <div className="mb-3">
                        <input 
                            type="number" 
                            className="form-control"
                            name="identificacion" 
                            id="identificacion"
                            value={formData.identificacion}
                            onChange={handleChange}
                            required 
                            placeholder="Ingrese su identificación" />
                    </div>

                    {/* Correo */}
                    <div className="mb-3">
                        <input 
                        type="email" 
                        className="form-control" 
                        name="email"
                        id="email" 
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required />
                    </div>

                    {/* Contraseña */}
                    <div className="mb-3">
                        <input 
                            type="password" 
                            className="form-control" 
                            name="password"
                            id="password" 
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            required/>
                    </div>

                    {/* Confirmar contraseña */}
                    <div className="mb-3">
                        <input 
                            type="password" 
                            className="form-control" 
                            name="password_confirm"
                            id="password_confirm" 
                            placeholder="Confirmar contraseña"
                            value={formData.password_confirm}
                            onChange={handleChange}
                            required />
                    </div>

                    {/* Términos */}
                    <div className="col-md-6 d-none d-md-block p-0">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            name="terminos"
                            id="terminos"
                            checked={formData.terminos}
                            onChange={handleChange}
                            required />
                        <label className="form-check-label" htmlFor="terminos">
                            Acepto los términos y condiciones
                        </label>
                    </div>

                    {/* Botón */}
                    <div className="d-grid">
                        <button type="submit" className="btn btn-success" disabled={loading}>
                            {loading? "Registrando..." : "Registrarse"}
                        </button>
                    </div>
                </form>

                <p className="mt-3 text-center">
                    ¿Ya tienes una cuenta? <a href="#">Inicia sesión</a>
                </p>
            </div>

            {/* Imagen */}
            <div className="imagen-bg col-md-6 d-none d-md-block rounded-end">               
            </div>
        </div>
    </div>

  );
}
