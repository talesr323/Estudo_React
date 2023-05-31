import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import "./style.css"

type Repository = {
  codigoVenda: string;
  dataVencimento: string;
  NumeroBoleto: string;
  NumeroDocumento: string;
  cliente: string;
}

export function Repos() {
  const [startDate, setStartDate] = useState<string>(''); // Estado para armazenar a data de início
  const [endDate, setEndDate] = useState<string>(''); // Estado para armazenar a data de fim

  const { data, isFetching } = useQuery<Repository[]>('/projects', async () => {
    const response = await axios.get('http://localhost:3033/projects')
    return response.data;
  })

  const filteredData = data?.filter((repo) => {
    if (startDate && endDate) {
      // Verifica se a data de vencimento está entre a data de início e a data de fim
      return (
        repo.dataVencimento >= startDate ??
        repo.dataVencimento <= endDate 
      );
    } else if (startDate === repo.dataVencimento || endDate === repo.dataVencimento) {
      // Verifica se a data de vencimento é igual à data de início ou igual à data de fim
      return (
        repo.dataVencimento >= startDate ?? 
        repo.dataVencimento <= endDate 
        );
    } else {
      // Retorna todos os dados se as datas de início e fim não estiverem definidas
      return false;
    }
  });
  
  

  return (
    <div className='Container'>
      <div className="data-filter">
        <div className='date-group'>
          <label htmlFor="startDate">Data de início:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className='date-group'>
          <label htmlFor="endDate">Data de fim:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      {isFetching && <p className='loading'>Loading&#8230;</p>}
      <table className='Relatorios'>
        <caption>Relatórios</caption>
        <thead>
          <tr>
            <th>Venda Código</th>
            <th>Data Vencimento</th>
            <th>Número do Boleto</th>
            <th>Número do Documento</th>
            <th>Nome Fantasia</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((repo) => (
            <tr key={repo.codigoVenda}>
              <td>{repo.codigoVenda}</td>
              <td>{new Date(repo.dataVencimento).toLocaleDateString('pt-BR')}</td>
              <td>{repo.NumeroBoleto}</td>
              <td>{repo.NumeroDocumento}</td>
              <td>{repo.cliente}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
