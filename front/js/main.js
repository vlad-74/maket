import * as data from "./data";
import '../style/main.scss';
import _ from 'lodash';

let currentView;
let footerVisible = true;

function animationDiv() {

  var element = document.getElementById("change-color");
  element.classList.remove("colorchange");
  setTimeout(() => {
    element.classList.add("colorchange");
  }, 0);
  
}

function setDataSlider(number){
  // data.mock[number].link

  // удаляем старые данные
  $(".regular__item").remove();

  for (let index = 0; index < data.mock[number].link.length; index++) {
    const link = data.mock[number].link[index].link;
    const txt = data.mock[number].link[index].txt;
    console.log(link, txt);

    var d = document.createElement("div");
    d.className = "regular__item";
    let section = document.getElementById("section")

    section.insertBefore(d, section.firstChild);

    var img1 = document.createElement("img");
    img1.src = "./dist/img/slider/dwnld.png"
    d.appendChild(img1);

    var p = document.createElement("p");
    p.innerText = txt;
    d.appendChild(p);

    var img2 = document.createElement("img");
    img2.src = "./dist/img/img/podrobnee.png";
    d.appendChild(img2);
  }

};

function setData(number){
  document.getElementById("title").innerHTML = data.mock[number].subject;
  document.getElementById("left-text").innerHTML = data.mock[number].regulations;
  document.getElementById("right-text").innerHTML = data.mock[number].changing;
  document.getElementById("bottom-text").innerHTML = data.mock[number].prepare;
  document.getElementById("dynamic-img").src = "./dist/img/img/" + (number + 1) + ".png";

  setDataSlider(number);
}

function viewDynamic(ev){
  animationDiv()
  let item = ev.target.parentElement.classList[0].split("__")[1];

  currentView = data.mock[+item - 1];
  console.log(currentView);
  console.log(item, data.mock[+item - 1].subject, data.addTwo(1, 2), data.multiplyTwo(1, 2));

  setData(+item - 1);
}

var array = document.querySelectorAll(".menu-item");

for (let i = 0; i < array.length; i++) {
  const element = array[i];
  element.addEventListener("click", function(ev) {
    viewDynamic(ev);
  });
}

// =================================addEventListener=================================

var btn = document.getElementById("more-btn").addEventListener("click", function (ev) {
  window.open(currentView.more, "_blank");
});

document.getElementById("show-footer").addEventListener("click", function (ev) {
  if (footerVisible){
    document.getElementById("hide-footer").style.display = "none";
    footerVisible = false;
  } else {
    document.getElementById("hide-footer").style.display = "flex";
    footerVisible = true;
  }
});

document.addEventListener("DOMContentLoaded", function() {//Аналог $(document).ready(function(){
  (function() {
    setData(0);
    currentView = data.mock[0];
  })();
});


