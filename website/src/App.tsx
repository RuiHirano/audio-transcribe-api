import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router, Outlet, Link } from '@tanstack/react-location';
import { routes, location } from './Router';

const queryClient = new QueryClient()

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Router routes={routes} location={location}>
          <Outlet /> {/* パスが一致した際にレンダリングされるコンポーネント */}
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
