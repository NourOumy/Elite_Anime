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
    for (let i = 0; i < mediaList.Page.media.length; i++){
      
        if(mediaList.Page.media[i].averageScore > 80){
          animes.innerHTML += 
        `
        <div class="showAnime">
          <div class="swiper-slide">
            <img src="${mediaList.Page.media[i].coverImage.extraLarge}" alt="">
            <h1>${mediaList.Page.media[i].title.english}</h1>
            <p>Avis positif ${mediaList.Page.media[i].averageScore}%</p>
          </div>
        </div>
        `
        } else if (mediaList.Page.media[i].averageScore > 70){
          animes.innerHTML += 
          `
          <div class="showAnime">
          <div class="swiper-slide">
            <img src="${mediaList.Page.media[i].coverImage.extraLarge}" alt="">
            <h1>${mediaList.Page.media[i].title.english}</h1>
            <p>Avis positif ${mediaList.Page.media[i].averageScore}%</p>
          </div>
        </div>
          `
        } else if (mediaList.Page.media[i].averageScore >= 60){
          animes.innerHTML += 
          `
          <div class="showAnime">
          <div class="swiper-slide">
            <img src="${mediaList.Page.media[i].coverImage.extraLarge}" alt="">
            <h1>${mediaList.Page.media[i].title.english}</h1>
            <p>Avis positif ${mediaList.Page.media[i].averageScore}%</p>
          </div>
        </div>
          `
        } else {
          animes.innerHTML += 
          `
          <div class="showAnime">
          <div class="swiper-slide">
            <img src="${mediaList.Page.media[i].coverImage.extraLarge}" alt="">
            <h1>${mediaList.Page.media[i].title.english}</h1>
            <p>Avis positif ${mediaList.Page.media[i].averageScore}%</p>
          </div>
        </div>
          `
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

// if(mediaList.Page.media[i].title.english == null){
//   animes.innerHTML += 
//     `
//     <div class="showAnime">
//     <div class="swiper-slide">
//       <img src="${mediaList.Page.media[i].coverImage.extraLarge}" alt="">
//       <h1>${mediaList.Page.media[i].title.romaji}</h1>
//       <p>Avis positif ${mediaList.Page.media[i].averageScore}%</p>
//     </div>
//   </div>
//     `}