import React, { useState, useEffect } from "react";
import { ChatGroq } from "@langchain/groq";
import { usePlantData } from "../context/PlantDataContext";
import { useAddress } from "../context/AddressContext";
import debounce from "lodash.debounce";


export default function PlantInfo() {
  const {data, setData, error, setError} = usePlantData();
  const {address} = useAddress();
  
  useEffect(() => {
    const llm = new ChatGroq({
      model: "llama-3.1-70b-versatile",
      temperature: 0,
      apiKey: import.meta.env.VITE_GROQ_KEY, // Replace with your API key
    });

    const fetchAIData = debounce(async () => {
      try {
        const aiMsg = await llm.invoke([
          {
            role: "system",
            content: `
              You are a helpful assistant that generates a JSON file based on plant information for a specific region. 
              The JSON structure should include the following main elements:
          
              - region: Name of the region (e.g., 'Thirumangalam, Tamil Nadu, India').
              - region_nature: A description of the region's climate and seasons (e.g., 'Tropical Savanna Climate with three main seasons: Summer, Monsoon, and Winter').
              - plants: A nested object with sub-categories for different plant types:
                - trees: List of trees with 'name' (common name), 'scientific_name' (botanical name), and 'description' (brief characteristics or use).
                - crops: List of crops with 'name', 'scientific_name', and 'description' (focusing on commonly cultivated crops in the region).
                - fruits: List of fruit-bearing plants with 'name', 'scientific_name', and 'description' (highlighting their popularity or unique features in the region).
                - herbs_and_shrubs: List of herbs and shrubs with 'name', 'scientific_name', and 'description' (including medicinal or culinary properties).
                - vegetables: List of vegetable bearing plants with 'name', 'scientific_name', and 'description' (highlighting their food or unique features in the region).
                - flowers: List of flowers with 'name', 'scientific_name', and 'description' (highlighting their fragrance and decorative properties).
          
              Ensure the JSON structure is clear, organized, and valid. Provide no preamble, just the valid JSON response, with no extra symbols like backticks`,
          },
          { role: "user", content: String(address) },
        ]);

        const jsonResponse = JSON.parse(aiMsg.content);
        setData(jsonResponse);
      } catch (err) {
        console.error("Error fetching AI data:", err);
        setError("Failed to fetch or parse data. Please try again.");
      }
    },1000);

    fetchAIData();
    
  }, [address, setData, setError]); // Empty dependency array ensures this runs once when the component mounts
  // Render the content
  // console.log(data)
  return (
    <span></span>
  );
}
