import React, { useState, useEffect } from 'react';
import { updateProducts } from '../services/api';
import Swal from 'sweetalert2';

function ProdutoUpdate({ token, produto, onProductUpdated }) {
    const [nome, setNome] = useState(produto.nome);
    const [descricao, setDescricao] = useState(produto.descricao);
    const [preco, setPreco] = useState(produto.preco);
    const [error, setError] = useState('');

    useEffect(() => {
        setNome(produto.nome);
        setDescricao(produto.descricao);
        setPreco(produto.preco);
    }, [produto]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({
            title: 'Você tem certeza?',
            text: 'Deseja atualizar este produto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, atualizar!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await updateProducts(token, produto.id, { nome, descricao, preco });
                onProductUpdated();
                Swal.fire(
                    'Atualizado!',
                    'O produto foi atualizado com sucesso.',
                    'success'
                );
            } catch (error) {
                setError('Erro ao atualizar produto');
                Swal.fire(
                    'Erro!',
                    'Ocorreu um erro ao atualizar o produto.',
                    'error'
                );
            }
        }
    };

    return (
        <div className="mt-3">
            <h3>Atualizar Produto</h3>
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
                    Atualizar
                </button>
            </form>
        </div>
    );
}

export default ProdutoUpdate;