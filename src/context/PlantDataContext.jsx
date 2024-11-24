import React, {createContext, useState, useContext, Children} from "react";


const PlantDataContext = createContext();

export const usePlantData = () =>{
    return useContext(PlantDataContext);
}

export const PlantDataProvider = ({children}) =>{
    const[data, setData] = useState("Loading")
    const[error, setError] = useState(null);

    return(
        <PlantDataContext.Provider value = {{data, setData, error, setError}}>
            {children}
        </PlantDataContext.Provider>
    )


}