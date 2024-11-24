// Load environment variables from .env file
require('dotenv').config();

// Access the FAL_KEY from environment variables
const FAL_KEY = process.env.FAL_KEY;

import { fal } from "@fal-ai/client";


fal.config({
  credentials: FAL_KEY
});


const fetchData = async () => {
  try {
    const result = await fal.subscribe("fal-ai/flux-pro/v1/depth", {
      headers: {
        'Authorization': `Bearer ${FAL_KEY}`, // Use the environment variable for API key
      },
      input: {
        prompt: "A blackhole in space.",
        control_image_url: "https://fal.media/files/penguin/vt-SeIOweN7_oYBsvGO6t.png"
      },
      
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });

    console.log("Request Successful:", result.data);
    console.log("Request ID:", result.requestId);
  } catch (error) {
    console.error("Error fetching data:", error.response ? error.response.data : error.message);
  }
};

// Call the fetchData function
fetchData();
