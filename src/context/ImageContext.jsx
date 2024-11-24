import React, {createContext, useState, useContext, Children} from "react";

const ImageContext = createContext();

export const useImage = ()=>{
    return useContext(ImageContext)
}

export const ImageProvider = ({children})=>{
    const [imageURL, setImageURL] = useState(null);
    return(
        <ImageContext.Provider value = {{imageURL, setImageURL}}>
            {children}
        </ImageContext.Provider>
    )
}