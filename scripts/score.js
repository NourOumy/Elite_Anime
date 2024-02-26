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
    scores = document.querySelector(".scores"),
    wrapper = document.querySelector(".wrapper"),
    swiperWrapper = document.querySelector('.swiper-wrapper')

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

var variables = {};

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
    console.log(mediaList);
    
    wrapper.addEventListener('mouseover', function(event){
      if(event.target.closest('.swiper-slide')) {
        
        const desiredAnime = event.target.closest('.swiper-slide')
        const getAnimeId = desiredAnime.getAttribute('data-id')
        
        const animeTitle = mediaList.Page.media[getAnimeId].title.english ?? mediaList.Page.media[getAnimeId].title.romaji;
        const tippyContent = `
          <div class="swiper-slide">
            <div class="slide" style="background-color: #ffe4c4; color: #483C32" data-index="${getAnimeId}">
              <h1>${animeTitle}</h1>
              <p>${mediaList.Page.media[getAnimeId].genres.slice(0,3)}</p>
              <p>${mediaList.Page.media[getAnimeId].genres.slice(3,6)}</p>
              <p>Avis positif ${mediaList.Page.media[getAnimeId].averageScore}%</p>
              <p>${mediaList.Page.media[getAnimeId].duration} minutes</p>
              <p>${mediaList.Page.media[getAnimeId].episodes} épisodes</p>
            </div>
          </div>
        `;
      
        tippy(desiredAnime, {
          content: tippyContent,
          allowHTML: true,
          animation: "scale",
        })
      }})

    for (let i = 0; i < mediaList.Page.media.length; i++) {

      const animeTitle = mediaList.Page.media[i].title.english ?? mediaList.Page.media[i].title.romaji;

      if (mediaList.Page.media[i].averageScore >= 75) {
        document.querySelector(".five_stars").innerHTML +=  `
        <div class="swiper-slide" data-id="${i}">
          <div class="slide">
            <img src="${mediaList.Page.media[i].coverImage.extraLarge}" alt="">
            <h1>${animeTitle}</h1>
            <p>Avis positif ${mediaList.Page.media[i].averageScore}%</p>
        </div>
      </div>
    `;
      } else if (mediaList.Page.media[i].averageScore >= 65) {
        document.querySelector(".four_stars").innerHTML += `
            <div class="swiper-slide" data-id="${i}">
              <div class="slide">
                <img src="${mediaList.Page.media[i].coverImage.extraLarge}" alt="">
                <h1>${animeTitle}</h1>
                <p>Avis positif ${mediaList.Page.media[i].averageScore}%</p>
            </div>
          </div>
        `;
      } else if (mediaList.Page.media[i].averageScore >= 50) {
        document.querySelector(".three_stars").innerHTML += `
            <div class="swiper-slide" data-id="${i}">
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

document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) { // Affichez le bouton une fois que l'utilisateur a fait défiler vers le bas de 300 pixels
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});