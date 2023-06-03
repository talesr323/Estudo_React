import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { addDays, format } from "date-fns";
import "./style.css";
import { json } from "react-router-dom";

const repository: any = {
  ehDespesa: true,
  codigoVenda: "123",
  dataVencimento: "2023-06-01",
  NumeroBoleto: "456",
  NumeroDocumento: "789",
  cliente: "Alice",
  Pagamentos: [
    {
      id: "1",
      Valor: "100",
      FormaPagamento: "Cartão de Crédito",
    },
    {
      id: "2",
      Valor: "200",
      FormaPagamento: "Transferência Bancária",
    },
  ],
  Parcelas: [
    {
      Quitado: false,
      FormaPagamento: "din din",
    },
  ],
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
      codigoVenda: "1",
      dataCompetencia: "2023-05-28T22:18:14.024Z",
      NumeroBoleto: "3333333",
      NumeroDocumento: "3333333",
      cliente: "Tales",
      ehDespesa: false,
      FormaPag: "dinheiro",
      ValorPag: 3000,
      Pagamentos: [
        {
          Data: "2023-06-03T00:12:14.921Z",
          FormaPagamento: "credito",
          Valor: "100",
        },
      ],
      Parcelas : [
        {
          Codigo : "0",
          ValorParcela: 33,
          Quitado: false,
          DataQuitacao: "2023-06-03T00:12:14.921Z",
        },
        {
          Codigo : "1",
          ValorParcela: 33,
          Quitado: true,
          DataQuitacao: "2023-06-03T00:12:14.921Z",
        }
      ],
    },
    {
      codigoVenda: "1",
      dataCompetencia: "2023-05-28T22:18:14.024Z",
      NumeroBoleto: "3333333",
      NumeroDocumento: "3333333",
      cliente: "Tales",
      ehDespesa: true,
      FormaPag: "credito",
      ValorPag: 5000,
      Pagamentos: [
        {
          Data: "2023-06-03T00:12:14.921Z",
          FormaPagamento: "pix",
          Valor: "100",
        },
      ],
      Parcelas : [
        {
          Codigo : "0",
          ValorParcela: 33,
          Quitado: true,
          DataQuitacao: "2023-06-03T00:12:14.921Z",
        }
      ],
    },
    {
      codigoVenda: "3",
      dataCompetencia: "2023-05-28T22:18:14.024Z",
      NumeroBoleto: "3333333",
      NumeroDocumento: "3333333",
      cliente: "Tales",
      ehDespesa: true,
      FormaPag: "dinheiro",
      ValorPag: 3000,
      Pagamentos: [
        {
          Data: "2023-06-03T00:12:14.921Z",
          FormaPagamento: "pix",
          Valor: 1500,
        },
        {
          Data: "2023-06-03T00:12:14.921Z",
          FormaPagamento: "credito",
          Valor: 1500,
        },
      ],
      Parcelas : [
        {
          Codigo : "0",
          ValorParcela: 33,
          Quitado: true,
          DataQuitacao: "2023-06-03T00:12:14.921Z",
        }
      ],
    },
  ];

  let totalVendido = 0;
  let valorRecebido = 0;

  console.log(ehDespesa);
  const filtrarData = () => {
    if (startDate.trim().length > 0 && endDate.trim().length > 0) {
      const filteredData = data?.filter((repo) => {
       // let converteDespesa = !ehDespesa ? false : true
        const endDatePlusOneDay = addDays(new Date(endDate), 1).toISOString();

        if (startDate != endDate) {
          // Verifica se a data de vencimento está entre a data de início e a data de fim
          if(ehDespesa === "1"){
            if(repo.ehDespesa && repo.dataCompetencia >= startDate && repo.dataCompetencia <= endDatePlusOneDay){
              totalVendido = totalVendido + repo.ValorPag;
            
              /**repo.Parcelas.forEach(element => {
                valorRecebido = valorRecebido + element.ValorParcela;
              });*/
              
              return repo
            }
          }
          else if(ehDespesa === "0") {
            if(!repo.ehDespesa && repo.dataCompetencia >= startDate && repo.dataCompetencia <= endDatePlusOneDay){
              /**totalVendido = totalVendido + repo.ValorPag;
            
              repo.Parcelas.forEach(element => {
                valorRecebido = valorRecebido + element.ValorParcela;
              });*/

              return repo
            } 
          } else {
            totalVendido = totalVendido + repo.ValorPag;

            /**repo.Parcelas.forEach(element => {
              valorRecebido = valorRecebido + element.ValorParcela;
            });*/
            return repo
          }
        }
      });
      setListaMostrada(filteredData || []);
    }
  };

  useEffect(() => {
    filtrarData();
  }, [startDate, endDate, ehDespesa]);

  console.log(listaMostrada);

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
        <div className="date-group">
          <select
            value={ehDespesa}
            onChange={(t) => setEhDespesa(t.target.value)}
          >
            <option value={"2"}>Todos</option>
            <option value={"0"}>Receita</option>
            <option value={"1"}>Despesa</option>
          </select>
        </div>
      </div>
      <div></div>
      {isFetching && <p className="loading">Loading&#8230;</p>}
      <table className="Relatorios">
        <caption>Relatórios</caption>
        <thead>
          <tr>
            <th>Venda Código</th>
            <th>Data Vencimento</th>
            <th>Número do Boleto</th>
            <th>Número do Documento</th>
            <th>Nome Fantasia</th>
            <th>Forma de Pagamento</th>
            <th>Valor de Pagamento</th>
            <th>Parcela</th>
          </tr>
        </thead>
        <tbody>
          {listaMostrada?.map((repo, i) => (
            <tr key={i}>
              <td>{repo.codigoVenda}</td>
              <td>{format(new Date(repo.dataCompetencia), "dd/MM/yyyy")}</td>
              <td>{repo.NumeroBoleto}</td>
              <td>{repo.NumeroDocumento}</td>
              <td>{repo.cliente}</td>
              <td>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {repo.Pagamentos.map((g: any) => {
                    return (
                      <span>
                        {g.FormaPagamento} - {g.Valor}
                      </span>
                    );
                  })}
                </div>
              </td>
              <td>R$ {repo.ValorPag}</td>
              <td>
              <div style={{ display: "flex", flexDirection: "column" }}>
                  {repo.Parcelas.map((p: any) => {
                    return (
                      //fragmento - fragment react
                      <>
                        <span>N° {p.Codigo} - {p.Quitado ? 'Quitado' : 'Aberto'}</span>
                      </>
                    )
                  })}
                  </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <tfoot>Valor total de vendas: {totalVendido}</tfoot>
        <tfoot>Valor total de vendas recebidas: {valorRecebido}</tfoot>
      </div>
    </div>
  );
}