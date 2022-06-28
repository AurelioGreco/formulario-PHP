const formulario = document.getElementById('formulario');
const usuario = document.getElementById('texto-1');
const correo = document.getElementById('texto-2');
const mensaje = document.getElementById('texto-3');
const boton = document.getElementById('boton');
formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    e.stopPropagation()
    const data = new FormData(formulario)
    /* if (!data.get('usuario').trim()) {
        console.log('Sin texto usuario.')
        campoError(usuario)
        return
    } else {
        campoValido(usuario)
    }
    if (!data.get('correo').trim()) {
        console.log('Sin texto correo.')
        campoError(correo)
        return
    } else {
        campoValido(correo)
    }
    if (!data.get('mensaje').trim()) {
        console.log('Sin texto mensaje.')
        campoError(mensaje)
        return
    } else {
        campoValido(mensaje)
    } */
    console.log('Campos comlpletados.')
    fetch('formulario.php', {
            method: 'POST',
            body: data
        })
        .then(res => res.json())
        .then(datos => {
            console.log(datos)
            if (datos.error && datos.campo === 'usuario') {
                campoError(usuario)
                return
            }
            campoValido(usuario)
            if (datos.error && datos.campo === 'correo') {
                campoError(correo)
                return
            }
            campoValido(mensaje)
            if (datos.error && datos.campo === 'mensaje') {
                campoError(mensaje)
                return
            }
            campoValido(mensaje)
            if (!datos.error) {
                limpiaFormulario()
                campoValido(boton)
            }
        })
        .catch(e => console.log(e))
})

const campoError = (campo) => {
    campo.classList.add('is-invalid')
    campo.classList.remove('is-valid')
}
const campoValido = (campo) => {
    campo.classList.remove('is-invalid')
    campo.classList.add('is-valid')
}
const limpiaFormulario = () => {
    console.log('Mensaje enviado con éxito.')
    formulario.reset()
    correo.classList.remove('is-valid')
    mensaje.classList.remove('is-valid')
    usuario.classList.remove('is-valid')
}