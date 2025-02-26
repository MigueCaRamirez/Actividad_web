document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const celular = document.getElementById("celular").value;
    const correo = document.getElementById("correo").value;
    const direccion = document.getElementById("direccion").value;
    const edad = document.getElementById("edad").value;
    const sexo = document.getElementById("sexo").value;
    const imagen = document.getElementById("imagen").files[0];
    const color = document.getElementById("color").value;
    const estadoCivil = document.querySelector('input[name="estadoCivil"]:checked')?.value;

   

    if (!nombre || !celular || !correo || !direccion || !edad || !sexo || !imagen || !color || !estadoCivil) {
        alert("Por favor, complete todos los campos.");
        return;
    }

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
            estadoCivil,
            imagen: imagenURL,
            color
        };

        let registros = JSON.parse(localStorage.getItem("registros")) || [];
        registros.push(registro);
        localStorage.setItem("registros", JSON.stringify(registros));

        actualizarTabla();
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
            <td>${registro.estadoCivil}</td>
            <td><img src="${registro.imagen}" alt="Imagen" class="img-thumbnail" style="width: 60px; height: 60px; object-fit: cover;"></td>
            <td><input type="color" value="${registro.color}" disabled></td>
            <td><button class="btn btn-danger btn-sm" onclick="eliminarRegistro(${index})">Eliminar</button></td>
        `;
        tabla.appendChild(fila);
    });
}

function eliminarRegistro(index) {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros.splice(index, 1);
    localStorage.setItem("registros", JSON.stringify(registros));
    actualizarTabla();
}

// Cargar datos al cargar la página
window.onload = actualizarTabla;
