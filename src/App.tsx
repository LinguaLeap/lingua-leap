import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { SocketProvider } from "./contexts/SocketIO";

const queryClient = new QueryClient();

function App() {
    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <SocketProvider>
                        <RouterProvider router={router} />
                    </SocketProvider>
                </AuthProvider>
            </QueryClientProvider>
        </React.StrictMode>
    );
}

export default App;
