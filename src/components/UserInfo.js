export class UserInfo {
  constructor(profileName, profileDescription) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
  }
  getUserInfo() {
    this._userInfo = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent
    }
    return this._userInfo
  }
  setUserInfo(nameInput, descriptionInput) {
    this._profileName.textContent = nameInput;
    this._profileDescription.textContent = descriptionInput;
  }
}