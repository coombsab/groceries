import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class ItemsService {
  async getItems(query) {
    const items = await dbContext.Items.find({ ...query }).populate("creator", "name picture");

    return items;
  }

  async getItemById(itemId) {
    const item = await dbContext.Items.findById(itemId).populate("creator", "name picture");
    if (!item) {
      throw new BadRequest("Cannot find item; this is likely due to a bad item ID.");
    }
    return item;
  }

  async addItem(itemData, userInfo) {
    itemData.creatorId = userInfo.id;
    const item = await dbContext.Items.create(itemData);

    await item.populate("creator", "name picture");

    return item;
  }

  async toggleInUse(itemId) {
    const item = await this.getItemById(itemId);
    item.inUse = !item.inUse;
    if (!item.inUse) {
      item.isChecked = false;
    }

    await item.save();

    return item;
  }

  async removeInUseItems(body) {
    const updateDocument = [];

    body.ids.forEach(item => {
      const obj = {
        updateOne: {
          filter: {
            "_id": item
          },
          update: {
            $set: {
              "inUse": false
            }
          }
        }
      }
      updateDocument.push(obj);
    });

    const itemsReport = await dbContext.Items.bulkWrite(updateDocument);

    return itemsReport;
  }

  async editItem(itemData, userInfo) {
    const item = await this.getItemById(itemData.id);
    item.creatorId = userInfo.id;
    item.name = itemData.name || item.name;
    item.textColor = itemData.textColor || item.textColor;
    item.bgColor = itemData.bgColor || item.bgColor;

    await item.save();

    const updatedItem = await this.getItemById(item.id);

    return updatedItem;
  }

  async toggleChecked(itemId) {
    const item = await this.getItemById(itemId);
    item.isChecked = !item.isChecked;
    await item.save();
    return item;
  }

  async deleteItem(itemId) {
    const item = await this.getItemById(itemId);

    await item.remove();

    return item;
  }
}

export const itemsService = new ItemsService();