import React from 'react';
import { useQuery, gql, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const GREETING_QUERY = gql`
  query GetGreeting {
    greeting
  }
`;

const GREETING_CACHE_BY_ID_QUERY = gql`
  query GetClientSideCache {
    greetingCacheById {
      __typename
      id
      value
    }
  }
`;

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  fetchPolicy: 'cache-first',
});

function Greeting() {
  const { loading, error, data, refetch } = useQuery(GREETING_QUERY, {
    fetchPolicy: 'network-only'
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (<div style={{display: 'flex', alignItems: 'center'}}>
    <h1> { data.greeting } </h1>
    <button style={{ marginLeft: 12 }} onClick={() => refetch()}>Refresh</button>
  </div>);
}

function GreetingCacheById() {
  const { loading, error, data, refetch } = useQuery(GREETING_CACHE_BY_ID_QUERY, {
    fetchPolicy: 'cache-first',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (<div style={{display: 'flex', alignItems: 'center'}}>
  <h1> id: {data.greetingCacheById.id}, value: {data.greetingCacheById.value} </h1>
  <button style={{ marginLeft: 12 }} onClick={() => refetch()}>Refresh</button>
</div>);
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <Greeting />
          <GreetingCacheById />
          <hr />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
