import { Schema } from "mongoose"
import { OBJECT_ID, SCHEMA_OPTIONS } from "../db/DbUtils"

  export const ItemSchema = new Schema ({
    name: { type: String, required: true, maxlength: 50, unique: true, uppercase: true, trim: true },
    creatorId: { type: OBJECT_ID, required: true },
    textColor: { type: String },
    bgColor: { type: String },
    inUse: { type: Boolean, default: true }
  }, SCHEMA_OPTIONS);

  ItemSchema.virtual("creator", {
    localField: "creatorId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
  });