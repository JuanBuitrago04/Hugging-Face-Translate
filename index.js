// URL de la API y tu token
const apiUrl = "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-es";
const token = "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";

// Función para traducir texto
async function translateText(text) {
    try {
        // Preparar los datos para enviar
        const data = { inputs: text };

        // Hacer la solicitud a la API
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // Leer la respuesta de la API
        const result = await response.json();

        // Mostrar la traducción
        if (result[0] && result[0].translation_text) {
            document.getElementById("translatedText").textContent = result[0].translation_text;
        } else {
            document.getElementById("translatedText").textContent = "Error al traducir.";
        }
    } catch (error) {
        // Mostrar mensaje de error si algo falla
        console.error("Ocurrió un error:", error);
        document.getElementById("translatedText").textContent = "No se pudo traducir.";
    }
}

// Configurar el botón
document.getElementById("translateButton").addEventListener("click", function () {
    const text = document.getElementById("message").value;

    // Verificar si hay texto para traducir
    if (text.trim() !== "") {
        translateText(text);
    } else {
        document.getElementById("translatedText").textContent = "Por favor, escribe algo.";
    }
});
