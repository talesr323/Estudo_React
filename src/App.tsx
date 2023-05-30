import { useFetch } from "./hooks/useAPI"

type Repository = {
  id: string;
  title: string;
  owner: string;
}

function App() {
  const { data: repositories, isFetching } =
   useFetch<Repository[]>('/projects')

  return (
    <ul>
      {isFetching && <p>Carregando...</p>}
      {repositories?.map(repo => {
        return(
        <li key={repo.id}>
          <h1>{repo.id}</h1>
          <strong>{repo.title}</strong>
          <p>{repo.owner}</p>
        </li>
        )
      })}
    </ul>
  );
}

export default App;

//34:42