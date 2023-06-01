import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { addDays, format } from "date-fns";
import "./style.css";

type Repository = {
  ehDespesa: boolean;
  codigoVenda: string;
  dataCompetencia: string;
  NumeroBoleto: string;
  NumeroDocumento: string;
  cliente: string;
};

export function Repos() {
  const [startDate, setStartDate] = useState<string>("");
  const [ehDespesa, setEhDespesa] = useState<string>("2");
  const [endDate, setEndDate] = useState<string>("");
  const [listaMostrada, setListaMostrada] = useState<Repository[]>([]);

  const { data, isFetching } = useQuery<Repository[]>("/projects", async () => {
    const response = await axios.get("http://localhost:3033/projects");
    return response.data;
  });

  const filtrarData = () => {
    console.log("data 1", startDate);
    console.log("data 2", endDate);
    console.log("tipoDespesa", ehDespesa);
    if (startDate.trim().length > 0 && endDate.trim().length > 0) {
      const filteredData = data?.filter((repo) => {
        let converteDespesa;
        const endDatePlusOneDay = addDays(new Date(endDate), 1).toISOString();
        if (ehDespesa == "0") {
          converteDespesa = false;
        } else if (ehDespesa == "1") {
          converteDespesa = true;
        }
        if (startDate != endDate && ehDespesa != "2") {
          // Verifica se a data de vencimento está entre a data de início e a data de fim
          console.log('if 1', converteDespesa);
          return (
            repo.ehDespesa == converteDespesa &&
            repo.dataCompetencia >= startDate &&
            repo.dataCompetencia <= endDatePlusOneDay
          );
        } else if (
          (startDate === repo.dataCompetencia ||
            endDate === repo.dataCompetencia) &&
          ehDespesa != "2"
        ) {
          // Verifica se a data de vencimento é igual à data de início ou igual à data de fim
          console.log('if 2', converteDespesa);
          return (
            repo.ehDespesa == converteDespesa &&
            repo.dataCompetencia == startDate
          );
        } else {
          console.log('if 3', converteDespesa);
          // Retorna todos os dados se as datas de início e fim não estiverem definidas
          return true;
        }
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
      {isFetching && <p className="loading">Loading&#8230;</p>}
      <table className="Relatorios">
        <caption>Relatórios</caption>
        <thead>
          <tr>
            <th>Venda Código</th>
            <th>Data Competência</th>
            <th>Número do Boleto</th>
            <th>Número do Documento</th>
            <th>Nome Fantasia</th>
          </tr>
        </thead>
        <tbody>
          {listaMostrada?.map((repo) => (
            <tr key={repo.codigoVenda}>
              <td>{repo.codigoVenda}</td>
              <td>{format(new Date(repo.dataCompetencia), "dd/MM/yyyy")}</td>
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
