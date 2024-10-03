function getTimeString(time) {
  //get hour and rest seconds
  const hours = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minutes = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hours}h ${minutes}min ${remainingSecond}s ago`;
}

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
    // console.log(item);
    // create a button
    const buttonContainer = document.createElement("button");
    buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick = 'loadCategoryVideos(${item.category_id})' class='btn category-btn'>
            ${item.category}
        </button>
    `;
    categoryContainer.appendChild(buttonContainer);
  });
};
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

// ? create LoadCategoryVideos by category
const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayVideos(data.category);
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
    })
    .catch((err) => console.log(err));
};
const loadDetails = async(videoId) => {
    // console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.video);
    
};

const displayDetails = video =>{
    const detailsContainer = document.getElementById('modal-content');
    detailsContainer.innerHTML= `
        <img class='object-cover rounded-xl' src=${video.thumbnail} alt="">
        <p class="w-11/12 h-11/12 py-3">${video.description}</p>
    `
    document.getElementById('my_modal_5').showModal();
}
const sortedByViews = (videos) => {
    document.getElementById('sort-btn').addEventListener('click', () => {
      // Create an array of videos and their view counts
      let sortedVideos = [...videos]; // Make a copy of the videos array
      console.log(sortedVideos);
      // Sort the videos by their view count in descending order
      sortedVideos.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views));    
      console.log(sortedVideos);
      // Display all sorted videos at once
      displayVideos(sortedVideos);  // Pass the entire sorted array to displayVideos
    });
  };
  
  

// ? create LoadVideos
const loadVideos = (searchText = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
        displayVideos(data.videos);
        sortedByViews(data.videos);
    })
    .catch((err) => console.log(err));
};

// ? create displayVideos
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
        <div class="min-h-[600px] w-full flex flex-col gap-5 justify-center items-center">
            <img src="./Icon.png" alt="">
            <h2 class="text-center text-xl font-bold">No Content Here in This Category</h2>
        </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }
  

  videos.forEach((item) => {
    // console.log(item);
    const card = document.createElement("div");
    videoContainer.appendChild(card);
    card.classList = "card card- compact";
    card.innerHTML = `
        
            <figure class='h-[200px] relative'>
                <img class='h-full w-full object-cover' src=${
                  item.thumbnail
                } alt="videos" />
                ${
                  item.others.posted_date?.length == 0
                    ? ""
                    : ` <span class='absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1'>${getTimeString(
                        item.others.posted_date
                      )}</span>`
                }
            </figure>
            <div class="px-0 py-2 flex gap-2">
                <div>
                    <img class='w-10 h-10 rounded-full object-cover' src=${
                      item.authors[0].profile_picture
                    } alt="">
                </div>
                <div>
                    <h2 class='font-bold'>${item.title}</h2>
                    <div class='flex items-center gap-2'>
                        <p class='text-gray-400'>${
                          item.authors[0].profile_name
                        }</p>
                        ${
                          item.authors[0].verified === true
                            ? `<img class='w-5' src='https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png'/>`
                            : ""
                        }
                    </div>
                    <button onclick="loadDetails('${item.video_id}')" class="btn btn-sm bg-btn_primary text-white">Details</button>
                </div>
            </div>
        
    `;
  });
};

document.getElementById('search-input').addEventListener('keyup',(e)=>{
    loadVideos(e.target.value);
})

loadCategories();
loadVideos();
