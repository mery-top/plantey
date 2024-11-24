import React, { useState, useEffect, useCallback } from "react";
import { ChatGroq } from "@langchain/groq";
import debounce from "lodash.debounce";
import ImageGenerator from "./ImageGenerator";
import { useKnowPlant } from "../context/KnowPlantContext";
import PlantImage from "./PlantImage";



export default function KnowPlants() {
  const [input, setInput] = useState(""); // User input
  const {plantData, setPlantData} = useKnowPlant(); // Fetched plant data
  const [error, setError] = useState(null); // Error handling

  // Debounced API call
  const SearchPlant = 
    debounce(async (query) => {
      if (!query) return; // Avoid making calls for empty input
      try {
        const llm = new ChatGroq({
          model: "llama-3.1-70b-versatile",
          temperature: 0,
          apiKey: import.meta.env.VITE_GROQ2_KEY, // Replace with your actual API key
        });

        const fetchData = await llm.invoke([
          {
            role: "system",
            content: `
              I want detailed botanical information about a plant. The user will provide the plant's name. Based on the name, return a JSON object with the following attributes:
              Genus, Species, Category, Family, Growth Habit, Duration, Growth Rate, Cost of Growth, 
              Space Availability, Mature Height, Foliage Texture, Flower Color, Fruit Color, Toxicity, 
              Drought Tolerance, Shade Tolerance, Temperature Minimum, Lumber Product Availability, 
              Space Occupied, Image, Watering, Insects, Disease, Soil Nature, Blooming Season, 
              Net Cost Prediction. Ensure the JSON structure is clear, organized, and valid. 
              Provide no preamble, just the valid JSON response, with no extra symbols like backticks or messages.`,
          },
          { role: "user", content: query },
        ]);

        const jsonResponsePlant = JSON.parse(fetchData.content); // Parse JSON response
        setPlantData(jsonResponsePlant); // Update state with plant data
        setError(null); // Clear previous errors
      } catch (err) {
        // console.error("Can't fetch data", err);
        setError("Failed to fetch plant data. Please try again.");
        setPlantData(null);
      }
    }, 1000); // Delay of 1 second

  // Update debounced function when input changes
  useEffect(() => {
    SearchPlant(input);
    // Cleanup on unmount to avoid memory leaks
    return () => SearchPlant.cancel();
  }, [input, SearchPlant]);

  return (
    <div className="search" style={{paddingBottom:"100px"}}>
      <h1>Know About Your Plants!<br></br>(Use Scientific Name) </h1>
      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update input state
          placeholder="Enter the plant name"
        />
      </div>

      {/* Display loading or error message */}
      {error && <p className="error">{error}</p>}
      {plantData ? (
        <div className="plant-data-box">
            <h1>Plant Information</h1>
            <div className="plant-box">
                {/* <img src="/images/plants.jpeg"></img> */}
            <PlantImage input = {input}/>
            
          <div className="plant-info">
            {plantData ? (
      <div>
        <h2>Basic Details</h2>
        <p><strong>Genus: </strong> {plantData.Genus}</p>
        <p><strong>Species: </strong> {plantData.Species}</p>
        <p><strong>Category: </strong> {plantData.Category}</p>
        <p><strong>Family: </strong> {plantData.Family}</p>
        <br></br>
        <h2>Growth Details</h2>
        <p><strong>Growth Habit: </strong> {plantData["Growth Habit"]}</p>
        <p><strong>Duration: </strong> {plantData.Duration}</p>
        <p><strong>Growth Rate: </strong> {plantData["Growth Rate"]}</p>
        <p><strong>Mature Height: </strong> {plantData["Mature Height"]}</p>
        <p><strong>Foliage Texture: </strong> {plantData["Foliage Texture"]}</p>
                <br></br>
        <h2>Environmental Tolerances</h2>
        <p><strong>Drought Tolerance: </strong> {plantData["Drought Tolerance"]}</p>
        <p><strong>Shade Tolerance: </strong> {plantData["Shade Tolerance"]}</p>
        <p><strong>Temperature Minimum: </strong> {plantData["Temperature Minimum"]}</p>
                <br></br>
        <h2>Additional Details</h2>
        <p><strong>Flower Color:</strong> {plantData["Flower Color"]}</p>
        <p><strong>Fruit Color:</strong> {plantData["Fruit Color"]}</p>
        <p><strong>Toxicity:</strong> {plantData.Toxicity}</p>
        <p><strong>Watering:</strong> {plantData.Watering}</p>
        <p><strong>Insects:</strong> {plantData.Insects}</p>
        <p><strong>Diseases:</strong> {plantData.Disease}</p>
        <p><strong>Soil Nature:</strong> {plantData["Soil Nature"]}</p>
        <p><strong>Blooming Season:</strong> {plantData["Blooming Season"]}</p>
        <p><strong>Net Cost Prediction:</strong> {plantData["Net Cost Prediction"]}</p>
        <br></br>
      </div>
    ) : (
      <p>No data available. Please search for a plant.</p>
    )}
            </div>
     
            
          </div>
        </div>
      ) : (
        input && <p>Loading plant information...</p>
      )}
      
    </div>
  );
}
