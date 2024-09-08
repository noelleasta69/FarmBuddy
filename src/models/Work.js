import mongoose from 'mongoose';


const workSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  totalWorkersRequired: {
    type: Number,
    required: true
  },
  totalDays: {
    type: Number,
    required: true
  },
  payPerHour: {
    type: Number,
    required: true
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true
  },
  acceptedWorkers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker'
  }]
});

const Work = mongoose.models.Work || mongoose.model('Work', workSchema);

export default Work;
