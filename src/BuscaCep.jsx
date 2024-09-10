import React, { useState } from 'react';
import axios from 'axios';

const BuscaCep = () => {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  // funcao que busca o cep
  const buscarCep = async () => {
    // Validacaoo simples p verificar se o CEP tem 8 digitos
    if (cep.length !== 8 || isNaN(cep)) {
      setErro('Digite um CEP válido com 8 números.');
      setEndereco(null);
      return;
    }

    setErro('');
    setLoading(true); // Ativando o estado de loading
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setErro('CEP não encontrado!');
        setEndereco(null);
      } else {
        setEndereco(response.data);
        setErro('');
      }
    } catch (error) {
      setErro('Erro ao buscar o CEP!');
      setEndereco(null);
    } finally {
      setLoading(false); // Desativando o estado de loading
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Busca de Endereço por CEP</h1>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <input
          className="w-full border border-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Digite o CEP (somente números)"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          maxLength={8}
        />
        <button
          className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-blue-600 transition duration-200"
          onClick={buscarCep}
          disabled={loading}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>

        {erro && (
          <p className="text-red-500 mt-4 text-center">{erro}</p>
        )}

        {endereco && (
          <div className="mt-6">
            <p><strong>Logradouro:</strong> {endereco.logradouro}</p>
            <p><strong>Bairro:</strong> {endereco.bairro}</p>
            <p><strong>Cidade:</strong> {endereco.localidade}</p>
            <p><strong>Estado:</strong> {endereco.uf}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuscaCep;
