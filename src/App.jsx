import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <Routes>
            {/* Raiz  */}
            <Route path='/' element={<RootRedirect/>} />

            {/* Rutas publicas  */}
            <Route path='/register' element={<RegisterForm/>} />
            <Route path='/login' element={<LoginForm/>} />

            {/* Rutas protegidas */}
            <Route
              path='/dashboard'
              element={
                <ProtectedRoute>
                  <Dashboard/>
                </ProtectedRoute>
              }
            />

            {/* Ruta 404 */}
            <Route path='*' element={<Navigate to="/login" replace/>}/>

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function RootRedirect(){
  const isAuthenticated = localStorage.getItem("access_token");

  if(isAuthenticated){
    return <Navigate to="/dashboard" replace/>
  } else {
    return <Navigate to="/login" replace/>
  }
}

export default App
