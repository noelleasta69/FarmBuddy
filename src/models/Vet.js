import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';

const vetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  availabilityStatus: {
    type: Boolean,
    default: true
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  associatedFarmers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    default: []
  }],
  consultationFees: {
    type: Number,
    required: true
  },
  refreshToken: {
    type: String,
  },
}, { timestamps: true });


vetSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

vetSchema.methods.generateAccessToken = async function () {
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

vetSchema.methods.isPasswordCorrect = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

vetSchema.methods.generateRefreshToken = async function () {
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

const Vet = mongoose.models.Vet || mongoose.model('Vet', vetSchema);

export default Vet;
