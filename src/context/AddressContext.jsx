import React, {createContext, useState, useContext, Children} from "react";

const AddressContext = createContext();

export const useAddress = ()=>{
    return useContext(AddressContext)
}

export const AddressDataProvider = ({children})=>{
    const[address, setAddress] = useState("");
    return(
        <AddressContext.Provider value = {{address, setAddress}}>
            {children}
        </AddressContext.Provider>
    )
}