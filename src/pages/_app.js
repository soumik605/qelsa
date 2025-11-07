import { Provider } from "react-redux";
import "../../src/styles/globals.css";
import { store } from "../store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}
