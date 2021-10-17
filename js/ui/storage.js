const tokenKey = "token";
const articleKey = "article";

export function saveArticle(user) {
  saveToStorage(articleKey, user);
}

let items = [];

function saveToStorage(key, value) {
  items.push(value);
  localStorage.setItem(key, JSON.stringify(items));
}

export function clearStorage() {
  localStorage.clear();
}

export function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
