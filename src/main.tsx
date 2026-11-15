import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { SketchbookProvider } from './context/SketchbookContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <SketchbookProvider>
        <App />
      </SketchbookProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
