import axios from 'axios';
import { useQuery } from 'react-query';
import "./style.css"

type Repository = {
  codigoVenda: string;
  dataVencimento: string;
  NumeroBoleto:string;
  NumeroDocumento:string;
  cliente: string;
}

export function Repos() {
  const { data, isFetching } = useQuery<Repository[]>('/projects', async () => {
    const response = await axios.get('http://localhost:3033/projects')
    return response.data;
  })

  return (
    <div className='Container'>
      {isFetching && <p>Carregando...</p>}
      <table className='Relatorios'>
        <caption>Relatorios</caption>
        <thead>
          <tr>
            <th>Venda Codigo</th>
            <th>Data Vencimento</th>
            <th>Numero do Boleto</th>
            <th>Numero do Documento</th>
            <th>Cliente Nome Fantasia</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(repo => (
            <tr key={repo.codigoVenda}>
              <td>{repo.codigoVenda}</td>
              <td>{repo.dataVencimento}</td>
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


/**
 * CodVenda    ---  codigoVenda
 * DataFaturamento   ---
 * DataVenda   ---
 * NumBoleto   ---  NumeroBoleto
 * NumDocumento   ---   NumeroDocumento
 * CliNomeFantasia   ---  Cliente
 * FormaPagamento   ---
 * ValorEntrada   ---
*/