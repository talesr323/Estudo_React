import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App.tsx'
import { queryClient } from './services/queryClient.ts'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
       <QueryClientProvider client={queryClient}>
         <App />
       </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
