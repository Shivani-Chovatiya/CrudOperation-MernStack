const mongoose = require("mongoose");
//const mongooseErrorHandler = require('mongoose-validation-error-message-handler');
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetToken: String,
    expireToken: Date,
    mobile_no: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    check: { type: String },
    city: { type: String },
    state: { type: String },
    // resetLink: {
    //   data: String,
    //   default: "",
    // },
  },

  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

//middlware for password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
