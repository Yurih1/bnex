import React, { useState, useEffect } from 'react';
import { getProducts, deleteProducts, createProducts, updateProducts } from '../services/api';
import Swal from 'sweetalert2'; 
import ProdutoCreate from './ProdutoCreate'; 
import ProdutoUpdate from './ProdutoUpdate'; 

function ProdutoList({ token }) {
    const [produtos, setProdutos] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showCreate, setShowCreate] = useState(false);

    // Função para buscar produtos
    const fetchProdutos = async () => {
        try {
            const response = await getProducts(token);
            setProdutos(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, [token]);

    // Função para lidar com a exclusão de produtos
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Você tem certeza?',
            text: 'Você não poderá reverter isso!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await deleteProducts(token, id);
                setProdutos(produtos.filter(produto => produto.id !== id));
                Swal.fire(
                    'Deletado!',
                    'O produto foi removido.',
                    'success'
                );
            } catch (error) {
                console.error('Erro ao deletar produto:', error);
                Swal.fire(
                    'Erro!',
                    'Ocorreu um erro ao deletar o produto.',
                    'error'
                );
            }
        }
    };

    // Função para atualizar a lista de produtos apos criação
    const handleProductCreated = () => {
        setShowCreate(false);
        fetchProdutos();
    };

    // Função para atualizar a lista de produtos apos edição
    const handleProductUpdated = () => {
        setEditingProduct(null);
        fetchProdutos();
    };

    return (
        <div className="container mt-5">
            <h2>Produtos</h2>
            <button className="btn btn-primary mb-3" onClick={() => setShowCreate(true)}>
                Criar Novo Produto
            </button>
            {showCreate && (
                <ProdutoCreate token={token} onProductCreated={handleProductCreated} />
            )}
            {editingProduct && (
                <ProdutoUpdate token={token} produto={editingProduct} onProductUpdated={handleProductUpdated} />
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(produto => (
                        <tr key={produto.id}>
                            <td>{produto.nome}</td>
                            <td>{produto.descricao}</td>
                            <td>{produto.preco}</td>
                            <td>
                                <button
                                    className="btn btn-warning mr-2"
                                    onClick={() => setEditingProduct(produto)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(produto.id)}
                                >
                                    Remover
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProdutoList;