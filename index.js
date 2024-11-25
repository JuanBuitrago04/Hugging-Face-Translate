    const apiUrl = "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-es";
    const token = "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";

    // Funcion para traducir el texto
    async function translateText(message) {
        try {
            const body = JSON.stringify({
                inputs: message,
            });

            // Realiza la solicitud POST
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: body,
            });

            // Verifica la respuesta
            const result = await response.json();
            
            if (result && result.translation_text) {
                document.getElementById("translatedText").textContent = result.translation_text;
            } else {
                console.error("No se pudo traducir el texto");
                document.getElementById("translatedText").textContent = "Error al traducir.";
            }
        } catch (error) {
            console.error("Error al traducir:", error);
            document.getElementById("translatedText").textContent = "Error al traducir.";
        }
    }

    
    document.getElementById("translateButton").addEventListener("click", () => {
        const message = document.getElementById("message").value;
        if (message.trim() !== "") {
            translateText(message);
        } else {
            console.error("Por favor, ingresa un texto para traducir.");
            document.getElementById("translatedText").textContent = "Por favor, ingresa un texto para traducir.";
        }
    });
