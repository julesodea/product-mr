import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./input.css";
import App from "./App.tsx";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient({
  defaultOptions: {
    // This will be applied to all queries and refresh data after 1 hour, thus avoiding stale data and saving api calls.
    queries: { staleTime: 60 * 60 * 1000, gcTime: 60 * 60 * 1000 },
  },
});
const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <App />
    </PersistQueryClientProvider>
  </StrictMode>
);
