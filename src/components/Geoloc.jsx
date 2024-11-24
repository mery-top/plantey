import { useEffect, useState } from "react"
import { useAddress } from "../context/AddressContext";


export default function Geoloc(){
    const{address, setAddress} = useAddress();
    const[locationInfo, setLocationInfo] = useState(null);
    const {geolocation} = navigator;
    const apiKey = import.meta.env.VITE_GEOLOC_KEY;

    useEffect(() =>{
        const success = async (res)=>{
            const{ latitude, longitude} = res.coords;
            // console.log("Coordinates", {latitude, longitude});
            setLocationInfo({latitude, longitude});

            try{
                const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
                const data = await response.json();
                // console.log(data);

                if(data.results.length>0){
                    const { county, state, country, postcode } = data.results[0].components;
                    setAddress(`${county}, ${state}, ${country}, ${postcode}`); 
                } else{
                    setAddress("Address Not Found")
                }
            }catch(error){
                // console.error("Error Fetching Address", error);
                setAddress("Address not Found");
            }

        }

        const error = (err) =>{
            // console.error("Error Retrieving Location", err.message);
        }
        geolocation.getCurrentPosition(success, error)
    }, [setAddress]);

    // console.log(locationInfo);
    // console.log(address)

    return(
        <span></span>
        
    )
}