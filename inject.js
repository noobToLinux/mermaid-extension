
function loadInputsFromStorage() {
    return new Promise((resolve) => {
        chrome.storage.local.get('urls', function (result) {
            resolve(result.urls || []);
        });
    });
}

async function injectDataAndScript() {
    // Cargar datos de almacenamiento
    const variables = await loadInputsFromStorage();

    // Inyectar datos en el objeto global `window`
    const hiddenDiv = document.createElement("div");
    hiddenDiv.id = "extension-data";
    hiddenDiv.style.display = "none";
    hiddenDiv.textContent = JSON.stringify(variables);
    document.body.appendChild(hiddenDiv);

    // Inyectar script de contenido
    /*
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("content.js"); // Ruta relativa al archivo de script
    script.type = "module"; // Asegura que se trate como un módulo
    (document.head || document.documentElement).appendChild(script);
    */
}

// Ejecutar la función principal
injectDataAndScript();