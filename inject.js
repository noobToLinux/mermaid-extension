
function loadInputsFromStorage() {
    return new Promise((resolve) => {
        chrome.storage.local.get('urls', function (result) {
            resolve(result.urls || []);
        });
    });
}

async function injectDataAndScript() {
    // Cargar datos de almacenamiento
    const lista = await loadInputsFromStorage();

    let variables = [];
    for (let i = 0; i < lista.length; i++) {
        let {name,url} = lista[i];
        let variable = {
            name:name,
            url: JSON.stringify(await fetch(url).then((res) => res.json()))
        }
        variables.push(variable);
    }

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

function waitSync(milliseconds) {
    const start = Date.now();
    while (Date.now() - start < milliseconds) {
      // Bucle vacío para bloquear el tiempo
    }
}

//Pause to force load before the rest of the app
waitSync(200);