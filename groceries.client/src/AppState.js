import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Item.js').Item} */
  activeItem: null,
  /** @type {import('./models/Item.js').Item[]} */
  items: [],
  /** @type {import('./models/Item.js').Item[]} */
  itemsHistorical: [],
  settings: null,
  /** @type {import('./models/Apod.js').Apod} */
  apod: {},
  inUseList: true,
  buttonText: "List"
})
