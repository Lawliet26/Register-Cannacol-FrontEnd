import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleBadge = (rol) => {
    const badges = {
      'usuario_final': 'bg-primary',
      'productor': 'bg-success', 
      'comerciante': 'bg-warning text-dark'
    };
    return badges[rol] || 'bg-secondary';
  };

  const getRoleText = (rol) => {
    const roles = {
      'usuario_final': 'Usuario Final',
      'productor': 'Productor',
      'comerciante': 'Comerciante'
    };
    return roles[rol] || rol;
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark dashboard-header">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <img src="/img/logo.png" alt="Logo" width="40" className="me-2" />
            <span className="navbar-brand mb-0 h1">Cannabis Admin</span>
          </div>
          
          <div className="d-flex align-items-center gap-3">
            <span className="text-light">
              Bienvenido, <strong>{user?.nombre} {user?.apellido}</strong>
            </span>
            <span className={`badge ${getRoleBadge(user?.rol)}`}>
              {getRoleText(user?.rol)}
            </span>
            <button 
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="container-fluid py-4">
          {/* Welcome Card */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card welcome-card">
                <div className="card-body">
                  <h1 className="card-title">¡Bienvenido al Sistema!</h1>
                  <p className="card-text">
                    Has iniciado sesión exitosamente en el Administrador de Transacciones de Cannabis.
                  </p>
                  <div className="row">
                    <div className="col-md-6">
                      <h5>Información de tu cuenta:</h5>
                      <ul className="list-unstyled">
                        <li><strong>Nombre:</strong> {user?.nombre} {user?.apellido}</li>
                        <li><strong>Email:</strong> {user?.email}</li>
                        <li><strong>Rol:</strong> {getRoleText(user?.rol)}</li>
                        <li><strong>ID:</strong> {user?.id}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="row mb-4">
            <div className="col-12">
              <h3>Acciones Rápidas</h3>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card action-card">
                <div className="card-body text-center">
                  <i className="fas fa-seedling fa-3x text-success mb-3"></i>
                  <h5 className="card-title">Gestionar Productos</h5>
                  <p className="card-text">Administra tus productos de cannabis</p>
                  <button className="btn btn-success">Ir a Productos</button>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card action-card">
                <div className="card-body text-center">
                  <i className="fas fa-exchange-alt fa-3x text-primary mb-3"></i>
                  <h5 className="card-title">Ver Transacciones</h5>
                  <p className="card-text">Revisa el historial de transacciones</p>
                  <button className="btn btn-primary">Ver Historial</button>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card action-card">
                <div className="card-body text-center">
                  <i className="fas fa-chart-bar fa-3x text-warning mb-3"></i>
                  <h5 className="card-title">Reportes</h5>
                  <p className="card-text">Genera reportes y estadísticas</p>
                  <button className="btn btn-warning">Ver Reportes</button>
                </div>
              </div>
            </div>
          </div>

          {/* Role-specific content */}
          {user?.rol === 'productor' && (
            <div className="row">
              <div className="col-12">
                <div className="alert alert-info">
                  <h4>Panel de Productor</h4>
                  <p>Como productor, puedes registrar nuevas cosechas y gestionar tu inventario.</p>
                </div>
              </div>
            </div>
          )}

          {user?.rol === 'comerciante' && (
            <div className="row">
              <div className="col-12">
                <div className="alert alert-warning">
                  <h4>Panel de Comerciante</h4>
                  <p>Como comerciante, puedes realizar compras y ventas en el sistema.</p>
                </div>
              </div>
            </div>
          )}

          {user?.rol === 'usuario_final' && (
            <div className="row">
              <div className="col-12">
                <div className="alert alert-primary">
                  <h4>Panel de Usuario Final</h4>
                  <p>Como usuario final, puedes consultar productos y realizar compras.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer text-center py-3">
        <div className="container">
          <span className="text-muted">
            Desarrollado por Daniel Esteban Ortega &mdash; Todos los derechos reservados.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;