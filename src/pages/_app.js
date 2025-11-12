import { Provider } from "react-redux";
import "../styles/globals.css";
import { store } from "../store";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ProtectedRoute>
        <Component {...pageProps} />
      </ProtectedRoute>
    </Provider>
  );
}
