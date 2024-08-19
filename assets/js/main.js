document.addEventListener('DOMContentLoaded', () => {

    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const emailInput = document.getElementById('email');
    const motivoInput = document.getElementById('motivo');
    const mensajeInput = document.getElementById('mensaje');
    const submitBtn = document.getElementById('submitbtn');

    const searchInput = document.getElementById('searchInput'); // Input para búsqueda de email
    const searchButton = document.getElementById('searchButton'); // Botón para búsqueda de email

    const searchInput2 = document.getElementById('searchInput2'); // Input para búsqueda de nombre y apellido
    const searchButton2 = document.getElementById('searchButton2'); // Botón para búsqueda de nombre y apellido

    const tablaContainer = document.getElementById('tablaContainer');

    const usuarios = [];

    // Función para manejar el evento del click en el botón de envío
    const handleSubmit = (event) => {
        event.preventDefault();

        const nombre = nombreInput.value.trim();
        const apellido = apellidoInput.value.trim();
        const email = emailInput.value.trim();
        const motivo = motivoInput.value.trim();
        const mensaje = mensajeInput.value.trim();

        alert(`De: ${nombre} ${apellido} ${email}
            ASUNTO: ${motivo} 
            MENSAJE: 
            ${mensaje}`);

        // Agregar usuario al array
        usuarios.push({ nombre, apellido, email, motivo, mensaje });

        // Mostrar la tabla si está oculta
        if (tablaContainer.style.display === "none") {
            tablaContainer.style.display = "block";
        }

        // Actualizar la tabla con los usuarios
        const actualizarTabla = () => {
            const tablaUsuarios = document.getElementById('tablaUsuarios');
            tablaUsuarios.innerHTML = '';
            usuarios.forEach((usuario) => {
                let row = tablaUsuarios.insertRow();
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);

                cell1.innerHTML = `${usuario.nombre} ${usuario.apellido}`;
                cell2.innerHTML = usuario.email;
                cell3.innerHTML = usuario.motivo;
                cell4.innerHTML = usuario.mensaje;
            });
        };

        actualizarTabla();

        // Limpiar campos
        nombreInput.value = '';
        apellidoInput.value = '';
        emailInput.value = '';
        motivoInput.value = '';
        mensajeInput.value = '';
    };

    // Función para buscar el índice de un email usando findIndex()
    const buscarIndiceEmail = () => {
        const emailBuscado = searchInput.value.trim().toLowerCase();
        const index = encontrarUsuarioPorEmail(emailBuscado);

        if (index !== -1) {
            alert(`Usuario encontrado: ${usuarios[index].nombre} ${usuarios[index].apellido}`);
        } else {
            alert('Usuario no encontrado');
        }
    };

    const encontrarUsuarioPorEmail = (emailBuscado) => {
        return usuarios.findIndex(usuario => usuario.email.toLowerCase().trim() === emailBuscado);
    };

    // Función para verificar si un usuario está en la lista
    const encontrarUsuario = (nombreBuscado, apellidoBuscado) => {
        return usuarios.some(usuario =>
            usuario.nombre.toLowerCase().trim() === nombreBuscado.toLowerCase().trim() &&
            usuario.apellido.toLowerCase().trim() === apellidoBuscado.toLowerCase().trim()
        );
    };

    // Función para manejar la búsqueda de usuarios
    const verificarUsuarios = () => {
        const [nombreBuscado, apellidoBuscado] = searchInput2.value.trim().split(' ');

        if (nombreBuscado && apellidoBuscado) {
            const estaEnLista = encontrarUsuario(nombreBuscado, apellidoBuscado);

            if (estaEnLista) {
                alert(`El usuario ${nombreBuscado} ${apellidoBuscado} sí se encuentra en la lista.`);
            } else {
                alert(`El usuario ${nombreBuscado} ${apellidoBuscado} no se encuentra en la lista.`);
            }
        } else {
            alert('Por favor, ingrese el nombre y apellido separados por un espacio.');
        }
    };

    // Asignar las funciones de los eventos
    submitBtn.addEventListener('click', handleSubmit);
    searchButton.addEventListener('click', buscarIndiceEmail);
    searchButton2.addEventListener('click', verificarUsuarios);

});
