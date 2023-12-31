const tabContainerClick = async () => {
      const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
      const data = await response.json();
      const tabContainer = document.getElementById("tab-container");
      data.data.forEach((category) => {
            const div = document.createElement("div");
            div.innerHTML = `
          <a onclick="handleLoadVideos('${category.category_id}')" class="tab tab-active bg-[#25252533] rounded-sm">${category.category}</a>
          `;
            tabContainer.appendChild(div);
      });
};

const handleLoadVideos = async (categoryID) => {
      const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`);
      const data = await response.json();
      const cardContainer = document.getElementById("card-container");
      cardContainer.innerHTML = '';
      data.data.forEach((videos) => {
            const div = document.createElement("div");
            div.innerHTML = `
          <div class=" mx-auto mt-10 w-96 ">
              <figure><img class="h-[200px] w-[500px] rounded-lg" src=${videos.thumbnail} />
              </figure>
              <div class="mt-5 flex flex-row items-center mr-32">
                  <div>
                      <div class="avatar">
                          <div class="w-12 rounded-full">
                              <img src=${videos?.authors[0]?.profile_picture} />
                          </div>
                      </div>
                  </div>
                  <div>
                      <h2 class="card-title pl-5 font-bold">${videos.title}</h2>
                  </div>
              </div>
              <div class="flex flex-row gap-5 ml-9">
                  <div class="ml-8">
                      <p text-[#171717B3]>${videos?.authors[0]?.profile_name}</p>
                  </div>
                  <div>
                      ${videos?.authors[0]?.verified === true ? '<img class="pt-[2px]" src="/fi_10629607.svg">' : ''}
                  </div>
              </div>
              <p class="ml-[67px] text-[#171717B3] views">${videos?.others?.views} views</p>
          </div>
          `;
            cardContainer.appendChild(div);
      });
      if (data.data.length === 0) {
            const errorContainer = document.getElementById("error-img-text");
            errorContainer.classList.remove("hidden");
      } else {
            const errorContainer = document.getElementById("error-img-text");
            errorContainer.classList.add("hidden");
      }
};

const sortAndRenderByViews = () => {
      const cardContainer = document.getElementById("card-container");
      const cards = Array.from(cardContainer.children);
      cards.sort((a, b) => {
            const viewsA = parseInt(a.querySelector(".views").textContent);
            const viewsB = parseInt(b.querySelector(".views").textContent);
            return viewsA - viewsB;
      });
      cardContainer.innerHTML = '';
      cards.forEach((card) => {
            cardContainer.appendChild(card);
      });
};

document.getElementById("sort-by-view").addEventListener("click", () => {
      sortAndRenderByViews();
});

handleLoadVideos(1000);
tabContainerClick();