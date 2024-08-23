import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ProdutoList from './components/ProdutoList';
import ProdutoCreate from './components/ProdutoCreate';
import ProdutoUpdate from './components/ProdutoUpdate';
import { getToken, removeToken } from './services/auth';

const App = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Verifica se tem um token no armazenamento local quando o componente é montado
        const tokenFromStorage = getToken();
        if (tokenFromStorage) {
            setToken(tokenFromStorage);
        }
    }, []);

    const handleLogout = () => {
        removeToken(); // Remove o token do armazenamento local
        setToken(null); // Limpa o estado do token
    };

    return (
        <Router>
            <div>
                {token && (
                    <header style={{ padding: '10px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6', position: 'fixed', width: '100%', top: 0, left: 0, zIndex: 1000 }}>
                        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h1>Produtos</h1>
                            <button
                                onClick={handleLogout}
                                style={{ padding: '5px 10px', fontSize: '16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Logout
                            </button>
                        </div>
                    </header>
                )}

                <main style={{ paddingTop: token ? '60px' : '0' }}>
                    <Routes>
                        {/* Rota dee login */}
                        <Route
                            path="/login"
                            element={token ? <Navigate to="/produtos" /> : <Login setToken={setToken} />}
                        />

                        {/* Rota de produtos */}
                        <Route
                            path="/produtos"
                            element={token ? <ProdutoList token={token} /> : <Navigate to="/login" />}
                        />

                        {/* Rota para criar um novo produto */}
                        <Route
                            path="/produtos/criar"
                            element={token ? <ProdutoCreate token={token} /> : <Navigate to="/login" />}
                        />

                        {/* Rota para editar um produto existente */}
                        <Route
                            path="/produtos/editar/:id"
                            element={token ? <ProdutoUpdate token={token} /> : <Navigate to="/login" />}
                        />

                        {/* Redireciona qualquer rota não definida para o login */}
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;