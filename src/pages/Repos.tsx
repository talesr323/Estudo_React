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
};

export function Repos() {
  const [startDate, setStartDate] = useState<string>("");
  const [ehDespesa, setEhDespesa] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<string>("");
  const [listaMostrada, setListaMostrada] = useState<Repository[]>([]);

  const { data, isFetching } = useQuery<Repository[]>("/projects", async () => {
    const response = await axios.get("http://localhost:3033/projects");
    return response.data;
  });

  const filtrarData = () => {
    if (startDate.trim().length > 0 && endDate.trim().length > 0) {
      const endDatePlusOneDay = addDays(new Date(endDate), 1);

      const filteredData = data?.filter((repo) => {
        const converteDespesa = ehDespesa ? true : false;
        const repoDataVencimento = new Date(repo.dataVencimento);
        return (
          (repo.ehDespesa === converteDespesa) &&
          (repoDataVencimento >= new Date(startDate) && repoDataVencimento <= endDatePlusOneDay)
        );
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
            value={ehDespesa ? "1" : "0"}
            onChange={(e) => setEhDespesa(e.target.value === "1")}
          >
            <option value="2">Todos</option>
            <option value="0">Receita</option>
            <option value="1">Despesa</option>
          </select>
        </div>
      </div>
      {isFetching && <p className="loading">Loading...</p>}
      <table className="Relatorios">
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
          {listaMostrada?.map((repo) => (
            <tr key={repo.codigoVenda}>
              <td>{repo.codigoVenda}</td>
              <td>{format(new Date(repo.dataVencimento), "dd/MM/yyyy")}</td>
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
