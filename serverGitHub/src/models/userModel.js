import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,

    // required: [true, "provide firstName"],
  },

  lastName: {
    type: String,
    // required: [true, "provide lastName"],
  },

  email: {
    type: String,
    unique: true,
    // required: [true, "provide email"],
  },

  password: {
    type: String,
    // required: [true, "provide password"],
  },

  passwordConfirm: {
    type: String,
    // required: [true, "provide passwordConfrim"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "the password is not the same",
    },
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  birthDate: {
    type: Date,
    // required: [true, "provide birthDate"],
  },

  age: {
    type: Number,
  },
});

// CRYPTING PASSWORD
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

// COMPARE PASSWORD
userSchema.methods.correctPassword = async function (stored, requested) {
  const correct = await bcrypt.compare(stored, requested);
  return correct;
};

const User = mongoose.model("User", userSchema);

export default User;
