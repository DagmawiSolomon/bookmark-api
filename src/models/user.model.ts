import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: { type: String, required: false, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => /^\S+@\S+\.\S+$/.test(v),
      message: (props: any) => `${props.value} is not a valid email!`,
    },
  },
});


