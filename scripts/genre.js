// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
var swiper = new Swiper(".mySwiper", {
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

  // variables d'oliver :

let titre1 = document.querySelector('.unun')
let container1 = document.querySelector('.un')
let container2 = document.querySelector('.deux')
let container3 = document.querySelector('.trois')
let container4 = document.querySelector('.quatre')
let container5 = document.querySelector('.cinq')
let container6 = document.querySelector('.six')

  // variables de nour :
let nav = document.querySelector('nav')
let header = document.querySelector('header')
let allAnime = document.querySelector('.all')
let bouttons = document.querySelector('.button')
let wrapper = document.querySelector('.wrapper')
let genres = document.querySelector('.genres')
let score = document.querySelector('.score')
let nombreDAnimesCharges = 6; // Variable pour suivre le nombre d'animes déjà chargés
let scoretab = []

  // variables ilayda :
  let animes = document.querySelector(".animes"),
  scores = document.querySelector(".scores"),
  swiperWrapper = document.querySelector('.swiper-wrapper')
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

fetch(url, options)
  .then(response => response.json())
  .then(data => {
      
      const mediaList = data.data;

      // Afficher les médias dans la console
      console.log(mediaList);

  //nour début Lazy Loading**************************************************************************************

      function lazyLoading() {
        // pour fermer la boucle, si non boucle sans fin
       const finBoucle = Math.min(nombreDAnimesCharges + 3, mediaList.Page.media.length);

        // Boucle pour tous les médias à partir de nombreDAnimesCharges (que j'ai réglé à 6 dans la variable) jusqu'à endIndex
        for (let i = nombreDAnimesCharges; i < finBoucle; i++) {
        allAnime.innerHTML += `<div class="swiper-slide"><img src="${mediaList.Page.media[i].coverImage.extraLarge}" alt=""><h1>${mediaList.Page.media[i].title.english}</h1></div>`

        
        }

        // Mise à jour de la variable nombreDAnimesCharges pour suivre le nombre total d'animes chargés
        nombreDAnimesCharges += 3;
        }


        window.addEventListener("scroll", function() {
        // Vérifier si l'utilisateur a atteint le bas de la page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // Charger plus d'animes
        lazyLoading()
        }
      })
  //nour fin Lazy Loading***************************************************************************************
  //nour début header**************************************************************************************

        for (let i = 0; i < mediaList.Page.media.length; i++) {
          scoretab.push(mediaList.Page.media[i].averageScore) 
        }
        scoretab.sort((a, b) => b - a)

        let topTrois = scoretab.slice(0,3)
        console.log(topTrois);

        let slidesHeader = ""

        for (let media of mediaList.Page.media) { //parcourt chaque média dans la liste mediaList.Page.media, et à chaque itération de la boucle, elle stocke le média actuel dans la variable media. Cela permet de travailler avec chaque média individuellement dans le reste du code à l'intérieur de la boucle.

          if (topTrois.includes(media.averageScore)) {
            slidesHeader += `
            
            <div class="swiper-slide" style="background: url('${media.bannerImage}') center/cover">
              <div class="left_content">
                <span class="subtitles">${media.title.english}</span>
                <p class="anime_description">${media.description}</p>
                <a href="#" class="play"><i class="fa-solid fa-play"></i>Lecture S1 E1</a><a href="#" class="bookmark"><i class="fa-regular fa-bookmark"></i></a>
              </div>
            </div>
          `
    
          //     header.innerHTML += `
          //     <div class="swiper mySwiper-header">
          //       <div class="swiper-wrapper">
          //         <div class="swiper-slide">
          //           <div class="left_content">
          //             <span class="subtitles">${media.title.english}</span>
          //             <p class="anime_description">${media.description}</p>
          //             <a href="#" class="play"><i class="fa-solid fa-play"></i>Lecture S1 E1</a><a href="#" class="bookmark"><i class="fa-regular fa-bookmark"></i></a>
          //           </div>
          //         </div>
          //       </div>
          //       <div class="swiper-pagination"></div>
          //     </div>`
          // header.querySelector('.swiper-slide').style.background = `url(${media.bannerImage})center/cover`
          }
      }

      header.innerHTML += `
  <div class="swiper mySwiper-header">
    <div class="swiper-wrapper">
      ${slidesHeader}
    </div>
    <div class="swiper-pagination"></div>
  </div>
`

var swiperHeader = new Swiper('.mySwiper-header', {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 2500, 
    disableOnInteraction: false,
  },
});
  //nour fin header***************************************************************************************

  //iloche debut***************************************************************************************

  score.addEventListener('mouseover', function(event){
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



  //iloche fin***************************************************************************************

  //oliver début ***********************************************************************************************

      function searchAnimeBy(genre, container) {
        for (let i = 0; i < mediaList.Page.media.length; i++) {
          
          for (let n = 0; n < mediaList.Page.media[i].genres.length; n++) {
            if (mediaList.Page.media[i].genres[n] == genre) {
              if (mediaList.Page.media[i].title.english == null) {
                container.innerHTML += `<div class="swiper-slide"><img src="${mediaList.Page.media[i].coverImage.extraLarge}" alt=""><h3>${mediaList.Page.media[i].title.romaji}</h3></div>`
               } else if (mediaList.Page.media[i].title.english == "Cowboy Bebop: The Movie - Knockin' on Heaven's Door") {
                container.innerHTML += `<div class="swiper-slide"><img src="${mediaList.Page.media[i].coverImage.extraLarge}" alt=""><h3>Cowboy Bebop: The Movie</h3></div>`
               }
               else if (mediaList.Page.media[i].title.english == "Cowboy Bebop: The Movie - Knockin' on Heaven's Door") {
                container.innerHTML += `<div class="swiper-slide"><img src="${mediaList.Page.media[i].coverImage.extraLarge}" alt=""><h3>Cowboy Bebop: The Movie</h3></div>`
               }
              else {
              container.innerHTML += `<div class="swiper-slide"><img src="${mediaList.Page.media[i].coverImage.extraLarge}" alt=""><h3>${mediaList.Page.media[i].title.english}</h3></div>`
              }
            }
          }
        }
      }

        
      searchAnimeBy("Action", container1)
      searchAnimeBy("Adventure", container2)
      searchAnimeBy("Comedy", container3)
      searchAnimeBy("Horror", container4)
      searchAnimeBy("Drama", container5)
      searchAnimeBy("Romance", container6)
  //oliver fin *************************************************************************************************
  
  })
    .catch(error => {console.log("Erreur lors de la récup des données :", error)});
  

//event 3 boutons classe active

nav.addEventListener("click", function(e){
  // vérifier si l'élément sur lequel on click c'estt bien celui qui nous intéresse
    if(e.target.classList.contains('button')){
        // on vérifie si l'élément clické a la classe active, on le retire. si on met rien dans le if, c'estt d'office true
      if(e.target.classList.contains('active')){
        // si la réponse est true :
        // toggle enlève si elle est là, met si elle n'est pas là
        e.target.classList.toggle('active')
        // si l'élément clické n'a pas la classe active, on l'ajoute'
      } else {
        
      //  maintenant, on doit vérifier si un autre enfant a la classe Active, on doit le retirer
        // Si le parent (wrapper) a un autre enfant (qque celui sur lequel je click) qui a la classe active ... 
        if(nav.querySelector('.active')){
          nav.querySelector('.active').classList.remove('active')
            e.target.classList.add('active')
          
        // Si le parent (wrapper) n'a pas la classe active sur un des enfants on l'ajoutte sur le bttn clické
        } else {
            e.target.classList.toggle('active')
        }
    }
    }

    // event effet btn scores 

    scores.addEventListener('click', function(e) {
      if (e.target.hasAttribute('data-score')) {
        displayAnime(e.target.getAttribute('data-score'))
        if (e.target.parentElement.querySelector(".active")) {
            e.target.parentElement.querySelector(".active").classList.remove("active")
        } 
        e.target.classList.add("active")
      }
    })


// event activation des pages utilisateur 

    if(e.target.hasAttribute('data-categorie')){
      
    const categorie = e.target.getAttribute('data-categorie');
      if (categorie === "genres") {
     genres.style.display = "block"
     score.style.display = "none"
     allAnime.style.display = "none"
    }else if (categorie === "score"){
    score.style.display = "block"
    allAnime.style.display = "none"
    genres.style.display = "none"
    }else{
    allAnime.style.display = "grid"
    genres.style.display = "none"
    score.style.display = "none"


  }
    
  }
})


// event back to top 

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
