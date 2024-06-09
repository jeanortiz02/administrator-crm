
let DB;
// Esto es un IiFI
(function () {
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();
        // crearCliente();

        formulario.addEventListener('submit', validarCliente);
    });
    // Funcion para conectar con la base de datos
    

    // Funcion validando formulario 

    function validarCliente(e) {
        // Evita que se reinicie el formulario
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if ( nombre === '' || email === '' || telefono === '' || empresa === '' ) {
            imprimirAlerta('Todos los campos son obligatorios', 'error');

            // No se sigue ejecutando el codigo
            return;
        }

        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()
        }
        
        nuevoCliente(cliente);
    }


    function nuevoCliente(cliente) {
        //Insertando en la base de datos
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStorage = transaction.objectStore('crm');

        objectStorage.add(cliente);

        transaction.onerror = function () {
            // console.log('Hubo un error');
            imprimirAlerta('Correo existente por favor ingresa otro correo', 'error');
        };
        transaction.oncomplete = function () {
            // console.log('Cliente Agregado');
            imprimirAlerta('El cliente se agrego correctamente');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        };
        
    }

    

})();