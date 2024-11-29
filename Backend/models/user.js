const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String,  },
  email: { type: String,   },
  password: { type: String, },
  role: {
    type: String,
    default: 'user',  
  },
  address: [
    {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    }
  ],
  
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  

  try {
      const salt = await bcrypt.genSalt(10); 
      this.password = await bcrypt.hash(this.password, salt);  
      next();
  } catch (error) {
      next(error);
  }
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);  
};


module.exports = mongoose.model('User', UserSchema);