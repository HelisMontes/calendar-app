const { Schema, model } = require('mongoose');

// Schema
const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  }
});
EventSchema.method('toJSON', function () {
  const {__v, _id, ...object} = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Events', EventSchema );