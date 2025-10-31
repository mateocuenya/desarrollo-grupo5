import React, { useState } from 'react';
import '../styles/Perfil.css';

interface PerfilProps {
    onBackToHome: () => void;
}

const Perfil: React.FC<PerfilProps> = ({ onBackToHome }) => {
  // Estado para la información del usuario
    const [userInfo, setUserInfo] = useState({
        name: 'Juan Pérez',
        email: 'juan.perez@beats.com',
    });

    // Estado para el formulario de contraseña
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Estado para manejar el mensaje de alerta (éxito/error)
    const [alertMessage, setAlertMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const setAlert = (message: string, type: 'success' | 'error') => {
        setAlertMessage({ message, type });
        setTimeout(() => {
        setAlertMessage(null);
        }, 3500); // El mensaje desaparece después de 3.5 segundos
    };

    /*-------MANEJAR LOS CAMBIOS-------*/

    //Cambio de nombre: ingresar informacion
    const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({
        ...userInfo, //Copia los datos actuales y los pone en el nuevo objeto. Ej cambio nombre, dejo correo.
        [e.target.name]: e.target.value, //especifica que cambio se debe hacer 
        });
    };

    //Cambio de contraseña: ingresar informacion
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveInfo = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Guardando información:", userInfo);
        // Simulación de API exitosa
        setAlert("Información guardada con éxito.", 'success');
    };

    //"Gestion del cambio de contraseña"
    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        setAlert("Las nuevas contraseñas no coinciden.", 'error');
        return;
        }
        console.log("Cambiando contraseña:", passwordForm.newPassword);
        // Simulación de API exitosa
        setAlert("Contraseña actualizada con éxito.", 'success');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <div className="page-container">
            <h1 className="page-title">Mi Perfil</h1>

            {/* --- BLOQUE DE ALERTA --- */}
            {alertMessage && (
                <div className={`alert ${alertMessage.type}`}>
                    {alertMessage.message}
                </div>
            )}

            <div className="profile-grid">
                {/* --- SECCIÓN DE INFORMACIÓN PERSONAL --- */}
                <div className="profile-card">
                    <h2>Información Personal</h2>
                    <form onSubmit={handleSaveInfo}>
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={userInfo.name}
                                    onChange={handleInfoChange}
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={userInfo.email}
                                    readOnly
                                />
                        </div>
                            <button type="submit" className="btn-primary">
                                Guardar Cambios
                            </button>
                    </form>
                </div>

                {/* --- SECCIÓN DE CAMBIO DE CONTRASEÑA --- */}
                <div className="profile-card">
                    <h2>Cambiar Contraseña</h2>
                    <form onSubmit={handleChangePassword}>
                        <div className="form-group">
                            <label htmlFor="currentPassword">Contraseña Actual</label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={passwordForm.currentPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword">Nueva Contraseña</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={passwordForm.newPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={passwordForm.confirmPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                        </div>
                            <button type="submit" className="btn-secondary">
                                Actualizar Contraseña
                            </button>
                    </form>
                </div>
            </div>

            {/* Botón de volver a casa */}
            <div className="page-actions-center">
                <button onClick={onBackToHome} className="btn-primary">
                    Volver a la Página Principal
                </button>
            </div>
        </div>
    );
};

export default Perfil;
