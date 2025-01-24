import mermaid from 'CDN/mermaid.esm.mjs';


function UrlsToRegisterObject(UrlOb){
    let name = UrlOb.name;
    let url = UrlOb.url;
    return {
        name: name,
        loader: () => import(url).then((module) => module.icons),
    }
}

function loadInputs() {
    const data = JSON.parse(document.getElementById('extension-data').innerText)
    /*
    data has the shape:
    [
        {
            url: part of url for lazy loading of icons (example: @iconify-json/logos)
            name: 'some name all minus no spaces no numbers, just lower case lyrics'
        }
    ]
    */
    return data;
}

function mermaidRegisterProcess(){
    let inputs = loadInputs();
    if (inputs){
        mermaid.registerIconPacks(
            loadInputs().map(UrlsToRegisterObject)
        )
    }
    return undefined;
}

mermaidRegisterProcess();