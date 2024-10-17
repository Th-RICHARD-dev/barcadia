async function app() {
  let drinks = await fetchDrinks();
  console.log(drinks);

  function buildMenu() {
    const menuButton = document.querySelectorAll('.menu-btn');
    const menu = document.querySelectorAll('.templates-info');
    const menuContent = document.querySelectorAll('.menu-template');
    const template = document.querySelectorAll('.templates');
    const base = document.querySelectorAll('.default');

    for (let i = 0; i < menuButton.length; i++) {
      let button = menuButton[i];
      let menuShow = menu[i];
      let menuContentShow = menuContent[i];
      let templateShow = template[i];
      let baseShow = base[i];

      button.addEventListener('click', function () {
        if (menuShow.style.display === 'block') {
          menuShow.style.display = 'none';
          menuContentShow.style.display = 'none';
          templateShow.style.display = 'block';
          baseShow.style.display = 'grid';
        } else {
          menuShow.style.display = 'block';
          menuContentShow.style.display = 'block';
          templateShow.style.display = 'none';
          baseShow.style.display = 'none';
        }

        window.addEventListener('click', function (event) {
          if (!button.contains(event.target) && !menuShow.contains(event.target)) {
            menuShow.style.display = 'none';
            menuContentShow.style.display = 'none';
            baseShow.style.display = 'grid';
            templateShow.style.display = 'block';
          }
        });
      });
    }
  }

  buildMenu();

  const slideSound = new Audio('sounds/cards_slide.wav')
  slideSound.playbackRate = 1.5;

  function buildSlider() {
    const swiper = new Swiper('.swiper', {
      initialSlide: 3,
      effect: 'cards',
      direction: 'horizontal',
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
    });

    swiper.on('slideChange', function () {
      slideSound.currentTime = 0;
      slideSound.play();
    });

    document.querySelector('.button').addEventListener('click', function () {
      const activeIndex = swiper.realIndex;
      const selectedDrink = drinks[activeIndex];
      localStorage.setItem('selectedDrink', JSON.stringify(selectedDrink));
      window.setTimeout(function () {
        window.location.href = "finish.html";
      }, 500)
    });
  }

  buildSlider();

  async function fetchDrinks() {
    const reponse = await fetch("https://getdrinks-garnuhpsxq-uc.a.run.app/");
    const drinks = await reponse.json();
    console.log(drinks);
    return drinks;
  }

  function buildSliderContent() {
    const titleCard = document.querySelectorAll('.title');
    const drinksImageCard = document.querySelectorAll('.boissons');
    const descCard = document.querySelectorAll('.desc');
    const statsCard = document.querySelectorAll('.stats');
    const contenantCard = document.querySelectorAll('.quant');
    const starsCard = document.querySelectorAll('.stars');
    const creditsCard = document.querySelectorAll('.bottom');

    const ingredientsCard = document.querySelectorAll('.ingredients');

    for (let j = 0; j < drinks.length; j++) {
      titleCard[j].textContent = drinks[j].title;
      drinksImageCard[j].src = drinks[j].image;
      descCard[j].textContent = drinks[j].description;
      statsCard[j].src = drinks[j].type;
      contenantCard[j].textContent = drinks[j].contenant;
      starsCard[j].src = drinks[j].etoiles;
      creditsCard[j].textContent = drinks[j].credit;

      ingredientsCard[j].textContent = drinks[j].ingredients;
    }
  }

  buildSliderContent();

  let c = 0;
  let txt = 'Bienvenue \nau Barcadia, \nquelle sera \nvotre poison ?';
  let speed = 50;
  let infobulle = document.querySelector('.infobulle');

  function characterText() {
    if (c < txt.length) {
      if (infobulle) {
        if (txt.charAt(c) === '\n') {
          infobulle.innerHTML += '<br>';
        } else {
          infobulle.innerHTML += txt.charAt(c);
        }
        c++;
        setTimeout(characterText, speed);
      } else {
        console.error("Element with ID 'infobulle' not found.");
      }
    }
  }

  characterText();

  function soundPlay() {
    const character = document.querySelector('.mascott')
    const talking = new Audio('sounds/talk.mp3')

    character.addEventListener('click', function () {
      talking.currentTime = 0;
      talking.play();
      characterText();
    })
  }

  soundPlay();

  function playAmbient() {
    const music = document.querySelector('#ambientSound');
    
    document.addEventListener('click', () => {
      music.play().catch(error => {
        console.log('Erreur lors de la lecture de la musique:', error);
      });
    });
  }

  playAmbient();
}

app();
