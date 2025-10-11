//массив с проектами
const images = [
  {
    url: "./img/banner_1_admiral.jpg",
    title: "Rostov-on-Don, Admiral",
    city: "Rostov-on-Don<br> LCD admiral",
    area: "81 m2",
    time: "3.5 months",
    cost: "upon request",
  },

  {
    url: "./img/banner_2_thieves.jpg",
    title: "Sochi Thieves",
    city: "Sochi<br> Thieves",
    area: "105 m2",
    time: "4 months",
    cost: "upon request",
  },

  {
    url: "./img/banner_3_patriotic.jpg",
    title: "Rostov-on-Don Patriotic",
    city: "Rostov-on-Don<br> Patriotic",
    area: "93 m2",
    time: "3 months",
    cost: "upon request",
  },
];

//1) СЛАЙДЕР - все что относится к слайдеру реализуем тут
function initSlider() {
  //проверяем, что пришедший с сервера массив с проектами не пустой
  if (!images || !images.length) return;

  //получаем все нужные нам ноды
  const sliderImages = document.querySelector(".slider__images"); //блок куда выводим слайды
  const sliderArrows = document.querySelector(".projects__nav"); //блок со стрелками и точками
  const sliderDots = document.querySelector(".projects__nav-dots"); //блок с точками
  const sliderTitle = document.querySelector(".slider__titles"); //блок с названиями над картинками
  const infoCity = document.querySelector(".projects__description-info-city"); //блок с городом
  const infoArea = document.querySelector(".projects__description-info-area"); //блок с area
  const infoTime = document.querySelector(".projects__description-info-time"); //блок с time

  initImages(); //запускаем ф-ю вывода картинок в html
  initArrows(); //запускаем ф-ю управления стрелками

  //1.1) ВЫВОД КАРТИНОК из массива в html
  function initImages() {
    //обходим массив с проектими:
    //создаем див для отдельной картинки и выводим туда картинку
    images.forEach((image, index) => {
      const imageDiv = `<div class="image n${index} ${
        index === 0 ? "active" : ""
      }" style="background-image:url(${
        images[index].url
      });" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;

      //1.1.1 УПРАВЛЕНИЕ ТОЧКАМИ переключения слайдера
      //аналогично выводу картинок
      const dotsDiv = `<div class="projects__nav-dots-item n${index} ${
        index === 0 ? "dot__active" : ""
      }" data-index="${index}"></div>`;
      sliderDots.innerHTML += dotsDiv;

      //выбираем все точки, обходим массив с точками
      //на каждую точку вешаем слушатель клика
      //по клику запускаем ф-ю переключения слайдера
      //
      sliderDots.querySelectorAll(".projects__nav-dots-item").forEach((dot) => {
        dot.addEventListener("click", function () {
          moveSlider(this.dataset.index);
        });
      });

      //1.1.2 УПРАВЛЕНИЕ ССЫЛКАМИ над слайдером
      //аналогично выводу картинок
      const titlesDiv = `<div class="slider__title n${index} ${
        index === 0 ? "title__active" : ""
      }" data-index="${index}">${images[index].title}</div>`;
      sliderTitle.innerHTML += titlesDiv;

      //выбираем все названяи проектов, обходим массив с названиями
      //на каждое название вешаем слушатель клика
      //по клику запускаем ф-ю переключения слайдера
      sliderTitle.querySelectorAll(".slider__title").forEach((title) => {
        title.addEventListener("click", function () {
          moveSlider(this.dataset.index);
        });
      });

      //1.1.3 ВЫВОД ГОРОДА
      const cityDiv = `<p class="cards__text n${index} ${
        index === 0 ? "cards__active" : ""
      }" data-index="${index}">${images[index].city}</p>`;
      infoCity.innerHTML += cityDiv;

      //1.1.4 ВЫВОД ПЛОЩАДИ
      const areaDiv = `<p class="cards__text n${index} ${
        index === 0 ? "cards__active" : ""
      }" data-index="${index}">${images[index].area}</p>`;
      infoArea.innerHTML += areaDiv;

      //1.1.5 ВЫВОД ВРЕМЕНИ
      const timeDiv = `<p class="cards__text n${index} ${
        index === 0 ? "cards__active" : ""
      }" data-index="${index}">${images[index].time}</p>`;
      infoTime.innerHTML += timeDiv;
    });
  }

  //1.2 УПРАВЛЕНИЕ СТРЕЛКАМИ
  //на каждую стрелку вешаем слушатель клика
  //если стрелка левая (имеет класс .left) - идем назад
  //если стрелка правая - идем вперед
  function initArrows() {
    sliderArrows.querySelectorAll(".projects__nav-arrow").forEach((arrow) => {
      arrow.addEventListener("click", function () {
        const curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;

        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
        }

        moveSlider(nextNumber);
      });
    });
  }

  //1.3 ПЕРЕКЛЮЧЕНИЕ СЛАЙДОВ, где num - номер слайда, который мы должны показать
  //ищем активный слайд, точку, заголовок.....  (с классом .active)
  //удаляем у него класс активности ...active
  //ищем текущий слайд (".n" + num)
  //вешаем на него класс активности ...active
  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");
    sliderDots.querySelector(".dot__active").classList.remove("dot__active");
    sliderDots.querySelector(".n" + num).classList.add("dot__active");
    sliderTitle
      .querySelector(".title__active")
      .classList.remove("title__active");
    sliderTitle.querySelector(".n" + num).classList.add("title__active");
    infoCity.querySelector(".cards__active").classList.remove("cards__active");
    infoCity.querySelector(".n" + num).classList.add("cards__active");
    infoArea.querySelector(".cards__active").classList.remove("cards__active");
    infoArea.querySelector(".n" + num).classList.add("cards__active");
    infoTime.querySelector(".cards__active").classList.remove("cards__active");
    infoTime.querySelector(".n" + num).classList.add("cards__active");
  }
}

//2)Запускаем функцию Слайдера после загрузки DOM
document.addEventListener("DOMContentLoaded", initSlider);
