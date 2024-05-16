
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import StepProvider from './context/StepProvider'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StepProvider>
    <App />
    <Toaster />
    </StepProvider>
 
)
