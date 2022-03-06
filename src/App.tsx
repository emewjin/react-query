import React from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import Main from './components/Main';
import ErrorBoundary from './ErrorBoundary';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) =>
      console.error('QueryCache : ', query.meta, error),
  }),
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
