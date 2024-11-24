import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Main from "./components/Main"
import PlantInfo from "./components/PlantInfo"
import { PlantDataProvider } from "./context/PlantDataContext"
import { AddressDataProvider } from "./context/AddressContext"
import Geoloc from "./components/Geoloc"
import KnowPlants from "./components/KnowPlants"
import { PDFDownloadLink } from "@react-pdf/renderer";
import PlantPDF from "./components/PlantPDF"
import GrowTips from "./components/GrowTips"

function App() {

  return (
    <>
    <Header/>
    <Geoloc/>
    <PlantInfo/>
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/knowplants" element={<KnowPlants/>}/>
      <Route path="/tips" element={<GrowTips/>}/>
    </Routes>
    </>
  )
}

export default App
