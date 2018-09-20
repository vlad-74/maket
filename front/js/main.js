import * as data from "./data";
import '../style/main.scss';
import _ from 'lodash';

let currentView;
var footerVisible = true;

function viewDynamic(ev){
  let item = ev.target.parentElement.classList[0].split("__")[1];

  currentView = data.mock[+item - 1];
  console.log(currentView);
  console.log(item, data.mock[+item - 1].subject, data.addTwo(1, 2), data.multiplyTwo(1, 2));

  document.getElementById("title").innerHTML = data.mock[+item - 1].subject;
  document.getElementById("left-text").innerHTML = data.mock[+item - 1].regulations;
  document.getElementById("right-text").innerHTML = data.mock[+item - 1].changing;
  document.getElementById("bottom-text").innerHTML = data.mock[+item - 1].prepare;
  document.getElementById("dynamic-img").src = './dist/img/img/' + item + '.png';
}

var array = document.querySelectorAll(".menu-item");

for (let i = 0; i < array.length; i++) {
  const element = array[i];
  element.addEventListener("click", function(ev) {
    viewDynamic(ev);

  });
}

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
    document.getElementById("title").innerHTML = data.mock[0].subject;
    document.getElementById("left-text").innerHTML = data.mock[0].regulations;
    document.getElementById("right-text").innerHTML = data.mock[0].changing;
    document.getElementById("bottom-text").innerHTML = data.mock[0].prepare;
    document.getElementById("dynamic-img").src = "./dist/img/img/1.png";
    currentView = data.mock[0];
  })();
});


