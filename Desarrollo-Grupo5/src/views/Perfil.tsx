import React, { useState, useEffect } from 'react';
import '../styles/Perfil.css';
import api from '../services/api';

const Perfil: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
    const [userInfo, setUserInfo] = useState({
        idUsuario: 0,
        nombreUsuario: '',
        mailUsuario: '',
        descripcionUsuario: ''
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [alertMessage, setAlertMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const setAlert = (message: string, type: 'success' | 'error') => {
        setAlertMessage({ message, type });
        setTimeout(() => setAlertMessage(null), 3500);
    };

    // ------------------ Cargar usuario desde localStorage y backend ------------------
    useEffect(() => {
        const savedUser = localStorage.getItem("usuario");
        if (savedUser) {
            const usuario = JSON.parse(savedUser);
            setUserInfo({
                idUsuario: usuario.idUsuario,
                nombreUsuario: usuario.nombreUsuario || '',
                mailUsuario: usuario.mailUsuario || '',
                descripcionUsuario: usuario.descripcionUsuario || ''
            });

            // Fetch backend para datos actualizados
            const fetchUsuario = async () => {
                try {
                    const res = await api.get(`/usuarios/${usuario.idUsuario}`);
                    setUserInfo({
                        idUsuario: res.data.idUsuario,
                        nombreUsuario: res.data.nombreUsuario || '',
                        mailUsuario: res.data.mailUsuario || '',
                        descripcionUsuario: res.data.descripcionUsuario || ''
                    });
                    // Actualizamos localStorage con los datos del backend
                    localStorage.setItem("usuario", JSON.stringify(res.data));
                } catch (err: any) {
                    console.error("Error fetchUsuario:", err);
                    setAlert('Error al cargar los datos del usuario', 'error');
                }
            };

            fetchUsuario();
        }
    }, []);

    // ------------------ Manejo de cambios ------------------
    const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
    };

    // ------------------ Guardar información ------------------
    const handleSaveInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInfo.idUsuario) {
            setAlert('Usuario no definido', 'error');
            return;
        }

        try {
            const res = await api.put(`/usuarios/${userInfo.idUsuario}`, {
                nombreUsuario: userInfo.nombreUsuario,
                mailUsuario: userInfo.mailUsuario,
                descripcionUsuario: userInfo.descripcionUsuario
            });

            setUserInfo(prev => ({ ...prev, ...res.data }));
            localStorage.setItem("usuario", JSON.stringify(res.data));
            setAlert('Información actualizada con éxito', 'success');
        } catch (err) {
            console.error(err);
            setAlert('Error al actualizar la información', 'error');
        }
    };

    // ------------------ Cambiar contraseña ------------------
    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInfo.idUsuario) {
            setAlert('Usuario no definido', 'error');
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setAlert('Las nuevas contraseñas no coinciden', 'error');
            return;
        }

        try {
            await api.put(`/usuarios/${userInfo.idUsuario}`, { contrasenaUsuario: passwordForm.newPassword });
            setAlert('Contraseña actualizada con éxito', 'success');
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            console.error(err);
            setAlert('Error al actualizar la contraseña', 'error');
        }
    };

    return (
        <div className="page-container">
            <h1 className="page-title">Mi Perfil</h1>

            {alertMessage && <div className={`alert ${alertMessage.type}`}>{alertMessage.message}</div>}

            <div className="profile-grid">
                {/* Información personal */}
                <div className="profile-card">
                    <h2>Información Personal</h2>
                    <form onSubmit={handleSaveInfo}>
                        <div className="form-group">
                            <label htmlFor="nombreUsuario">Nombre</label>
                            <input
                                type="text"
                                id="nombreUsuario"
                                name="nombreUsuario"
                                value={userInfo.nombreUsuario}
                                onChange={handleInfoChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mailUsuario">Email</label>
                            <input
                                type="email"
                                id="mailUsuario"
                                name="mailUsuario"
                                value={userInfo.mailUsuario}
                                onChange={handleInfoChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="descripcionUsuario">Descripción</label>
                            <textarea
                                id="descripcionUsuario"
                                name="descripcionUsuario"
                                value={userInfo.descripcionUsuario}
                                onChange={handleInfoChange}
                            />
                        </div>
                        <button type="submit" className="btn-primary">Guardar Cambios</button>
                    </form>
                </div>

                {/* Cambio de contraseña */}
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
                        <button type="submit" className="btn-secondary">Actualizar Contraseña</button>
                    </form>
                </div>
            </div>

            <div className="page-actions-center">
                <button onClick={onBackToHome} className="btn-primary">Volver a la Página Principal</button>
            </div>
        </div>
    );
};

export default Perfil;
