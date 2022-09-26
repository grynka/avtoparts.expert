document.querySelector("#search").oninput=function(){var e=this.value.trim(),c=document.querySelectorAll(".search li");""!=e&&c.forEach((function(c){-1==c.innerText.search(e)?c.classList.add("hide"):c.classList.remove("hide")}))};
//# sourceMappingURL=index.8ee95329.js.map
