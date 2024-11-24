import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AddressDataProvider } from './context/AddressContext.jsx'
import { PlantDataProvider } from './context/PlantDataContext.jsx'
import { ImageProvider } from './context/ImageContext.jsx'
import { KnowPlantProvider } from './context/KnowPlantContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AddressDataProvider>
      <PlantDataProvider>
        <ImageProvider>
        <BrowserRouter>
        <KnowPlantProvider>
        <App />
        </KnowPlantProvider>
      </BrowserRouter>
      </ImageProvider>
      </PlantDataProvider>
    </AddressDataProvider>
  </StrictMode>,
)
