import { createClient } from "pexels";
import refs from "./refs.js";
import template from "../templates/mainItem.hbs";

const { form, ulResult } = refs;

const key = "563492ad6f91700001000001ced38660aedd4f17a9fcccae5473fbb0n";
const client = createClient(key);
const perPage = 4;

form.addEventListener("submit", (event) => {
  //Отменяем дефолтное событие браузера при отправке формы
  event.preventDefault();
  // Полуаем значение из инпута для запроса
  const query = event.target.elements.query.value;
  // Делаем запрос через библиотеку пекселя,
  //Передаем в запрос значение из инпута через переменную квери
  client.videos.search({ query, perPage }).then((result) => {
    const videos = result.videos;
    // const array = [];
    // videos.map((el) => {});
    // const items = template(videos);
    // console.log(array);
    const resultItems = videos.map((el) => {
      const url = el.video_files[0].link;
      const posterImg = el.image;
      const author = el.user.name;
      const pictures = el.video_pictures;
      const items = createItem(url, posterImg, author, pictures);
      return items;
    });
    ulResult.append(...resultItems);
  });
});

function createItem(urlVideo, posterSrc, authorName, picArray) {
  const li = document.createElement("li");
  li.classList.add("videoWrapper");
  const video = document.createElement("video");
  video.setAttribute("controls", null);
  video.classList.add("video");
  video.setAttribute("src", urlVideo);
  video.setAttribute("poster", posterSrc);
  const h3 = document.createElement("h3");
  h3.classList.add("author");
  const picList = document.createElement("ul");
  picList.classList.add("picturesList");
  h3.textContent = authorName;

  const pictures = picArray.map((el) => {
    const wrap = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute("src", el.picture);
    img.setAttribute("alt", "img");
    wrap.appendChild(img);
    return wrap;
  });
  picList.append(...pictures);
  li.append(video, h3, picList);
  console.log(li);
  return li;
}
