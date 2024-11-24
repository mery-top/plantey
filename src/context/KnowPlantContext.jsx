import { createContext, useContext, useState } from "react";

const KnowPlantContext = createContext()

export const useKnowPlant = ()=>{
    return useContext(KnowPlantContext)
}

export const KnowPlantProvider = ({children})=>{
    const [plantData, setPlantData] = useState(""); 

    return(
        <KnowPlantContext.Provider value={{plantData, setPlantData}}>
            {children}
        </KnowPlantContext.Provider>
    )
    
}