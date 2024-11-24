// async function query(data) {
// 	const response = await fetch(
// 		"https://api-inference.huggingface.co/models/XLabs-AI/flux-RealismLora",
// 		{
// 			headers: {
// 				Authorization: "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
// 				"Content-Type": "application/json",
// 			},
// 			method: "POST",
// 			body: JSON.stringify(data),
// 		}
// 	);
// 	const result = await response.blob();
// 	return result;
// }
// query({"inputs": "Astronaut riding a horse"}).then((response) => {
// 	// Use image
// });


async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large-turbo",
		{
			headers: {
				Authorization: "Bearer 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",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}
query({"inputs": "Astronaut riding a horse"}).then((response) => {
	// Use image
});