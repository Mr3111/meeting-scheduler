import React from 'react';

import './index.css';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DashboardLayout from './layouts/dashboard';
import AddMeeting from './pages/AddMeeting';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Home from './pages/Home';

const queryClient = new QueryClient();

export type IError = {
    status: 'error' | 'warning' | '';
    message?: string;
};

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<DashboardLayout />}>
                        <Route index element={<Home />} />
                        <Route path="meetings">
                            <Route path="new" element={<AddMeeting />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
