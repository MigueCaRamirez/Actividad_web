document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const celular = document.getElementById("celular").value;
    const correo = document.getElementById("correo").value;
    const direccion = document.getElementById("direccion").value;
    const edad = document.getElementById("edad").value;
    const sexo = document.getElementById("sexo").value;
    const imagen = document.getElementById("imagen").files[0];

    // Validar campos vacíos
    if (!nombre || !celular || !correo || !direccion || !edad || !sexo || !imagen) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Crear URL de la imagen
    const reader = new FileReader();
    reader.onload = function(event) {
        const imagenURL = event.target.result;
        const registro = {
            nombre,
            celular,
            correo,
            direccion,
            edad,
            sexo,
            imagen: imagenURL
        };

        // Guardar en LocalStorage
        let registros = JSON.parse(localStorage.getItem("registros")) || [];
        registros.push(registro);
        localStorage.setItem("registros", JSON.stringify(registros));

        // Actualizar tabla
        actualizarTabla();

        // Limpiar formulario
        document.getElementById("registroForm").reset();
    };
    reader.readAsDataURL(imagen);
});

function actualizarTabla() {
    const registros = JSON.parse(localStorage.getItem("registros")) || [];
    const tabla = document.getElementById("tablaDatos");
    tabla.innerHTML = "";

    registros.forEach((registro, index) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${registro.nombre}</td>
            <td>${registro.celular}</td>
            <td>${registro.correo}</td>
            <td>${registro.direccion}</td>
            <td>${registro.edad}</td>
            <td>${registro.sexo}</td>
            <td><img src="${registro.imagen}" alt="Imagen" class="img-thumbnail" style="width: 60px; height: 60px; object-fit: cover;"></td>
            <td><button class="btn btn-danger btn-sm" onclick="eliminarRegistro(${index})">Eliminar</button></td>
        `;
        tabla.appendChild(fila);
    });
}

function eliminarRegistro(index) {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros.splice(index, 1);  // Eliminar registro por índice
    localStorage.setItem("registros", JSON.stringify(registros));
    actualizarTabla();  // Actualizar tabla
}

// Cargar datos al iniciar
window.onload = actualizarTabla;
