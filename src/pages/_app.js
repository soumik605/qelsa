import RouteGuard from "@/components/auth/RouteGuard";
import { AuthProvider } from "@/contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "../store";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/sonner";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouteGuard>
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}>
            <Component {...pageProps} />
            <Toaster position="top-center" richColors />
          </GoogleOAuthProvider>
        </RouteGuard>
      </AuthProvider>
    </Provider>
  );
}
