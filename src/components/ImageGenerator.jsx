import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";

export default function ImageGenerator({ input }) {
  const [imageurl, setImageurl] = useState(null);
  const token = import.meta.env.VITE_HUG_KEY;

  const generateImage = debounce(async (data) => {
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
        throw new Error("API error: " + (await response.text()));
      }
    } catch (error) {
      console.error("Error generating image:", error);
      throw error;
    }
  }, 1000);

  useEffect(() => {
    if (!input) return;

    const fetchImage = async () => {
      try {
        const imageBlob = await generateImage({ inputs: input });
          const url = URL.createObjectURL(imageBlob);
          setImageurl(url); // Set image URL in state
      } catch (error) {
        console.error("Error during image fetch:", error);
      }
    };

    fetchImage(); // Call function to fetch image

  }, [input]);

  return (
    <div className="plant-image">
      {imageurl ? (
        <img id="imageElement" src={imageurl} alt="Generated" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
}
