import { Schema } from "mongoose";
import { OBJECT_ID, SCHEMA_OPTIONS } from "../db/DbUtils";

export const SettingsSchema = new Schema ({
  accountId: { type: OBJECT_ID, unique: true },
  textColor: { type: String },
  bgColor: { type: String },
  theme: { type: String, enum: ["LIGHT", "DARK"] },
  coverImg: { type: String }

}, SCHEMA_OPTIONS)