import mermaid from 'CDN/mermaid.esm.mjs';
mermaid.registerIconPacks([
    {
        name: 'logos',
        loader: () =>
        fetch('https://unpkg.com/@iconify-json/logos@1/icons.json').then((res) => res.json()),
    },
]);


function UrlsToRegisterObject(UrlOb){
    let name = UrlOb.name;
    let url = UrlOb.url;
    return {
        name: name,
        loader: () => fetch(url).then((res) => res.json()),
    }
}

function loadInputsFromStorage() {
    // Recuperamos los datos de chrome.storage.local
    chrome.storage.local.get('urls', function (result) {
        if (result.urls) {return result.urls;}
    });
}

mermaid.registerIconPacks(
    loadInputsFromStorage().map(UrlsToRegisterObject)
)