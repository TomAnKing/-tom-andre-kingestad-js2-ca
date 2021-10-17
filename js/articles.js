import { saveArticle } from "./ui/storage.js";
import displayMessage from "./components/displayMessage.js";
import { baseUrl } from "./settings/api.js";

const articleContainer = document.querySelector(".articleContainer");

const search = document.querySelector(".search");

async function getArticles() {
  const url = baseUrl + "articles";
  try {
    const response = await fetch(url);

    const json = await response.json();

    const articles = json;
    displayArticles(articles);
    searchArticle(articles);
  } catch (error) {
    displayMessage("Failed to load articles", ".articleContainer");
  }
}

getArticles();

function displayArticles(articles) {
  articleContainer.innerHTML = "";

  articles.forEach(function (article) {
    articleContainer.innerHTML += `<div class="article">
                                        <h2>${article.title}</h2>
                                           <p class="summary"><b>Summary:</b> ${article.summary}</p>
                                           <p class="author"><b>Author:</b> ${article.author}</p>
                                           <i class="far fa-heart" data-item="${article.id}"></i>
                                    </div> `;
  });
  const hearts = document.querySelectorAll("i");

  hearts.forEach(function (heart) {
    heart.addEventListener("click", function () {
      addToFavourite(articles);
    });
  });
}

function searchArticle(articles) {
  search.onkeyup = function () {
    const searchValue = event.target.value.toLowerCase();

    const filteredArticles = articles.filter(function (article) {
      if (article.title.toLowerCase().startsWith(searchValue)) {
        return true;
      }
    });

    if (searchValue) {
      displayArticles(filteredArticles);
    } else {
      displayArticles(articles);
    }
  };
}

function addToFavourite(articles) {
  const favourite = articles.find(function (article) {
    if (article.id === parseInt(event.target.dataset.item)) {
      return true;
    }
  });
  saveArticle(favourite);
}
