/* ---------- Ayuda!! ----------
*    Controladores Events 
*/
//-Importaciones:
const {response, json} =  require('express');
const Event = require('../models/Event');

//-Contenido:
const getEvents = async(req, res = response) => {
    const events = await Event.find().populate('user','name');
    //Response correct
    res.json({
        ok: true,
        events
    })
}

const newEvent = async(req, res = response) => {
    const event = new Event(req.body);
    try { 
        //poner ID user al evento        
        event.user = req.uid;
        //Guardar nuevo evento en DB
        const savedEvent = await event.save();
        //Response correct
        res.status(201).json({
            ok: true,
            event: savedEvent
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'talk with the admin',
        });
    } 
}

const updateEvent = async(req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        //Buscar evento por ID
        const event = await Event.findById( eventId );
        //Validar si el evento existe
        if(!event){
            return res.status(404).json({
                ok: false,
                msg: "Event with that id doesn't exists",
            });
        }
        //Validar si el usuario creo dicho evento
        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: "You don't have the privilege to edit this event",
            });
        }
        //Se guarda los datos del nuevo evento
        const newEvent = {
            ...req.body,
            user: uid
        }
        //Se actualiza en DB
        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, {new: true});
        //Response correct
        res.status(200).json({
            ok: true,
            event: updatedEvent
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'talk with the admin',
        });
    }  
}

const deleteEvent = async(req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        //Buscar evento por ID
        const event = await Event.findById( eventId );
        //Validar si el evento existe
        if(!event){
            return res.status(404).json({
                ok: false,
                msg: "Event with that id doesn't exists",
            });
        }
        //Validar si el usuario creo dicho evento
        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: "You don't have the privilege to delete this event",
            });
        }
        await Event.findByIdAndDelete(eventId);
        //Response correct
        res.status(200).json({
            ok: true
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'talk with the admin',
        });
    }     
}

//-Exportaciones:
module.exports = {
    getEvents,
    newEvent,
    updateEvent,
    deleteEvent
}