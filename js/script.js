const url = "http://localhost:1337/articles";

const articleContainer = document.querySelector(".articleContainer");

const search = document.querySelector(".search");

async function getArticles() {
  try {
    const response = await fetch(url);

    const json = await response.json();

    const articles = json;
    displayArticles(articles);
    searchArticle(articles);
  } catch (error) {
    console.log(error);
  }
}

getArticles();

function displayArticles(articlesToRender) {
  articleContainer.innerHTML = "";

  articlesToRender.forEach(function (article) {
    articleContainer.innerHTML += `<div class="article">
                                        <h2>${article.title}</h2>
                                           <p class="summary"><b>Summary:</b> ${article.summary}</p>
                                           <p class="author"><b>Author:</b> ${article.author}</p>
                                           <i class="far fa-heart"></i>
                                    </div> `;
  });
}

function searchArticle() {
  search.onkeyup = function (articlesToRender) {
    const searchValue = event.target.value.trim().toLoweCase();

    const filteredArticles = articles.filter(function (article) {
      if (article.title.toLoweCase().startsWith(searchValue)) {
        return true;
      }
    });

    articlesToRender = filteredArticles;
  };
}
