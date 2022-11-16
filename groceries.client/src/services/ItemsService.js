import { AppState } from "../AppState";
import { Item } from "../models/Item";
import { api } from "./AxiosService";

function _findItem(itemId) {
  let item = AppState.items.find(i => i.id === itemId)
  if (!item) {
    item = AppState.itemsHistorical.find(i => i.id === itemId)
    if (!item) {
      throw new Error("Cannot find that item to edit.  Probably a bad ID.")
    }
  }
  return item
}

class ItemsService {
  async getItemsInUse() {
    const res = await api.get("api/items", { params: { inUse: true } });
    AppState.items = res.data.map(data => new Item(data));
  }

  async getItemsHistorical() {
    const res = await api.get("api/items", { params: { inUse: false } });
    AppState.itemsHistorical = res.data.map(data => new Item(data));
  }

  async addItem(name) {
    const res = await api.post("api/items", { name: name })
    AppState.items.push(new Item(res.data))
  }

  setActiveItem(item) {
    AppState.activeItem = item;
  }

  async editItem(name, itemId) {
    console.log("edit from client service")
    let item = _findItem(itemId)
    const res = await api.put(`api/items/${itemId}`, { name: name })
    const itemIndex = AppState.items.indexOf(item)
    AppState.activeItem = new Item(res.data)
    AppState.items.splice(itemIndex, 1, AppState.activeItem)
    if (itemIndex < 0) {
      const newItemIndex = AppState.itemsHistorical.find(item)
      AppState.itemsHistorical.splice(newItemIndex, 1, AppState.activeItem)
    }
  }

  async toggleInUse(itemId) {
    let item = _findItem(itemId)
    const res = await api.put(`api/items/${itemId}/toggleInUse`)
    const updatedItem = new Item(res.data)

    if (updatedItem.inUse) {
      AppState.activeItem = updatedItem
      AppState.items.push(updatedItem)
      AppState.itemsHistorical = AppState.itemsHistorical.filter(i => i.id === item.id)
    } else {
      AppState.activeItem = null
      AppState.items = AppState.items.filter(i => i !== item)
      AppState.itemsHistorical.push(updatedItem)
    }
  }

  async deleteItem(itemId) {
    let item = _findItem(itemId)
    await api.delete(`api/items/${itemId}`)
    AppState.activeItem = null
    AppState.items = AppState.items.filter(i => i !== item)
    AppState.itemsHistorical = AppState.itemsHistorical.filter(i => i.id !== item.id)
  }
}

export const itemsService = new ItemsService();