import React, { useEffect } from "react";
import { useImage } from "../context/ImageContext";

export default function PlantImage({ input }) {
  const { imageURL, setImageURL } = useImage(); // State to store image URL
  const token = import.meta.env.VITE_HUG_KEY;

  useEffect(() => {
    async function query(data) {
      try {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large-turbo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error:", errorText);
          throw new Error("API Error: " + errorText);
        }

        const blob = await response.blob(); // Get the Blob response
        const imageUrl = URL.createObjectURL(blob); // Create a URL for the Blob
        setImageURL(imageUrl); // Update the state with the generated image URL
      } catch (error) {
        console.error("Error fetching image:", error); // Log any errors
      }
    }

    if (input) {
      query({ inputs: input }); // Call the query function with input
    }
  }, [input, token, setImageURL]); // Dependencies for useEffect

  return (
    <div className="plant-image">
      {imageURL ? (
        <img src={imageURL} alt="Generated Image" /> // Render the image
      ) : (
        <p>Loading...</p> // Show loading state
      )}
    </div>
  );
}
