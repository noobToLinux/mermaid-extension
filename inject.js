
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
    document.documentElement.appendChild(hiddenDiv);
}

async function injectData() {
    // Cargar datos de almacenamiento
    injectDefaultDiv();
    const variables = await loadInputsFromStorage();
    const hiddenDiv = document.getElementById("extension-data");
    hiddenDiv.textContent = JSON.stringify(variables);
}

// Ejecutar la función principal
injectData();

