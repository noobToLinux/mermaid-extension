


function check_url(text){
    //Now useless function, here because I don want to edit the rest of the code
    // Always returns true
    let start = 'https://unpkg.com/';
    let end = '.json'
    let condition1 = text.startsWith(start);
    let c2 = text.endsWith(end);
    let c = condition1 && c2;
    return true;
}

function check_name(text){
    //Check if label name is always text and lowercase
    //Returns true or false
    const regex = /^[a-z]+$/
    return regex.test(text);
}

let row_counter = 1;

function remove_row_function_maker(row_number){
    //For each row you add, you create a function to remove such row
    //This returns such function for the specified row.
    //The function that is set to the button.
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
    /*
    This function adds a row.

    If you don't specify the label and value, they will be empty.

    It is used to add the stored values and to add new empty rows.
    */

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
    // This is the div that contains the inputs
    const newDiv = document.createElement("div");
    newDiv.className = "url-element";
    newDiv.id = `url-element-${row_counter}`; // Generar un id único usando la marca de tiempo

    // Crear y añadir el span
    // Just the span for Label
    const span_0 = document.createElement("span");
    span_0.textContent = "Label";
    newDiv.appendChild(span_0);

    // Crear y añadir el input
    // Just the input for the label
    const input_0 = document.createElement("input");
    input_0.type = "text";
    input_0.className = "name-input";
    input_0.id = `name-input-id-${row_counter}`;
    input_0.value = name;
    input_0.addEventListener('input',(event)=>{change_input_style(input_0.id,check_name(event.target.value),true)});
    newDiv.appendChild(input_0);

    // Crear y añadir el span
    // The span for the iconify package
    const span = document.createElement("span");
    span.textContent = "Iconify Package";
    newDiv.appendChild(span);

    // Crear y añadir el input
    // The input for the iconify package
    const input = document.createElement("input");
    input.type = "text";
    input.className = "url-input";
    input.id = `url-input-id-${row_counter}`;
    input.value = value;
    input.addEventListener('input',(event)=>{change_input_style(input.id,check_url(event.target.value),false)});
    newDiv.appendChild(input);

    // Crear y añadir el botón
    // Button that lets you remove such row
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
    // Stores the inputs to the local storage, wether they are empty or not
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
    // Loads what is stored.
    // Loading basically means that adds a row with such values for each store
    // input
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
    //The name says everything
    // Change the style of the input if it is wrong formatted
    // Basically it will change only if the label has anything different from
    // lower case lyrics
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
    //Nothing special, just cause I had plans on doing some steps before.
    add_row();
    return undefined;
}








function add_row_listeners(){
    //Adds the event listener to the add new row button
    // Basically, allows you to add new row by clicking on the button.
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
    //Same as previous function
    //This allows you to save the data when you click on the save button
    let button = document.querySelector('#save-url-button');
    button.addEventListener('click',saveInputsToStorage);
}


//Run the functions for the popup to work
loadInputsFromStorage();
add_row_listeners();
add_save_button_event_listener();