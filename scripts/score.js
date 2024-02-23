var swiper = new Swiper(".swiper", {
  slidesPerView: 4,
  spaceBetween: 30,
  grabCursor: true,
  keyboard: {
        enabled: false,
      },
  breakpoints: {
        1: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
      },
  centeredSlides: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  }
});

let animes = document.querySelector(".animes"),
    scores = document.querySelector(".scores")

// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
var query = `
query { # La requête ne nécessite aucune variable
  Page {
    media(type: ANIME) { # Récupérer tous les médias de type ANIME
      id
      title {
        romaji
        english
        native
      }
      bannerImage
      averageScore
      description
      coverImage {
        extraLarge
      }
      episodes
      duration
      genres
      reviews {
        edges {
          node {
            id
            summary
            body
            user {
              name
              avatar{
                large
              }
            }
            siteUrl
          }
        }
      }
      studios {
        edges {
          node {
            id
            name
          }
        }
      }
      trailer {
        site
        thumbnail
      }
    }
  }
}
`;


// Définir les variables de la requête (dans ce cas, aucun besoin de spécifier un média spécifique)
var variables = {};

// Définir la configuration requise pour la demande API
var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

function displayAnime(){
fetch(url, options)
  .then(response => response.json())
  .then(data => {
    const mediaList = data.data;
    // Afficher les médias dans la console
    console.log(mediaList);

    for (let i = 0; i < mediaList.Page.media.length; i++) {
      const animeTitle = mediaList.Page.media[i].title.english ?? mediaList.Page.media[i].title.romaji;
    
      if (mediaList.Page.media[i].averageScore >= 75) {
        document.querySelector(".five_stars").innerHTML +=  `
        <div class="swiper-slide">
          <div class="slide">
            <img src="${mediaList.Page.media[i].coverImage.extraLarge}" alt="">
            <h1>${animeTitle}</h1>
            <p>Avis positif ${mediaList.Page.media[i].averageScore}%</p>
        </div>
      </div>
    `;
      } else if (mediaList.Page.media[i].averageScore >= 65) {
        document.querySelector(".four_stars").innerHTML += `
            <div class="swiper-slide">
              <div class="slide">
                <img src="${mediaList.Page.media[i].coverImage.extraLarge}" alt="">
                <h1>${animeTitle}</h1>
                <p>Avis positif ${mediaList.Page.media[i].averageScore}%</p>
            </div>
          </div>
        `;
      } else if (mediaList.Page.media[i].averageScore >= 50) {
        document.querySelector(".three_stars").innerHTML += `
            <div class="swiper-slide">
              <div class="slide">
                <img src="${mediaList.Page.media[i].coverImage.extraLarge}" alt="">
                <h1>${animeTitle}</h1>
                <p>Avis positif ${mediaList.Page.media[i].averageScore}%</p>
            </div>
          </div>
        `;
      } else {
        animes.innerHTML += ``;
      }
    }
    
  })
  .catch(error => {console.log("Erreur lors de la récup des données :", error)});
}
displayAnime()

scores.addEventListener('click', function(e) {
  if (e.target.hasAttribute('data-score')) {
    displayAnime(e.target.getAttribute('data-score'))
    if (e.target.parentElement.querySelector(".active")) {
        e.target.parentElement.querySelector(".active").classList.remove("active")
    } 
    e.target.classList.add("active")
  }
})