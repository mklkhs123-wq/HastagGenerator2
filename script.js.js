```javascript
const keyword=document.getElementById("keyword");
const platform=document.getElementById("platform");
const category=document.getElementById("category");
const count=document.getElementById("count");
const tagType=document.getElementById("tagType");
const prefix=document.getElementById("prefix");
const suffix=document.getElementById("suffix");

const output=document.getElementById("output");

const generateBtn=document.getElementById("generateBtn");
const randomBtn=document.getElementById("randomBtn");
const copyBtn=document.getElementById("copyBtn");
const downloadBtn=document.getElementById("downloadBtn");
const favoriteBtn=document.getElementById("favoriteBtn");
const themeToggle=document.getElementById("themeToggle");

const totalTags=document.getElementById("totalTags");
const charCount=document.getElementById("charCount");
const seoScore=document.getElementById("seoScore");

const historyList=document.getElementById("historyList");
const favoritesList=document.getElementById("favoritesList");

const baseTags=[
"viral","trending","explore","explorepage","reels",
"fyp","news","technology","business","marketing",
"digital","creator","contentcreator","success",
"growth","innovation","startup","finance",
"education","learning","motivation","tips",
"update","today","breaking","future","online",
"internet","global","community","socialmedia",
"youtube","instagram","facebook","tiktok",
"twitter","linkedin","pinterest","ai","tech"
];

const randomKeywords=[
"AI","Technology","Finance","Business","News",
"Cricket","Gaming","Travel","Food","Fitness",
"Health","Movies","Music","Blogging"
];

generateBtn.addEventListener("click",generateTags);
randomBtn.addEventListener("click",generateRandom);
copyBtn.addEventListener("click",copyTags);
downloadBtn.addEventListener("click",downloadTags);
favoriteBtn.addEventListener("click",saveFavorite);
themeToggle.addEventListener("click",toggleTheme);

loadHistory();
loadFavorites();

function generateTags(){

let key=keyword.value.trim();

if(!key){
alert("Enter a keyword");
return;
}

let total=parseInt(count.value);

let tags=[];

tags.push("#"+key.replace(/\s+/g,""));

for(let i=0;i<baseTags.length;i++){

let p=prefix.value.trim();
let s=suffix.value.trim();

let tag=baseTags[i];

if(p){
tag=p+tag;
}

if(s){
tag=tag+s;
}

tags.push("#"+tag);

tags.push("#"+key.replace(/\s+/g,"")+tag);

if(tags.length>=total){
break;
}
}

tags=tags.slice(0,total);

output.value=tags.join(" ");

updateStats(tags);

saveHistory(key);
loadHistory();
}

function generateRandom(){

const random=
randomKeywords[Math.floor(Math.random()*randomKeywords.length)];

keyword.value=random;

generateTags();
}

function updateStats(tags){

totalTags.textContent=tags.length;

charCount.textContent=
output.value.length;

let score=Math.min(
100,
50+(tags.length)
);

seoScore.textContent=
score+"%";
}

function copyTags(){

if(!output.value){
return;
}

navigator.clipboard.writeText(
output.value
);

copyBtn.textContent="Copied!";

setTimeout(()=>{
copyBtn.textContent="Copy All";
},1500);
}

function downloadTags(){

if(!output.value){
return;
}

const blob=new Blob(
[output.value],
{type:"text/plain"}
);

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="hashtags.txt";

a.click();
}

function saveHistory(text){

let history=
JSON.parse(
localStorage.getItem("history")
) || [];

history.unshift(text);

history=[...new Set(history)];

history=history.slice(0,20);

localStorage.setItem(
"history",
JSON.stringify(history)
);
}

function loadHistory(){

let history=
JSON.parse(
localStorage.getItem("history")
) || [];

historyList.innerHTML="";

history.forEach(item=>{

let li=document.createElement("li");

li.textContent=item;

li.onclick=()=>{
keyword.value=item;
};

historyList.appendChild(li);

});
}

function saveFavorite(){

if(!output.value){
return;
}

let fav=
JSON.parse(
localStorage.getItem("favorites")
) || [];

fav.unshift(output.value);

fav=fav.slice(0,20);

localStorage.setItem(
"favorites",
JSON.stringify(fav)
);

loadFavorites();
}

function loadFavorites(){

let fav=
JSON.parse(
localStorage.getItem("favorites")
) || [];

favoritesList.innerHTML="";

fav.forEach(item=>{

let li=document.createElement("li");

li.textContent=item.substring(0,120)+"...";

favoritesList.appendChild(li);

});
}

function toggleTheme(){

document.body.classList.toggle("light");

let isLight=
document.body.classList.contains("light");

themeToggle.textContent=
isLight ?
"☀️ Light Mode" :
"🌙 Dark Mode";

localStorage.setItem(
"theme",
isLight ? "light" : "dark"
);
}

(function(){

let theme=
localStorage.getItem("theme");

if(theme==="light"){
document.body.classList.add("light");
themeToggle.textContent="☀️ Light Mode";
}

})();
```
