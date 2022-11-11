import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from "../utils/Errors"

// Private Methods

/**
 * Creates account if one does not exist
 * @param {any} account
 * @param {any} user
 */
async function createAccountIfNeeded(account, user) {
  if (!account) {
    user._id = user.id
    account = await dbContext.Account.create({
      ...user,
      subs: [user.sub]
    })
  }
  return account
}

/**
 * Adds sub to account if not already on account
 * @param {any} account
 * @param {any} user
 */
async function mergeSubsIfNeeded(account, user) {
  if (!account.subs.includes(user.sub)) {
    // @ts-ignore
    account.subs.push(user.sub)
    await account.save()
  }
}
/**
 * Restricts changes to the body of the account object
 * @param {any} body
 */
function sanitizeBody(body) {
  const writable = {
    name: body.name,
    picture: body.picture
  }
  return writable
}

class AccountService {
  /**
   * Returns a user account from the Auth0 user object
   *
   * Creates user if none exists
   *
   * Adds sub of Auth0 account to account if not currently on account
   * @param {any} user
   */
  async getAccount(user) {
    let account = await dbContext.Account.findOne({
      _id: user.id
    })
    account = await createAccountIfNeeded(account, user)
    await mergeSubsIfNeeded(account, user)
    return account
  }

  /**
   * Updates account with the request body, will only allow changes to editable fields
   *  @param {any} user Auth0 user object
   *  @param {any} body Updates to apply to user object
   */
  async updateAccount(user, body) {
    const update = sanitizeBody(body)
    const account = await dbContext.Account.findOneAndUpdate(
      { _id: user.id },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    return account
  }

  async getUserSettings(userInfo) {
    const settings = await dbContext.Settings.findOne({ accountId: userInfo.id })
    if (!settings) {
      throw new BadRequest("Could not find settings for this user!");
    }
    return settings;
  }

  async createUserSettings(settingsData, userInfo) {
    settingsData.accountId = userInfo.id;
    const settings = await dbContext.Settings.create(settingsData);
    return settings;
  }

  async saveUserSettings(settingsData, userInfo) {
    const settings = await this.getUserSettings(userInfo);

    // @ts-ignore
    if (settings.accountId.toString() !== userInfo.id) {
      throw new Forbidden("You can't change another user's settings.  Be gone!");
    }

    settings.textColor = settingsData.textColor || settings.textColor;
    settings.bgColor = settingsData.bgColor || settings.bgColor;
    settings.theme = settingsData.theme || settings.theme;
    settings.coverImg = settingsData.coverImg || settings.coverImg;

    await settings.save();

    return settings;
  }
}
export const accountService = new AccountService()
