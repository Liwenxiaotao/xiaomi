const STORAGE_KEY = 'mail';

export default {
  set(key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  },
  setItem(key, value, moduleName) {
    if (moduleName) {
      let val =  this.getItem(moduleName)
      val[key] = value;
      this.setItem(moduleName, val);
    } else {
      let val = this.getStorage();
      val[key] = value;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }
  },
  getItem(key, moduleName) {
    if (moduleName) {
      let val = this.getStorage(moduleName);
      if (val) return val[key];
    }
    return  this.getStorage()[key];
  },
  getStorage() {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
  },
  clear(key, moduleName) {
    let val = this.getStorage();
    if (moduleName) {
      delete val[moduleName][key];
    } else {
      delete val[key];
    }
    this.set(STORAGE_KEY, val);
  }
}