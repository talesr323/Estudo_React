import axios from 'axios';
import { useQuery } from 'react-query'

type Repository = {
  id: string;
  title: string;
  owner: string;
}

export function Repos() {
  const { data, isFetching } = useQuery<Repository[]>('/projects', async () => {

    const response = await axios.get('http://localhost:3033/projects')

    return response.data;
  })

  return (
    <ul>
      {isFetching && <p>Carregando...</p>}
      {data?.map(repo => {
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

