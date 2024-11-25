import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';

const farmerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken:{
      type: String,
  },
  associatedVets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vet',
    default: []
  }],
  // Define the postedWorks field
  postedWorks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Work', // Reference to the Work model
    default: []  // Default value as an empty array
  }]
}, {timestamps: true});



farmerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

farmerSchema.methods.generateAccessToken = async function(){
  return jwt.sign(
      {
          _id: this._id,
          mobileNumber: this.mobileNumber
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h"
      }
  )
}


farmerSchema.methods.isPasswordCorrect = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


farmerSchema.methods.generateRefreshToken = async function(){
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

const Farmer = mongoose.models.Farmer || mongoose.model('Farmer', farmerSchema);

export default Farmer;
