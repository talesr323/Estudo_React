import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import "./style.css";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'

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
  const [totalLancamentos, setTotalLancamentos] = useState<number>(0);
  //const [totalLancamentosQuitados, setTotalLancamentosQuitados] = useState<number>(0);



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
      cliente: "Tales renan cervantes simoes santos",
      ehDespesa: false,
      FormaPag: "dinheiro",
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
      return; // Retorna imediatamente se alguma das senhas estiver em branco
    }

    if (startDate > endDate) {
      alert("A data de início não pode ser maior que a data de fim");
      setStartDate("");
      setEndDate("");
      return; // Retorna imediatamente se a startData for maior que a endDate
    }

    let totalLancamentos = 0;
    const filteredData = data?.filter((repo) => {
      const endDatePlusOneDay = addDays(new Date(endDate), 1).toISOString();

      if (startDate !== endDate) {
        if (ehDespesa === "1") {
          if (repo.ehDespesa && repo.dataCompetencia >= startDate && repo.dataCompetencia <= endDatePlusOneDay) {
            totalLancamentos += repo.ValorPag;
            if (repo.Parcelas.some((parcela: any) => parcela.Quitado)) {
              //totalLancamentosQuitados += repo.ValorPag;
            }
            return repo;
          }
        } else if (ehDespesa === "0") {
          if (!repo.ehDespesa && repo.dataCompetencia >= startDate && repo.dataCompetencia <= endDatePlusOneDay) {
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
      // Update the "Forma de Pagamento" cell to display each payment method on a separate line
      const formaPagamentoIndex = columns.indexOf("Forma de Pagamento");
      if (formaPagamentoIndex !== -1) {
        const formaPagamentoValue = rowData[formaPagamentoIndex];
        const formattedFormaPagamento = formaPagamentoValue.replace(/ - /g, "\n");
        rowData[formaPagamentoIndex] = formattedFormaPagamento;
      }
      return rowData;
    });

    // Adicionar linha de resumo com o total
    const totalRow = ["Total: R$ " + totalLancamentos];
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
      <div className="caption-container">
        Relatórios
      </div>
      <div className="table-container">
      <table className="Relatorios" id="relatoriosTable">
  <thead>
    <tr>
      <th>Venda Código</th>
      <th>Data Competencia</th>
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
