
function loadInputsFromStorage() {
    //Name defines what this does
    return new Promise((resolve) => {
        chrome.storage.local.get('urls', function (result) {
            resolve(result.urls || []);
        });
    });
}

function packageToUrl(package){
    //Your input is a npm package, this transform the package into a url
    const start = 'https://unpkg.com/';
    const end = '/icons.json';
    const url = start + package + end;
    return url;
}

function make_url(namePackage){
    /*
    Your inputs are stored as a json of the shape
        {
            name: your_label
            url: your_package
        }
    This returns an input of this shape to a json of the shape:
        {
            name: your_lable
            url: the_url_of_your_package
        }
    */
    const name = namePackage.name;
    const url = namePackage.url;
    const upload = {
        name: name,
        url: packageToUrl(url)
    }
    return upload;
}

function loadToUpload(load){
    //This transform all your inputs in something that the app can read.
    // Basically applys the function make url to your stored inputs.
    //Your values are stored in a list, this apply the same function to each
    //element in the list
    const result = [];
    for (namePackage of load){
        result.push(make_url(namePackage));
    }
    return result;
}


function injectDefaultDiv(){
    //Now it is just a necessary useless step.
    //I did different things before and now I don't want to change the next
    //function in oder to remove this.
    const hiddenDiv = document.createElement("div");
    hiddenDiv.id = "extension-data";
    hiddenDiv.style.display = "none";
    hiddenDiv.textContent = 'default string for extension check';
    document.documentElement.appendChild(hiddenDiv);
}

async function injectData() {
    /*
    Basically injects an html div with your labels and packages into the
    mermaid live editor page.
    */
    injectDefaultDiv();
    const variables = await loadInputsFromStorage();
    const upload = loadToUpload(variables);
    const hiddenDiv = document.getElementById("extension-data");
    hiddenDiv.textContent = JSON.stringify(upload);
}

// Ejecutar la función principal
injectData();

