const tabContainerClick = async () => {
      const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
      const data = await response.json();

      const tabContainer = document.getElementById("tab-container");
      data.data.forEach((category) => {
            const div = document.createElement("div");

            // div.classList.add = "tabs justify-center gap-10 mt-7 flex";
            div.innerHTML = `
            
            <a onclick="handleLoadContent()" class="tab tab-active bg-[#25252533] rounded-sm">${category.category}</a>


            `;
            tabContainer.appendChild(div);
      });

};




tabContainerClick();

