import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true
  },
  availabilityStatus: {
    type: Boolean,
    required: true,
    default: true
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken:{
    type:String,
   },
  acceptedWorks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Work'
  }]
}, {timestamps: true});



workerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

workerSchema.methods.generateAccessToken = async function(){
  return jwt.sign(
      {
          _id: this._id,
          mobileNumber: this.mobileNumber
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}

workerSchema.methods.isPasswordCorrect = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

workerSchema.methods.generateRefreshToken = async function(){
  return jwt.sign(
      {
          _id: this._id
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}

const Worker = mongoose.models.Worker || mongoose.model('Worker', workerSchema);

export default Worker;
