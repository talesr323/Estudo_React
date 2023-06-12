import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import axios from "axios";
import { useQuery } from 'react-query';
import "./style.css";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';


interface Repository {
  "Codigo": number,
  "UltimaAlteracao": string,
  "DataCompetencia": string,
  "DataVencimento": string,
  "DataVencimentoOriginal": string,
  "DataQuitacao": string,
  "Empresa": string,
  "Cliente": string,
  "NumeroDocumento": string,
  "Descricao": string,
  "Observacoes": string,
  "Quitado": boolean,
  "Conciliado": boolean,
  "EhDespesa": boolean,
  "PlanoDeConta": string,
  "CentroDeCusto": string,
  "ContaBancaria": string,
  "FormaPagamento": string,
  "LancamentoGrupo": boolean,
  "Valor": number,
  "TotalRecebido": number,
  "Pagamentos": [
    {
      "Data": string,
      "FormaPagamento": string,
      "NumeroDocumento": string,
      "ContaBancaria": string,
      "Conciliado": boolean,
      "Valor": number
    }
  ],
  "NumeroBoleto": number,
  "NumeroNFSe": number,
  "CodigoVenda": number,
  "CodigoContrato": number,
  "Parcelas": [],
  "JurosPagamentos": number,
  "MultaPagamentos": number
}


export function Repos() {
  const [startDate, setStartDate] = useState<string>("");
  const [EhDespesa, setEhDespesa] = useState<string>("2");
  const [endDate, setEndDate] = useState<string>("");
  const [listaMostrada, setListaMostrada] = useState<any[]>([]);
  const [totalLancamentos, setTotalLancamentos] = useState<number>(0);

/** 
//chamada API
  const { data, isFetching } = useQuery<Repository[]>("/api", async () => {
    const response = await axios.get("https://app.excelent.com.br/api/request/Lancamentos/Pesquisar", {
  headers: {
    Accept: "application/json",
    "Authorization-Token":"8f61667acffeb2c74706360afb1d0f7d0a0037e22b772d9504a5f24b882b5b4538c0c80ea742387caec355e17cd4c8bffafb7a614be84771eb7bdd66c5f204d488fe1ede37c1a3f816f323edbd4c138cc52724dfc77d745e88abd37755e22d838f441f1233fdad10b2a21e7f92892d8e2c62c1a2948b733da03dfe6ae7fedd81",
    User: "gestao@excelent.com.br",
    App: "API",
  },
});

    return response.data;
  });
  */
  
  
  const isFetching = false;

  const data = [
    {
      Codigo: "1",
      DataCompetencia: "2023-05-28T22:18:14.024Z",
      NumeroDocumento: "3333333",
      Cliente: "Tales renan cervantes simoes santos",
      EhDespesa: false,
      ValorPag: 3000,
      Pagamentos: [
        {
          Data: "2023-06-03T00:12:14.921Z",
          FormaPagamento: "credito",
          Valor: "100",
        },
        {
          Data: "2023-06-03T00:12:14.921Z",
          FormaPagamento: "pix",
          Valor: "100",
        }
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
      Codigo: "1",
      DataCompetencia: "2023-05-28T22:18:14.024Z",
      NumeroDocumento: "3333333",
      Cliente: "Tales",
      EhDespesa: true,
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
      Codigo: "3",
      DataCompetencia: "2023-05-28T22:18:14.024Z",
      NumeroDocumento: "3333333",
      Cliente: "Tales",
      EhDespesa: true,
      FormaPag: "dinheiro",
      ValorPag: 3000,
      Pagamentos: [
        {
          Data: "2023-06-03T00:12:14.921Z",
          FormaPagamento: "pix",
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
  

  const filtrarData = () => {
    if (startDate.trim().length === 0 || endDate.trim().length === 0) {
      return; // Retorna se alguma das datas estiver em branco
    }

    if (startDate > endDate) {
      alert("A data de início não pode ser maior que a data de fim");
      setStartDate("");
      setEndDate("");
      return; // Retorna se a startData for maior que a endDate
    }

    let totalLancamentos = 0;
    const filteredData = data?.filter((repo) => {
      const endDatePlusOneDay = addDays(new Date(endDate), 1).toISOString();

      if (startDate !== endDate) {
        if (EhDespesa === "1") {
          if (repo.EhDespesa && repo.DataCompetencia >= startDate && repo.DataCompetencia <= endDatePlusOneDay) {
            totalLancamentos += repo.ValorPag;
            if (repo.Parcelas.some((parcela: any) => parcela.Quitado)) {
            }
            return repo;
          }
        } else if (EhDespesa === "0") {
          if (!repo.EhDespesa && repo.DataCompetencia >= startDate && repo.DataCompetencia <= endDatePlusOneDay) {
            totalLancamentos += repo.ValorPag;
            return repo;
          }
        } else {
          totalLancamentos += repo.ValorPag;
          return repo;
        }
      }
    });
    setTotalLancamentos(totalLancamentos);
    setListaMostrada(filteredData || []);
  };


  //Gerar PDF
  const generatePDF = () => {
  const doc = new jsPDF("p", "pt", "a4");

  const table = document.querySelector("#relatoriosTable");

  if (table instanceof HTMLElement) {
    const columns = Array.from(table.querySelectorAll("thead th")).map(
      (header) => header.textContent?.trim() || ""
    );

    const rows = Array.from(table.querySelectorAll("tbody tr")).map((row) => {
      const rowData = Array.from(row.querySelectorAll("td")).map((cell) =>
        cell.textContent?.trim() || ""
      );
      // Atualiza a "Forma de Pagamento" para exibir cada forma de pagamento em uma linha separada
      const formaPagamentoIndex = columns.indexOf("Forma de Pagamento");
      if (formaPagamentoIndex !== -1) {
        const formaPagamentoValue = rowData[formaPagamentoIndex];
        const formattedFormaPagamento = formaPagamentoValue.replace(/ - /g, "\n");
        rowData[formaPagamentoIndex] = formattedFormaPagamento;
      }
      return rowData;
    });

    // Adicionar linha de resumo com o total
    const totalRow = ["", "", "","","", "Total: R$ " + totalLancamentos];
    rows.push(totalRow);

    autoTable(doc, {
      head: [columns],
      body: rows,
    });

    doc.save("Relatorio diario.pdf");
  }
};
  


  useEffect(() => {
    filtrarData();
  }, [startDate, endDate, EhDespesa]);

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
            value={EhDespesa}
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
      <div className="caption-container">
        Relatórios
      </div>
      <div className="table-container">
      <table className="Relatorios" id="relatoriosTable">
  <thead>
    <tr>
      <th>Código Lançamento</th>
      <th>Data Competencia</th>
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
        <td>{repo.Codigo}</td>
        <td>{format(new Date(repo.DataCompetencia), "dd/MM/yyyy")}</td>
        <td>{repo.NumeroDocumento}</td>
        <td>{repo.Cliente}</td>
        <td>
          {repo.Pagamentos.map((g: any) => {
            return (
              <span>{g.FormaPagamento} - {g.Valor} <br></br></span>
              
            );
          })}
        </td>
        <td>R$ {repo.ValorPag}</td>
        <td>
        {repo.Parcelas.map((p: any) => {
       return (        
      <span>N° {p.Codigo} - {p.Quitado ? 'Quitado' : 'Aberto'} <br></br></span>
       )
      })}

        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
      <div className="container-foot">
          <tr className="t-row">
            <td className="t-data" colSpan={7} style={{ textAlign: 'left' }}>
                Total: ${totalLancamentos}
            </td>
          </tr>
      </div>
      <button onClick={generatePDF} className="material-symbols-outlined">
          picture_as_pdf
      </button>
    </div>
  );
}
