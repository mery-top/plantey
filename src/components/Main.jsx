
import "../index.css"
import { useAddress } from "../context/AddressContext";
import { usePlantData } from "../context/PlantDataContext";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PlantPDF from "./PlantPDF";
export default function Main(){
    const {address, setAddress} = useAddress();
    const{data, setData, error, setError} = usePlantData();

    if (!data || !data.plants) {
        return (
          <main>
            <div className="location">
              <h1>What Plant Fits Your Garden?</h1>
              <div className="location-box">
                <h1>{address ? `Location: ${address}` : "Fetching Address"}</h1>
              </div>
            </div>
            <h2>Loading plant data...</h2>
          </main>
        );
      }




    return(
        <main>
            <div className="pot">
                <img src="images/plantbg.png"></img>
            </div>
            <div className="location">
                <h1>What Plant Fits Your Garden?</h1>
                <div className="location-box">
                <h1>{address ? `Location: ${address}`: "Fetching Address"}</h1>
                </div>
                <h1>AI Curated Plants Just for Your Garden!</h1>
            </div>
            
            <div className="types">
                {/* Herb */}
                <div className="plant-type">
                    <div className="plant-type-box">
                        <h1>Herbs</h1>
                        <ul>
                            {data.plants.herbs_and_shrubs.map((herb, index)=>(
                                <li key = {index}>
                                    <h2>{index+1}. {herb.name} ({herb.scientific_name})</h2>
                                    <h2>* {herb.description}</h2>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* Tree */}
                <div className="plant-type">
                    <div className="plant-type-box">
                        <h1>Trees</h1>
                        <ul>
                            {data.plants.trees.map((tree, index)=>(
                                <li key = {index}>
                                    <h2>{index+1}. {tree.name} ({tree.scientific_name})</h2>
                                    <h2>* {tree.description}</h2>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
                {/* Flowers */}
                <div className="plant-type">
                    <div className="plant-type-box">
                        <h1>Flowers</h1>
                        <ul>
                            {data.plants.flowers.map((flower, index)=>(
                                <li key = {index}>
                                    <h2>{index+1}. {flower.name} ({flower.scientific_name})</h2>
                                    <h2>* {flower.description}</h2>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
                {/* Fruits/Veggies */}
                <div className="plant-type">
                    <div className="plant-type-box">
                        <h1>Fruits/Veggies</h1>
                        <ul>
                            <h2>Fruits</h2>
                            {data.plants.fruits.map((fruit, index)=>(
                                <li key = {index}>
                                    <h2>{index+1}. {fruit.name} ({fruit.scientific_name})</h2>
                                    <h2>* {fruit.description}</h2>
                                </li>
                            ))}
                            <h2>Vegetables</h2>
                            {data.plants.vegetables.map((veggie, index)=>(
                                <li key = {index}>
                                    <h2>{index+1}. {veggie.name} ({veggie.scientific_name})</h2>
                                    <h2>* {veggie.description}</h2>
                                </li>
                            ))}
                        </ul>
                        

                    </div>
                </div>

            </div>

            <footer>
                <h1>Love Nature🥰</h1>
            </footer>
                            
        </main>
        
    )
}