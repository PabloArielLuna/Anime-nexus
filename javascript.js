
document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.getElementById('carousel-inner');
    const carouselItems = carouselInner.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentIndex = 0;

    function updateCarousel() {
        const carouselItemWidth = carouselItems[0].offsetWidth;
        const offset = -currentIndex * carouselItemWidth;
        carouselInner.style.transform = `translateX(${offset}px)`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    // Initialize the carousel
    updateCarousel();
});

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
}


document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const dob = document.getElementById('dob').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const interests = document.querySelectorAll('input[name="interests"]:checked');

    const formData = new FormData(event.target);

    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Validaciones
    if (!validateUsername(username)) {
        alert('El nombre de usuario debe tener al menos 3 caracteres.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    if (!validatePassword(password)) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    if (!validateDob(dob)) {
        alert('Por favor, ingresa una fecha de nacimiento válida.');
        return;
    }

    if (!gender) {
        alert('Por favor, selecciona tu género.');
        return;
    }

    if (interests.length === 0) {
        alert('Por favor, selecciona al menos un interés.');
        return;
    }

    alert('Registro exitoso y correo enviado.');
    window.location.href = 'index.html'; // Redirige al usuario después del registro
})

function validateUsername(username) {
    return username.length >= 3;
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateDob(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    return birthDate < today;
}

document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePasswordButton = document.getElementById('togglePassword');
    const toggleConfirmPasswordButton = document.getElementById('toggleConfirmPassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const eyeIconConfirm = document.getElementById('eyeIconConfirm');

    togglePasswordButton.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        eyeIcon.classList.toggle('fa-eye');
        eyeIcon.classList.toggle('fa-eye-slash');
    });

    toggleConfirmPasswordButton.addEventListener('click', function () {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        eyeIconConfirm.classList.toggle('fa-eye');
        eyeIconConfirm.classList.toggle('fa-eye-slash');
    });
});

/*Comentarios*/
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsContainer = document.getElementById('comments-container');

commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const commentText = commentInput.value;
    
    if (commentText.trim() !== "") {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerText = commentText;
        commentsContainer.appendChild(commentElement);
        commentInput.value = ""; // Limpiar el campo de texto
    }
});

