import Paciente from './../models/PacienteModel.js';


const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id
    try { 
       const pacienteGuardado = await paciente.save()
       res.json(pacienteGuardado)      
    } catch (error) {
        console.log(`error: ${error}`)
    }
}

const obtenerPacientes = async (req, res) => {

    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);
    res.json(pacientes)
}

const obtenerPaciente = async (req, res) => { 
    //Vefiricar que el veteriaio que lo creo hagos los cambios
    const { id } = req.params
    const paciente = await Paciente.findById(id)
    
    if(!paciente){
        res.status(404).json({msg: 'No Encontrado'})
    }


    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: 'Accion no válidad'})
    }

    
    res.json(paciente)
    
}

const actualizarPaciente = async (req, res) => { 

    //Vefiricar que el veteriaio que lo creo hagos los cambios
    const { id } = req.params
    const paciente = await Paciente.findById(id)
    

    if(!paciente){
        res.status(404).json({msg: 'No Encontrado'})
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: 'Accion no válidad'})
    }

    //Actualizar Paciente
    paciente.nombre = req.body.nombre || paciente.nombre
    paciente.propietario = req.body.propietario || paciente.propietario
    paciente.email = req.body.email || paciente.email
    paciente.fecha_alta = req.body.fecha || paciente.fecha_alta
    paciente.sintomas = req.body.sintomas || paciente.sintomas

    try {
        const pacienteActualizado = await paciente.save()
        
        res.json(pacienteActualizado)

    } catch (error) {
        console.log(`error: ${error}`)
    }

}


const eliminarPaciente = async (req, res) => { 

    //Vefiricar que el veteriaio que lo creo hagos los cambios
    const { id } = req.params
    const paciente = await Paciente.findById(id)
    

    if(!paciente){
        res.status(404).json({msg: 'No Encontrado'})
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: 'Accion no válidad'})
    }

    try {
       await paciente.deleteOne()
       res.json({msg: 'Paciente Eliminado'})
    } catch (error) {
        console.log(`error: ${error}`)
    }


}


export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente

}