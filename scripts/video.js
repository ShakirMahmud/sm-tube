// * Fetch, load and show categories on html
// ? create loadCategories
const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.log(err));
};

// ? create displayCategories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categories.forEach((item) => {
    console.log(item);
    // create a button
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    categoryContainer.appendChild(button);
  });
};

// ? create LoadVideos
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.log(err));
};

// ? create displayVideos
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videos.forEach((item) => {
    console.log(item);
    const card = document.createElement("div");
    videoContainer.appendChild(card);
    card.classList = "card card-compact";
    card.innerHTML = `
        <div class="card card-compact bg-base-100 w-96 shadow-xl">
            <figure class='h-[200px]'>
                <img class='h-full w-full object-cover' src=${item.thumbnail} alt="videos" />
            </figure>
            <div class="px-0 py-2 flex gap-2">
                <div>
                    <img class='w-10 h-10 rounded-full object-cover' src=${item.authors[0].profile_picture} alt="">
                </div>
                <div>
                    <h2 class='font-bold'>${item.title}</h2>
                    <div class='flex items-center gap-2'>
                        <p class='text-gray-400'>${item.authors[0].profile_name}</p>
                        <img class='w-5' src='https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png'/>
                    </div>
                    <p></p>
                </div>
            </div>
        </div>
    `;
  });
};

loadCategories();
loadVideos();
