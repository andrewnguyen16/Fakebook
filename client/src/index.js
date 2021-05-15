import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { StylesProvider } from "@material-ui/core/styles";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import App from "./App";
import store from "./store/store";

const httpLink = createHttpLink({
  uri: "http://localhost:3001",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ApolloProvider client={client}>
        <StylesProvider injectFirst>
          <App />
        </StylesProvider>
      </ApolloProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
