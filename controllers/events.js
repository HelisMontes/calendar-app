const Events = require('../models/Events');

const getEvents = async(req, res) => {
 try {
  const listEvents = await Events
    .find()
    .populate('user_id', 'name');
  
  return res.status(201).json({
    ok: true,
    events: listEvents 
  });
   
 } catch (error) {
  console.log(error)
  return res.status(500).json({
    ok: true,
    msg: 'Por favor comunicarse con el administrador'
  });
 }
}
const createEvent = async(req, res) => {
  //console.log(req.body)
  const events = new Events(req.body);
  try {
    const eventSave = await events.save();
    return res.status(201).json({
      ok: true,
      event: eventSave
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: true,
      msg: 'Por favor comunicarse con el administrador'
    });
  }
}
const updateEvent = async(req, res) =>{
  const user_id = req.body.user_id;
  const eventId = req.params.id;
  try {
    const event = await Events.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: true,
        msg: 'Este evento no existe'
      });
    }
    if(event.user_id.toString() !== user_id){
      return res.status(401).json({
        ok: true,
        msg: 'No cuenta con los privilegios para realizar esta acción'
      });
    }
    const eventUpdated = {
      ...req.body,
      user_id
    }
    const updated = await Events.findByIdAndUpdate(eventId, eventUpdated, {new: true});
    return res.status(201).json({
      ok:true,
      event: updated
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: true,
      msg: 'Por favor comunicarse con el administrador'
    });
  }
  
}
const deleteEvent = async(req, res) =>{
  const user_id = req.body.user_id;
  const eventId = req.params.id;
  try {
    const event = await Events.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: true,
        msg: 'Este evento no existe'
      });
    }
    if(event.user_id.toString() !== user_id){
      return res.status(401).json({
        ok: true,
        msg: 'No cuenta con los privilegios para realizar esta acción'
      });
    }
    await Events.findByIdAndDelete(eventId)
    return res.status(201).json({
      ok:true,
      msg: 'Accion realizada exitosamente'
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: true,
      msg: 'Por favor comunicarse con el administrador'
    });
  }
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}