
function loadInputsFromStorage() {
    return new Promise((resolve) => {
        chrome.storage.local.get('urls', function (result) {
            resolve(result.urls || []);
        });
    });
}

function packageToUrl(package){
    const start = 'https://unpkg.com/';
    const end = '/icons.json';
    const url = start + package + end;
    return url;
}

function loadToUpload(load){
    const result = [];
    for (namePackage of load){
        result.push(make_url(namePackage));
    }
    return result;
}

function make_url(namePackage){
    const name = namePackage.name;
    const url = namePackage.url;
    const upload = {
        name: name,
        url: packageToUrl(url)
    }
    return upload;
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
    const upload = loadToUpload(variables);
    const hiddenDiv = document.getElementById("extension-data");
    hiddenDiv.textContent = JSON.stringify(upload);
}

// Ejecutar la función principal
injectData();

