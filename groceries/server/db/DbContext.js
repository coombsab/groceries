import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ItemSchema } from '../models/Item'
import { SettingsSchema } from '../models/Settings'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Items = mongoose.model("Item", ItemSchema);
  Settings = mongoose.model("Settings", SettingsSchema);
}

export const dbContext = new DbContext()
