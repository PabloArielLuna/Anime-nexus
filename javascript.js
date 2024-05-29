
document.addEventListener('DOMContentLoaded', () => {
    const carruselInterno = document.getElementById('carrusel-interno');
    const carruselItems = carruselInterno.querySelectorAll('.carrusel-item');
    const botonPrev = document.getElementById('prev');
    const botonSig = document.getElementById('sig');
    let indiceActual = 0;

    function actualizarCarrusel() {
        const anchoItemCarrusel = carruselItems[0].offsetWidth;
        const desplazamiento = -indiceActual * anchoItemCarrusel;
        carruselInterno.style.transform = `translateX(${desplazamiento}px)`;
    }

    botonPrev.addEventListener('click', () => {
        indiceActual = (indiceActual > 0) ? indiceActual - 1 : carruselItems.length - 1;
        actualizarCarrusel();
    });

    botonSig.addEventListener('click', () => {
        indiceActual = (indiceActual < carruselItems.length - 1) ? indiceActual + 1 : 0;
        actualizarCarrusel();
    });

    // Initialize the carousel
    actualizarCarrusel();
});

function alternarMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('mostrar');
}


document.getElementById('form-registro').addEventListener('submit', function(evento) {
    evento.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmarPassword = document.getElementById('confirmarPassword').value;
    const dob = document.getElementById('dob').value;
    const genero = document.querySelector('input[name="genero"]:checked');
    const intereses = document.querySelectorAll('input[name="intereses"]:checked');

    const formDatos = new FormData(evento.target);

    const datos = {};
    formDatos.forEach((valor, clave) => {
        datos[clave] = valor;
    });

    // Validaciones
    if (!validarUsuario(usuario)) {
        alert('El nombre de usuario debe tener al menos 3 caracteres.');
        return;
    }

    if (!validarEmail(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    if (!validarPassword(password)) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    if (password !== confirmarPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    if (!validarDob(dob)) {
        alert('Por favor, ingresa una fecha de nacimiento válida.');
        return;
    }

    if (!genero) {
        alert('Por favor, selecciona tu género.');
        return;
    }

    if (intereses.length === 0) {
        alert('Por favor, selecciona al menos un interés.');
        return;
    }

    alert('Registro exitoso y correo enviado.');
    window.location.href = 'index.html'; // Redirige al usuario después del registro
})

function validarUsuario(usuario) {
    return usuario.length >= 3;
}

function validarEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

function validarPassword(password) {
    return password.length >= 6;
}

function validarDob(dob) {
    const hoy = new Date();
    const fechaNacimiento = new Date(dob);
    return fechaNacimiento < hoy;
}

document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
    const confirmarPasswordInput = document.getElementById('confirmarPassword');
    const botonAlternarPassword = document.getElementById('alternarPassword');
    const botonAlternarConfirmarPassword = document.getElementById('alternarConfirmarPassword');
    const iconoOjo = document.getElementById('icono-ojo');
    const confirmarIconoOjo = document.getElementById('confirmar-icono-ojo');

    botonAlternarPassword.addEventListener('click', function () {
        const tipo = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', tipo);
        iconoOjo.classList.toggle('fa-eye');
        iconoOjo.classList.toggle('fa-eye-slash');
    });

    botonAlternarConfirmarPassword.addEventListener('click', function () {
        const tipo = confirmarPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmarPasswordInput.setAttribute('type', tipo);
        confirmarIconoOjo.classList.toggle('fa-eye');
        confirmarIconoOjo.classList.toggle('fa-eye-slash');
    });
});

/*Comentarios*/
const formComentarios = document.getElementById('form-comentarios');
const inputComentarios = document.getElementById('input-comentarios');
const contenedorComentarios = document.getElementById('contenedor-comentarios');

formComentarios.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const textoComentarios = inputComentarios.value;
    
    if (textoComentarios.trim() !== "") {
        const elementoComentarios = document.createElement('div');
        elementoComentarios.classList.add('comentario');
        elementoComentarios.innerText = textoComentarios;
        contenedorComentarios.appendChild(elementoComentarios);
        inputComentarios.value = ""; // Limpiar el campo de texto
    }
});

