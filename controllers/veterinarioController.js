import Veterinario from '../models/VeterinarioModel.js';
import generarJWT from '../helpers/generarJWT.js';
import generarToken from '../helpers/generarToken.js';
import emailRegistro from '../helpers/emailRegistro.js';
import emailOlvidePassword from '../helpers/emailOlvidePassword.js';

// Registrar usuario
const registrar = async (req, res) => {
     const { email, nombre } = req.body

    // Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({email: email})
    if(existeUsuario){
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({msg: error.message})
    }

    try {
        //Guardar un nuevo veterinario
        const veterinario = new Veterinario(req.body);
        const VeterinarioGuardado = await veterinario.save()


        //Enviar el email
       
        emailRegistro({email, nombre, token: VeterinarioGuardado.token})

        res.json(VeterinarioGuardado)
    } catch (error) {
        console.log(`error: ${error}`)
    }

   
};

//Mostrar Informacion
const perfil = async (req, res) => {
   
    const { veterinario } = req

    res.json( veterinario )
}


//Confirmar usuario con token
const confirmar = async (req, res) => {

    // Estraer el token y buscar en los registros
    const { token } = req.params

    const usuarioConfirmar = await Veterinario.findOne({token: token})
    if(!usuarioConfirmar){
        const error = new Error('Token no valido')
        return res.status(404).json({msg: error.message})
    }

    //Actualizar el registro del token
    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true
        await usuarioConfirmar.save()

        res.json({msg: 'Usuario Confirmado Correctamente'})
    } catch (error) {
        console.log(`error: ${error}`)
    }

}

// validar usuario login
const autenticar = async (req, res) => {
    const { email, password } = req.body;

    //comprobar si el usuario existe
    const usuario = await Veterinario.findOne({email})

    if(!usuario){
        const error = new Error('El usuario no existe')
        return res.status(404).json({msg: error.message})
    }

    //Comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada')
        return res.status(404).json({msg: error.message})
    }

    

    //Revisar el password
    if(await usuario.comprobarPassword(password)){
        //Autenticar
       
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id)


        })
    }else{
         const error = new Error('El Password es incorrecto')
        return res.status(404).json({msg: error.message})
    }

   
}

// Resetear el token y enviarlo
const resetPassword = async (req, res) => {
    const { email } = req.body
    
    const existeVeterinario = await Veterinario.findOne({email})

    if(!existeVeterinario){
        const error = new Error('El usuario no existe')
        return res.status(400).json({msg: error.message})
    }

    try {
        existeVeterinario.token = generarToken()
        await existeVeterinario.save()

        //Enviar Email restablecer contraseña
        emailOlvidePassword({email, nombre: existeVeterinario.nombre, token: existeVeterinario.token})

        res.json({msg: 'Hemos enviado un email con las instrucciones'})
    } catch (error) {
        console.log(`error: ${error}`)
    }
}


// comprobar el nuevo token generado
const comprobarToken = async (req, res) => {
    const { token } = req.params
    
    const tokenValido = await Veterinario.findOne({token})

    if(tokenValido){
        // El token es valido el usuario existe
        res.json({msg: 'Token válido y el usuario existe'})
    }else{
        const error = new Error('Token no valido')
        return res.status(400).json({msg: error.message})
    }
}


const newPassword = async (req, res) => {
    const { token } = req.params  //url
    const { password } = req.body //formulario

    const vaterinario = await Veterinario.findOne({token})
    if(!vaterinario){
        const error = new Error('Token no valido')
        return res.status(400).json({msg: error.message})
    }

    try {
        vaterinario.token = null
        vaterinario.password = password;
        await vaterinario.save()
        res.json({msg: 'Password modificado correctamente'})
    } catch (error) {
        console.log(`error: ${error}`)
    }
}

const actualizarPerfil = async (req, res) => { 
   const veterinario = await Veterinario.findById(req.params.id)
   console.log(veterinario)
   if(!veterinario){
        const error = new Error('Hubo un error')
        return res.status(400).json({msg: error.message})
   }

   const {email} = req.body
   if(veterinario.email !== req.body.email){
    const existeEmail = await Veterinario.findOne({email})
    if(existeEmail){
        const error = new Error('Ese email ya esta en uso')
        return res.status(400).json({msg: error.message})
    }
   }

   try {
   veterinario.nombre = req.body.nombre 
   veterinario.web = req.body.web 
   veterinario.email = req.body.email 
   veterinario.telefono = req.body.telefono 

   const veterinarioActualizado = await veterinario.save()
   res.json(veterinarioActualizado)
    } catch (error) {
        console.log(`error: ${error}`)
    }
}

const actualizarPassword = async (req, res) => {
    //Leer los datos
    const {id} = req.veterinario
    const {pwd_actual, pwd_nuevo} = req.body

    //comprobar que el veterinario existe
    const veterinario = await Veterinario.findById(id)
    console.log(veterinario)
    if(!veterinario){
        const error = new Error('Hubo un error')
        return res.status(400).json({msg: error.message})
    }

    //comprobar su password
    if(await veterinario.comprobarPassword(pwd_actual)){
      //Almacenar el nuevo password

      veterinario.password = pwd_nuevo;
      await veterinario.save()
      res.json({msg: "Password Actualizado Correctamente"})
    }else{
        const error = new Error('El password Actaul es Incorrecto')
        return res.status(400).json({msg: error.message})
    }


    //Almacenar el nuevo password
}


export {
    registrar,
    perfil,
    confirmar, 
    autenticar,
    resetPassword,
    comprobarToken,
    newPassword,
    actualizarPerfil,
    actualizarPassword
}