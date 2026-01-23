import mongoose from "mongoose";

const magicLinkSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User"},
    email: {type: String, required:true},
    tokenHash: { type: String, required: true, index: true },
    expiresAt: { type: Date, required: true },
    usedAt: { type: Date, default: null },
},
{ timestamps: true }
)

magicLinkSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);


export const MagicLink = mongoose.model("MagicLink", magicLinkSchema);