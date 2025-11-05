import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    registerUser, 
    selectRegistrationStatus, 
    selectUserError, 
    selectUser, 
    clearError 
} from '../../features/usuarios/usuariosSlice';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    // 1. Estados del formulario
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [localError, setLocalError] = useState(null); 
    
    // 2. Lógica Redux/Routing
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const status = useSelector(selectRegistrationStatus);
    const apiError = useSelector(selectUserError);
    const user = useSelector(selectUser);

    const isLoading = status === 'loading';
    const displayError = localError || apiError; 

    // 3. Efectos de control
    useEffect(() => {
        if (user && status === 'succeeded') {
            navigate('/', { replace: true });
        }
    }, [user, status, navigate]);

    useEffect(() => {
        if (apiError || localError) {
            dispatch(clearError());
            setLocalError(null);
        }
    }, [nombre, apellido, correo, contrasena, confirmarContrasena, dispatch, apiError]);

    // 4. Envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!nombre || !apellido || !correo || !contrasena || !confirmarContrasena) {
            setLocalError('Todos los campos obligatorios deben ser completados.');
            return;
        }

        if (contrasena.length < 6) {
            setLocalError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        if (contrasena !== confirmarContrasena) {
            setLocalError('Las contraseñas no coinciden.');
            return;
        }

        setLocalError(null);
        
        dispatch(registerUser({ 
            nombre, 
            apellido, 
            correo, 
            contraseña: contrasena 
        }));
    };
    
    // ✅ Icono genérico SVG (persona + símbolo de “+”)
    const RegisterIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width="48" height="48" viewBox="0 0 24 24" 
            fill="none" stroke="currentColor" strokeWidth="2" 
            strokeLinecap="round" strokeLinejoin="round" 
            className="text-indigo-600">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="8.5" cy="7" r="4"/>
            <line x1="20" y1="8" x2="20" y2="14"/>
            <line x1="23" y1="11" x2="17" y2="11"/>
        </svg>
    );

    return (
        <div className="flex items-center justify-center min-h-[90vh] p-4 bg-gray-100">
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
                <div className="flex justify-center mb-6">
                     <RegisterIcon />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
                    Crear Cuenta
                </h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Regístrate para acceder al Sistema de Gestión Académica.
                </p>

                {displayError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4" role="alert">
                        <span className="block sm:inline">{displayError}</span>
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input
                                id="nombre"
                                type="text"
                                required
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
                            <input
                                id="apellido"
                                type="text"
                                required
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <input
                            id="correo"
                            type="email"
                            autoComplete="email"
                            required
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">Contraseña (Mín. 6)</label>
                            <input
                                id="contrasena"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="confirmarContrasena" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                            <input
                                id="confirmarContrasena"
                                type="password"
                                required
                                value={confirmarContrasena}
                                onChange={(e) => setConfirmarContrasena(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                isLoading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                            } transition duration-150 mt-2`}
                        >
                            {isLoading ? 'Registrando...' : 'Registrarse'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <button onClick={() => navigate('/login')} className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                        ¿Ya tienes cuenta? Inicia sesión aquí
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
