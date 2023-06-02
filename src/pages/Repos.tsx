import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { addDays, format } from "date-fns";
import "./style.css";

type Repository = {
  ehDespesa: boolean;
  codigoVenda: string;
  dataVencimento: string;
  NumeroBoleto: string;
  NumeroDocumento: string;
  cliente: string;
  Pagamentos: [
    {
      Valor : string ,
      FormaPagamento: string
    }
  ];
  Parcelas: [
    {
      Quitado : boolean ,
      FormaPagamento: string
    }
  ];
};


export function Repos() {
  const [startDate, setStartDate] = useState<string>("");
  const [ehDespesa, setEhDespesa] = useState<string>("2");
  const [endDate, setEndDate] = useState<string>("");
  const [listaMostrada, setListaMostrada] = useState<any[]>([]);

  // const { data, isFetching } = useQuery<Repository[]>("/projects", async () => {
  //   const response = await axios.get("http://localhost:3033/projects");
  //   return response.data;
  // });

  const isFetching = false;

  const data = [
    {
      "codigoVenda": "1",
      "dataCompetencia": "2023-05-28T22:18:14.024Z",
      "NumeroBoleto": "3333333",
      "NumeroDocumento": "3333333",
      "cliente": "Tales",
      "ehDespesa": true,
      "FormaPag": "dinheiro",
      "ValorPag": "3.000,00"
    },
    {
      "codigoVenda": "1",
      "dataCompetencia": "2023-05-28T22:18:14.024Z",
      "NumeroBoleto": "3333333",
      "NumeroDocumento": "3333333",
      "cliente": "Tales",
      "ehDespesa": true,
      "FormaPag": "dinheiro",
      "ValorPag": "3.000,00"
    },
    {
      "codigoVenda": "2",
      "dataCompetencia": "2023-05-31T22:18:14.024Z",
      "NumeroBoleto": "3333333",
      "NumeroDocumento": "3333333",
      "cliente": "Tales",
      "ehDespesa": false,
      "FormaPag": "dinheiro",
      "ValorPag": "3.000,00"
    },
    {
      "codigoVenda": "3",
      "dataCompetencia": "2023-05-28T22:18:14.024Z",
      "NumeroBoleto": "3333333",
      "NumeroDocumento": "3333333",
      "cliente": "Tales",
      "ehDespesa": true,
      "FormaPag": "dinheiro",
      "ValorPag": "3.000,00"
    },
    {
      "codigoVenda": "4",
      "dataCompetencia": "2023-05-31T22:18:14.024Z",
      "NumeroBoleto": "3333333",
      "NumeroDocumento": "3333333",
      "cliente": "Tales",
      "ehDespesa": false,
      "FormaPag": "dinheiro",
      "ValorPag": "3.000,00"
    },
    {
      "codigoVenda": "5",
      "dataCompetencia": "2023-05-28T22:18:14.024Z",
      "NumeroBoleto": "3333333",
      "NumeroDocumento": "3333333",
      "cliente": "Tales",
      "ehDespesa": true,
      "FormaPag": "dinheiro",
      "ValorPag": "3.000,00"
    },
    {
      "codigoVenda": "6",
      "dataCompetencia": "2023-05-31T22:18:14.024Z",
      "NumeroBoleto": "3333333",
      "NumeroDocumento": "3333333",
      "cliente": "Tales",
      "ehDespesa": false,
      "FormaPag": "dinheiro",
      "ValorPag": "3.000,00"
    },
    {
      "codigoVenda": "7",
      "dataCompetencia": "2023-05-28T22:18:14.024Z",
      "NumeroBoleto": "3333333",
      "NumeroDocumento": "3333333",
      "cliente": "Tales",
      "ehDespesa": true,
      "FormaPag": "dinheiro",
      "ValorPag": "3.000,00"
    },
    {
      "codigoVenda": "8",
      "dataCompetencia": "2023-05-31T22:18:14.024Z",
      "NumeroBoleto": "3333333",
      "NumeroDocumento": "3333333",
      "cliente": "Tales",
      "ehDespesa": false,
      "FormaPag": "dinheiro",
      "ValorPag": "3.000,00"
    },
    {
      "codigoVenda": "9",
      "dataCompetencia": "2023-05-28T22:18:14.024Z",
      "NumeroBoleto": "3333333",
      "NumeroDocumento": "3333333",
      "cliente": "Tales",
      "ehDespesa": true,
      "FormaPag": "dinheiro",
      "ValorPag": "3.000,00"
    },
    {
      "codigoVenda": "10",
      "dataCompetencia": "2023-05-31T22:18:14.024Z",
      "NumeroBoleto": "3333333",
      "NumeroDocumento": "3333333",
      "cliente": "Tales",
      "ehDespesa": false,
      "FormaPag": "dinheiro",
      "ValorPag": "3.000,00"
    },
    {
      "codigoVenda": "11",
      "dataCompetencia": "2023-05-28T22:18:14.024Z",
      "NumeroBoleto": "3333333",
      "NumeroDocumento": "3333333",
      "cliente": "Tales",
      "ehDespesa": true,
      "FormaPag": "dinheiro",
      "ValorPag": "3.000,00"
    },
    {
      "codigoVenda": "12",
      "dataCompetencia": "2023-05-31T22:18:14.024Z",
      "NumeroBoleto": "3333333",
      "NumeroDocumento": "3333333",
      "cliente": "Tales",
      "ehDespesa": false,
      "FormaPag": "dinheiro",
      "ValorPag": "3.000,00"
    },
    {
      "codigoVenda": "13",
      "dataCompetencia": "2023-05-28T22:18:14.024Z",
      "NumeroBoleto": "3333333",
      "NumeroDocumento": "3333333",
      "cliente": "Tales",
      "ehDespesa": true,
      "FormaPag": "dinheiro",
      "ValorPag": "3.000,00"
    },
    {
      "codigoVenda": "14",
      "dataCompetencia": "2023-05-31T22:18:14.024Z",
      "NumeroBoleto": "3333333",
      "NumeroDocumento": "pedido515",
      "cliente": "Tales",
      "ehDespesa": false,
      "FormaPag": "dinheiro",
      "ValorPag": "3.000,00"
    },
  ]

console.log(ehDespesa)
  const filtrarData = () => {
    if (startDate.trim().length > 0 && endDate.trim().length > 0) {
      const filteredData = data?.filter((repo) => {
        const endDatePlusOneDay = addDays(new Date(endDate), 1).toISOString();
    
        const isDespesa = (ehDespesa === "1") ? repo.ehDespesa : (ehDespesa === "0") ? !repo.ehDespesa : true;
        const isWithinDateRange = (repo.dataCompetencia >= startDate && repo.dataCompetencia <= endDatePlusOneDay);
    
        return (startDate !== endDate) ? (isDespesa && isWithinDateRange) : isWithinDateRange;
      });
    
      setListaMostrada(filteredData || []);
    }    
  };

  useEffect(() => {
    filtrarData();
  }, [startDate, endDate, ehDespesa]);

  return (
    <div className="Container">
      <div className="data-filter">
        <div className="date-group">
          <label htmlFor="startDate">Data de início:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="date-group">
          <label htmlFor="endDate">Data de fim:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <select
          value={ehDespesa}
          onChange={(t) => setEhDespesa(t.target.value)}
        >
          <option value={"2"}>Todos</option>
          <option value={"0"}>Receita</option>
          <option value={"1"}>Despesa</option>
        </select>
      </div>
      <div>

      </div>
      {isFetching && <p className="loading">Loading&#8230;</p>}
      <div className="caption-container">
        Relatórios
      </div>
      <div className="table-container">
        <table className="Relatorios">
          <thead>
            <tr>
              <th>Venda Código</th>
              <th>Data Vencimento</th>
              <th>Número do Boleto</th>
              <th>Número do Documento</th>
              <th>Nome Fantasia</th>
              <th>Forma de Pagamento</th>
              <th>Valor de Pagamento</th>
            </tr>
          </thead>
          <tbody>
            {listaMostrada?.map((repo) => (
              <tr key={repo.FormaPag}>
                <td>{repo.codigoVenda}</td>
                <td>{format(new Date(repo.dataCompetencia), "dd/MM/yyyy")}</td>
                <td>{repo.NumeroBoleto}</td>
                <td>{repo.NumeroDocumento}</td>
                <td>{repo.cliente}</td>
                <td>{repo.FormaPag}</td>
                <td>R$ {repo.ValorPag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container-foot">
          <tr className="t-row">
            <td className="t-data" colSpan={7} style={{ textAlign: 'left' }}>
                Valor Total:
            </td>
          </tr>
      </div>
    </div>
  );
}