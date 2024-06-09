

function conectarDB () {

    const abrirConexion = window.indexedDB.open('crm', 1);

    abrirConexion.onerror = function () {
        console.log('Hubo un error con la conexion a la base de datos');
    }

    abrirConexion.onsuccess = function () {
        DB = abrirConexion.result;
        // console.log('Todo va bien');
    }
}

function imprimirAlerta (mensaje, tipo) {

    const alerta = document.querySelector('.alerta');

    if (!alerta) {

        const div = document.createElement('div');
        div.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'alerta' , 'border' );

        if (tipo === 'error') {
            div.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
        } else {
            div.classList.add('bg-green-100','border-green-400', 'text-green-700' )
        }

        div.textContent = mensaje;

        formulario.appendChild(div);

        setTimeout(() => {
            div.remove();
        }, 3000);
    }
}