document.querySelector("#search").oninput=function(){let e=this.value.trim(),t=document.querySelectorAll(".search li");""!=e&&t.forEach((function(t){-1==t.innerText.search(e)?t.classList.add("hide"):t.classList.remove("hide")}))};
//# sourceMappingURL=index.00725d1c.js.map
