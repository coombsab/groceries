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
  sortItems() {
    const checkedItems = AppState.items.filter(i => i.isChecked)
    const uncheckedItems = AppState.items.filter(i => !i.isChecked)

    checkedItems.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    })

    uncheckedItems.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    })

    AppState.items = uncheckedItems.concat(checkedItems)
  }

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
    const item = new Item(res.data)
    AppState.items.push(item)
    return item
  }

  setActiveItem(item) {
    AppState.activeItem = item;
  }

  async editItem(name, itemId) {
    let item = _findItem(itemId)
    const res = await api.put(`api/items/${itemId}`, { name: name })
    const itemIndex = AppState.items.indexOf(item)
    AppState.activeItem = new Item(res.data)
    if (itemIndex >= 0) {
      AppState.items.splice(itemIndex, 1, AppState.activeItem)
    } else {
      const newItemIndex = AppState.itemsHistorical.indexOf(item)
      AppState.itemsHistorical.splice(newItemIndex, 1, AppState.activeItem)
    }
    this.sortItems()
  }

  async toggleChecked(itemId) {
    const res = await api.put(`api/items/${itemId}/check`)
    const item = new Item(res.data)
    const itemIndex = AppState.items.findIndex(i => i.id === item.id)
    AppState.items.splice(itemIndex, 1, item)
    this.sortItems()
  }

  async toggleInUse(itemId) {
    let item = _findItem(itemId)
    const res = await api.put(`api/items/${itemId}/toggleInUse`)
    const updatedItem = new Item(res.data)

    if (updatedItem.inUse) {
      AppState.activeItem = updatedItem
      AppState.items.push(updatedItem)
      AppState.itemsHistorical = AppState.itemsHistorical.filter(i => i.id !== updatedItem.id)
    } else {
      AppState.activeItem = null
      AppState.items = AppState.items.filter(i => i.id !== updatedItem.id)
      const historyIndex = AppState.itemsHistorical.findIndex(i => i.id === updatedItem.id)
      if (historyIndex < 0) {
        AppState.itemsHistorical.push(updatedItem)
      }
    }
  }

  async deleteItem(itemId) {
    let item = _findItem(itemId)
    await api.delete(`api/items/${itemId}`)
    AppState.activeItem = null
    AppState.items = AppState.items.filter(i => i !== item)
    AppState.itemsHistorical = AppState.itemsHistorical.filter(i => i.id !== item.id)
  }

  async removeInUseItems() {
    let itemIds = []
    AppState.items.forEach(i => itemIds.push(i.id))
    const res = await api.put("api/items", { ids: itemIds })
    console.log(res.data)
    AppState.itemsHistorical = [ ...AppState.itemsHistorical, ...AppState.items ]
    AppState.items = []
  } 
}

export const itemsService = new ItemsService();