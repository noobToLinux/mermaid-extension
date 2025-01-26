


function check_url(text){
    let start = 'https://unpkg.com/';
    let end = '.json'
    let condition1 = text.startsWith(start);
    let c2 = text.endsWith(end);
    let c = condition1 && c2;
    return c;
}

function check_name(text){
    const regex = /^[a-z]+$/
    return regex.test(text);
}

let row_counter = 1;

function remove_row_function_maker(row_number){
    function remove_row(){
        const divToDelete = document.getElementById(`url-element-${row_number}`); // Selecciona el div
        if (divToDelete) {
            divToDelete.remove(); // Elimina el div y su contenido
        }
        return undefined;
    }
    return remove_row;
};

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
    input_0.id = `name-input-id-${row_counter}`;
    input_0.value = name;
    input_0.addEventListener('input',(event)=>{change_input_style(input_0.id,check_name(event.target.value),true)});
    newDiv.appendChild(input_0);

    // Crear y añadir el span
    const span = document.createElement("span");
    span.textContent = "Url with icons";
    newDiv.appendChild(span);

    // Crear y añadir el input
    const input = document.createElement("input");
    input.type = "text";
    input.className = "url-input";
    input.id = `url-input-id-${row_counter}`;
    input.value = value;
    input.addEventListener('input',(event)=>{change_input_style(input.id,check_url(event.target.value),false)});
    newDiv.appendChild(input);

    // Crear y añadir el botón
    const button = document.createElement("button");
    button.id = `delete-button-${row_counter}`; // Generar un id único para el botón
    button.textContent = "X";
    button.className = 'delete-button'
    button.addEventListener('click',remove_row_function_maker(row_counter));
    newDiv.appendChild(button);

    // Insertar el nuevo div antes del div objetivo
    parentDiv.insertBefore(newDiv, targetDiv);

    return undefined;
}


function saveInputsToStorage() {
    // Seleccionamos todos los inputs con la clase "url-input"
    const inputs = document.querySelectorAll('.url-input');
    const names = document.querySelectorAll('.name-input');

    // Obtenemos los valores de cada input
    const values = [];
    inputs.forEach((input,index) => {
        values.push(
            {
                url:input.value.trim(),
                name:names[index].value.trim()
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




function change_input_style(input_id,right=true,is_name=false){
    let input = document.getElementById(input_id);
    let nuevaClase;

    if (right){
        if (is_name){nuevaClase='name-input';}
        else {nuevaClase = 'url-input';}
    }
    else {nuevaClase = 'url-input-wrong';}

    input.className = nuevaClase;
    return undefined;
}




function add_new_row_process(){
    // AÑADIR PROCESO DE GUARDADO Y AÑADIR NUEVA FILA
    //Lo de guardar lo dejamos para más adelante
    add_row();
    return undefined;
}








function add_row_listeners(){
    let button = document.querySelector('#add-url-button');
    button.addEventListener(
        'keydown',
        function (event){
            if (event.key === 'Enter') {
                // Llama a la función deseada
                add_new_row_process()
            }
        }
    )
    button.addEventListener(
        'click',
        function (event){add_new_row_process()}
    )
    return undefined;
}

function add_save_button_event_listener(){
    let button = document.querySelector('#save-url-button');
    button.addEventListener('click',saveInputsToStorage);
}

loadInputsFromStorage();
add_row_listeners();
add_save_button_event_listener();