/* ---------- Ayuda!! ----------
*   Modelo de evento en DB
*/
//-Importaciones:
const {Schema, model, trusted} = require('mongoose');

//-Contenido:
const EventSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

EventSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

//-Exportaciones:
module.exports = model('Event', EventSchema);