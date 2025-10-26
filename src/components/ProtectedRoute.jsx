import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react'

const ProtectedRoute = ({children}) => {
    const {isAuthenticated, loading} = useAuth();

    //Mostrar loging mientras verifica autenticación
    if(loading){
        return(
            <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
                <div className='spinner-border text-primary' role="status">
                    <span className='visually-hidden'>Cargando...</span>
                </div>
            </div>
        );
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }

  return children
}

export default ProtectedRoute;
