/*
ACTIVIDAD 3: 📂 UD3/act03/

Construye un formulario de registro con los siguientes campos:

- Nombre de usuario: Requerido, entre 5 y 20 caracteres, sólo letras y números.
- Contraseña: Requerido, entre 8 y 20 caracteres, al menos una letra mayúscula,
    una minúscula y un número.
- Repetir contraseña: Requerido, debe ser igual a la contraseña.
- E-mail: Requerido, debe ser un e-mail válido.
- Código postal. Debe ser un código postal válido.
- Fecha de nacimiento: Debe ser una fecha válida.
- Acepto las condiciones: Requerido, checkbox que debe estar marcado.
- Enviar. Botón que envía el formulario si es válido.

Valida el formulario usando la API de validación de formularios de HTML5 y
personaliza los mensajes de error.
*/

const form = document.forms[0]

const username = document.getElementById('name')
const pass1 = document.getElementById('password')
const pass2 = document.getElementById('password-repeat')
const email = document.getElementById('email')
const cp = document.getElementById('cp')
const birthday = document.getElementById('birthday')
const terms = document.getElementById('terms')

const nameError = document.querySelector('#name + span.error');
const pass1Error = document.querySelector('#password + span.error');
const pass2Error = document.querySelector('#password-repeat + span.error');
const emailError = document.querySelector('#email + span.error');
const cpError = document.querySelector('#cp + span.error');
const bdError = document.querySelector('#birthday + span.error');
const termsError = document.querySelector('label[for="terms"] + span.error');

pass2.addEventListener('change', () => {
    if (pass1.value !== pass2.value) {
        pass2.setCustomValidity('Las contraseñas no coinciden')
    }
    else {
        pass2.setCustomValidity('')
    }
})

form.addEventListener('submit', (e) => {
    if (! form.checkValidity() ) {
        e.preventDefault()
    }

    nameError.textContent = username.validationMessage
    pass1Error.textContent = pass1.validationMessage
    pass2Error.textContent = pass2.validationMessage
    emailError.textContent = email.validationMessage
    cpError.textContent = cp.validationMessage
    bdError.textContent = birthday.validationMessage
    termsError.textContent = terms.validationMessage
})
