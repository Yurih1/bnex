import React, { useState } from 'react';
import { createProducts } from '../services/api';

function ProdutoCreate({ token, onProductCreated }) {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProducts(token, { nome, descricao, preco });
            onProductCreated();
        } catch (error) {
            setError('Erro ao criar produto');
        }
    };

    return (
        <div className="mt-3">
            <h3>Criar Produto</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Descrição</label>
                    <input
                        type="text"
                        className="form-control"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Preço</label>
                    <input
                        type="number"
                        className="form-control"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary mt-3">
                    Criar
                </button>
            </form>
        </div>
    );
}

export default ProdutoCreate;
