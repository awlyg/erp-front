import * as CryptoJS from 'crypto-js';

export const CRYPT_KEY = 'jhjH$8888&&fffj1@#@10';

export class LocalStorageHelper {

  constructor() {
  }

  static filters = [
    {module: 'project', filters: {status: 'In Progress', since: '*'}},
    {module: 'task', filters: {status: 'Opened', since: '*'}},
    {module: 'bid', filters: {status: 'In Progress', since: '*'}},
    {module: 'deal', filters: {status: '*', since: '*'}},
    {module: 'order', filters: {status: '*', since: '*'}},
    {module: 'warehouse', filters: {status: '*', since: '*'}},
  ];

  public static setItem(key: string, text: any): void {
    try {
      text = JSON.stringify(text);
      text = CryptoJS.AES.encrypt(text, CRYPT_KEY).toString();
      localStorage.setItem(key, text);
    } catch (error) {
      localStorage.setItem(key, null);
    }
  }

  public static getItem(key: string): any {
    let text;
    try {
      text = localStorage.getItem(key);
      text = CryptoJS.AES.decrypt(text, CRYPT_KEY).toString(CryptoJS.enc.Utf8);
      text = JSON.parse(text);
    } catch (error) {
      text = null;
    }
    return text;
  }

  public static clear() {
    localStorage.clear();
  }

  public static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public static initialiseFilters() {
    this.setItem('filters', JSON.stringify(LocalStorageHelper.filters));
  }

  public static updateFilters(moduleName: string, property: string, value: string) {
    if (property && property !== '') {
      let newFilters = LocalStorageHelper.getItem('filters');

      if (typeof newFilters === 'string') {
        newFilters = JSON.parse(newFilters);
      }

      const item = newFilters.find(element => element.module === moduleName);

      item.filters[property] = value;

      this.setItem('filters', newFilters);
    }
  }

  public static getModuleFilters(moduleName) {
    let filters = LocalStorageHelper.getItem('filters');
    if (typeof filters === 'string') {
      filters = JSON.parse(filters);
    }

    const module = filters.find(element => element.module === moduleName);
    if(module) {
      return module.filters;
    }
    return false;
  }
}
