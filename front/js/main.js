import * as data from "./data";
import '../style/main.scss';
import _ from 'lodash';

let currentView;
let footerVisible = true;
let start = false;

function animationDiv() {

  var element = document.getElementById("change-color");
  element.classList.remove("colorchange");
  setTimeout(() => {
    element.classList.add("colorchange");
  }, 0);
  
}

function addItem(id, link, txt) {
  var d = document.createElement("div");
  d.className = "regular__item";
  d.innerHTML = `
    <div class="div-txt">
      <p>` + txt + `</p>
    </div>
      <img id="` + id + `" class="img-dld" src="./dist/img/slider/dwnld.png">
        `;
  document.getElementById("section").appendChild(d);
}

function setDataSlider(number){

  // удаляем старые данные
  $("#section").remove(); //#section

  var m = document.createElement("section");
  m.id = 'section';
  m.className = "regular slider";;
  document.getElementById("slider__slider").appendChild(m);

  for (let index = 0; index < data.mock[number].link.length; index++) {
    const link = data.mock[number].link[index].link;
    const txt = data.mock[number].link[index].txt;
    const id = data.mock[number].link[index].id_link;
    addItem(id, link, txt);
  }
  
  let array3 = document.querySelectorAll(".img-dld");
  for (let i = 0; i < array3.length; i++) {
    const element3 = array3[i];
    element3.addEventListener("click", function (ev) {
      downloadItem(ev);
    });
  }
};

function setActive(){
  
  let els = document.querySelectorAll(".slick-slide");
  for (let i = 0; i < els.length; i++) {
    const element = els[i];
    element.style.opacity = 1
    }
}

function setData(number){
  document.getElementById("title").innerHTML = data.mock[number].subject;
  document.getElementById("left-text").innerHTML = data.mock[number].regulations;
  document.getElementById("right-text").innerHTML = data.mock[number].changing;
  document.getElementById("bottom-text").innerHTML = data.mock[number].prepare;
  document.getElementById("dynamic-img").src = "./dist/img/img/" + (number + 1) + ".png";

  setDataSlider(number);

  $(".regular").slick({
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1
  });
  setTimeout(() => {
    setActive();
  }, 300);
  
}

function onClickGoTo(id) {
  let top = $('#' + id).offset().top; //узнаем высоту от начала страницы до блока на который ссылается якорь
  $("body,html").animate({ scrollTop: top }, 1000);//анимируем переход на расстояние - top за 1500 мс
}

function viewDynamic(ev, bool){
  let item;
  animationDiv()
  if (!bool){
    item = ev.target.parentElement.classList[0].split("__")[1];
  } else {
    item = ev.target.className.split("__")[1].split(" ")[0]
  }
  currentView = data.mock[+item - 1];
  console.log(currentView);

  setData(+item - 1);

  if (start) { onClickGoTo("change-color"); }
}

function downloadItem(ev){
  console.log(ev.target.id)
}

let array = document.querySelectorAll(".menu-item");

for (let i = 0; i < array.length; i++) {
  const element = array[i];
  element.addEventListener("click", function (ev) {
    viewDynamic(ev, false);
  });
}

let array2 = document.querySelectorAll(".menu-item-bot");

for (let i = 0; i < array2.length; i++) {
  const element2 = array2[i];
  element2.addEventListener("click", function (ev) {
    viewDynamic(ev, true);
  });
}


var btn = document.getElementById("more-btn").addEventListener("click", function (ev) {
  window.open(currentView.more, "_blank");
});

document.addEventListener("DOMContentLoaded", function () {//Аналог $(document).ready(function(){
  (function () {
    setData(0);
    currentView = data.mock[0];
    start = true;
  })();
});