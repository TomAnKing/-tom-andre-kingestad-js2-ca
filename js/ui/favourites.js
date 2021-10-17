import { clearStorage, getStorage } from "./storage.js";
import displayMessage from "../components/displayMessage.js";

const favouriteContainer = document.querySelector(".favouriteContainer");
displayFavourites();
function displayFavourites() {
  const articles = getStorage("article");

  favouriteContainer.innerHTML = "";
  if (articles) {
    articles.forEach(function (article) {
      favouriteContainer.innerHTML += `<div class="article">
          <h2>${article.title}</h2>
          <p class="summary"><b>Summary:</b> ${article.summary}</p>
          <p class="author"><b>Author:</b> ${article.author}</p>
          </div> `;
    });
  } else {
    displayMessage("No articles added to favourites", ".favouriteContainer");
  }
}

const clearButton = document.querySelector("button");

clearButton.addEventListener("click", clear);

function clear() {
  clearStorage();
  displayFavourites();
}
