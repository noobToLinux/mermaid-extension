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
    return data;
}

mermaid.registerIconPacks(
    loadInputs().map(UrlsToRegisterObject)
)