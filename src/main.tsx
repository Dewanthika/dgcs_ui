import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { presistStore, store } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { AuthContext } from "./contexts/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={presistStore}>
      <BrowserRouter>
        <AuthContext>
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
        </AuthContext>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
