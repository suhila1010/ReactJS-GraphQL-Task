import "./App.css";
import TaskApollo from "./components/Task-apollo";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import {onError} from "@apollo/client/link/error";
import {setContext} from "@apollo/client/link/context";

const errorLink = onError(({graphqlErrors, networkError}) => {
  if (graphqlErrors) {
    graphqlErrors.map(({message, location, path}) => {
      console.log(`Graphql error ${message}`);
      console.log(`Graphql error Location ${location}`);
      console.log(`Graphql error path${path}`);
    });
  }
  if (networkError) {
    console.log(networkError);
  }
});

const authLink = setContext((_, {headers}) => {
  const token = "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";
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: errorLink.concat(authLink.concat(httpLink)),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <TaskApollo />
    </ApolloProvider>
  );
}

export default App;
