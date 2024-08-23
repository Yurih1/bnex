import React, { useState } from 'react';
import { login } from '../services/api';
import { setToken } from '../services/auth'; 
import { useNavigate } from 'react-router-dom';

function Login({ setToken: setTokenInParent }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            const token = response.data.token;
            setToken(token); // Salva o token no localstorage
            setTokenInParent(token);
            navigate('/produtos');
        } catch (error) {
            setError('Credenciais inválidas');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Usuário</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button type="submit" className="btn btn-primary mt-3">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;