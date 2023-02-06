const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userSchema = new Schema(
  {
    user_name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: () => (this.provider !== "email" ? false : true),
    },
    provider: {
      required: true,
      type: String,
      default: "email",
    },
    facebookId: String,
    gooleId: String,
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    avatar: {
      public_id: { type: String, require: true },
      url: { type: String, require: true },
    },
  },
  { collection: "Users", timestamps: true }
);

// encryption password before save database
userSchema.pre("save", async function (next) {
  try {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    }
  } catch (error) {
    next(error);
  }
});

// compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// access token
userSchema.methods.generateAccessToken = async function () {
  return JWT.sign(
    {
      id: this._id,
      userName: this.user_name,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    }
  );
};

// refresh token
userSchema.methods.generateRefreshToken = async function () {
  return JWT.sign(
    {
      id: this._id,
      userName: this.user_name,
      email: this.email,
      role: this.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRE,
    }
  );
};

userSchema.virtual("fullname").set(function (fullname) {
  this.user_name = fullname;
});

module.exports = model("Users", userSchema);
