

(function () {
    let DB;
    let idCliente;

    
    // Variables de los inputs
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');
    
    const formulario = document.querySelector('#formulario');
    
    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();
        
        // Actualiza el registro
        formulario.addEventListener('submit', actualizarCliente);

        // Verificar el ID de la URL
        const parametrosUrl = new URLSearchParams(window.location.search);
        idCliente = parametrosUrl.get('id');
        
        if(idCliente) {
            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 100);
        }
    })

    function actualizarCliente (e) {
        e.preventDefault();

        if ( nombreInput.value === '' || emailInput.value === '' || telefonoInput.value === '' || empresaInput.value === '') {
                imprimirAlerta('Todos los campos obligatorios', 'error');

            return;
        }

        // Actualizar cliente 
        const clienteActualizado = {
            nombre : nombreInput.value,
            email : emailInput.value,
            telefono : telefonoInput.value,
            empresa : empresaInput.value,
            id : Number(idCliente)
        }

        // Inicia la transaccion 
        const transaction = DB.transaction(['crm'], 'readwrite');
        // Selecciona el object store
        const objectStore = transaction.objectStore('crm');
        // Actualiza el registro del objecto store
        objectStore.put(clienteActualizado);
        
        // Si se completa 
        transaction.oncomplete = function () {
            imprimirAlerta('Editado correctamente');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }

        transaction.onerror = function () {
            imprimirAlerta('Hubo un error del sistema', 'error');
        }
    }

    // Funcion de obtener cliente 
    function obtenerCliente(id) {
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStorage = transaction.objectStore('crm');

        // Iterando los objetos del cliente
        const cliente = objectStorage.openCursor()
        cliente.onsuccess = function (e) {
            const cursor = e.target.result;

            if(cursor) {
                if(cursor.value.id === Number(id)) {
                    llenarFormulario(cursor.value);
                }

                cursor.continue();
            }
        }
    }

    // Conectando a la base de datos
    function conectarDB() {
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function () {
            // console.log('Eror al abrir la base de datos');
        };

        abrirConexion.onsuccess = function () {
            // console.log('Base de datos abierta');
            DB = abrirConexion.result;


        }
    }

    // Llenando formulario 
    function llenarFormulario(cursor) {
        const {nombre, email, telefono, empresa, id} = cursor;

        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
        
        
    }

}) ();