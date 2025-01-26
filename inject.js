
function loadInputsFromStorage() {
    return new Promise((resolve) => {
        chrome.storage.local.get('urls', function (result) {
            resolve(result.urls || []);
        });
    });
}



function injectDefaultDiv(){
    const hiddenDiv = document.createElement("div");
    hiddenDiv.id = "extension-data";
    hiddenDiv.style.display = "none";
    hiddenDiv.textContent = 'default string for extension check';
    //document.body.appendChild(hiddenDiv);

    (document.body || document.documentElement).appendChild(hiddenDiv);
}

async function injectData() {
    // Cargar datos de almacenamiento
    injectDefaultDiv();
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
    const hiddenDiv = document.getElementById("extension-data");
    hiddenDiv.textContent = JSON.stringify(variables);
}

// Ejecutar la función principal
injectData();

function waitSync(milliseconds) {
    const start = Date.now();
    while (Date.now() - start < milliseconds) {
      // Bucle vacío para bloquear el tiempo
    }
}
