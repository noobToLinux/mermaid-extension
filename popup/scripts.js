


function check_url(text){
    const regex = /^https:\/\/unpkg\.com\/@iconify-json\/.*\.json$/;
    return regex.test(text);
}

function check_name(text){
    const regex = /^[A-Za-z]+$/
    return regex.test(text);
}

let row_counter = 1;

function add_row(name='',value='') {
    // Seleccionar el div específico antes del cual se insertará el nuevo div
    const targetDiv = document.getElementById("add-url-element");

    if (!targetDiv) {
        console.error(`No se encontró un elemento con id ${targetDivId}`);
        return;
    }

    row_counter++

    // Seleccionar el div padre del elemento objetivo
    const parentDiv = targetDiv.parentNode;

    // Crear el nuevo div
    const newDiv = document.createElement("div");
    newDiv.className = "url-element";
    newDiv.id = `url-element-${row_counter}`; // Generar un id único usando la marca de tiempo

    // Crear y añadir el span
    const span_0 = document.createElement("span");
    span_0.textContent = "Name for icons";
    newDiv.appendChild(span_0);

    // Crear y añadir el input
    const input_0 = document.createElement("input");
    input_0.type = "text";
    input_0.className = "name-input";
    input_0.value = name;
    newDiv.appendChild(input_0);

    // Crear y añadir el span
    const span = document.createElement("span");
    span.textContent = "Url with icons";
    newDiv.appendChild(span);

    // Crear y añadir el input
    const input = document.createElement("input");
    input.type = "text";
    input.className = "url-input";
    input.value = value;
    newDiv.appendChild(input);

    // Crear y añadir el botón
    const button = document.createElement("button");
    button.id = `delete-button-${row_counter}`; // Generar un id único para el botón
    button.textContent = "X";
    newDiv.appendChild(button);

    // Insertar el nuevo div antes del div objetivo
    parentDiv.insertBefore(newDiv, targetDiv);

    return undefined;
}


function saveInputsToStorage() {
    // Seleccionamos todos los inputs con la clase "url-input"
    const inputs = document.querySelectorAll('.url-input');
    const names = document.querySelector('.name-input')

    // Obtenemos los valores de cada input
    const values = [];
    inputs.forEach((input,index) => {
        values.push(
            {
                url:input.value.trim(),
                name:names[index]
            }
        ); // Guardamos el valor del input sin espacios adicionales
    });

    // Guardamos los valores en chrome.storage.local
    chrome.storage.local.set({ urls: values }, function () {
        console.log('Datos guardados correctamente en el almacenamiento local');
    });
}

function loadInputsFromStorage() {
    // Recuperamos los datos de chrome.storage.local
    chrome.storage.local.get('urls', function (result) {
        if (result.urls) {
            result.urls.forEach((input, index) => {
                if (result.urls[index]) {
                    add_row(
                        result.urls[index].name,
                        result.urls[index].url
                    ); // Rellenamos el input con el valor guardado
                }
            });
        }
    });
}