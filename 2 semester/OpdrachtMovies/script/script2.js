const likedMovies = [];
const dislikedMovies = [];
const likeButtons = {};
const dislikeButtons = {};

const setup = () => {
    loadMovies();
    updateUI();
};

const loadMovies = () => {
    const movieList = document.getElementById("movielist");
    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.className = "movie-card";

        const img = document.createElement("img");
        img.src = movie.imageUrl;
        img.alt = movie.title;
        movieCard.appendChild(img);

        const title = document.createElement("h2");
        title.textContent = movie.title;
        movieCard.appendChild(title);

        const desc = document.createElement("p");
        desc.textContent = movie.description;
        movieCard.appendChild(desc);

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";

        const likeButton = document.createElement("button");
        likeButton.innerHTML = `<i class="fas fa-thumbs-up"></i>`;
        likeButton.className = "likebutton";
        likeButton.addEventListener("click", () => toggleLike(movie.title));
        buttonContainer.appendChild(likeButton);
        likeButtons[movie.title] = likeButton;

        const dislikeButton = document.createElement("button");
        dislikeButton.innerHTML = `<i class="fas fa-thumbs-down"></i>`;
        dislikeButton.className = "dislikebutton";
        dislikeButton.addEventListener("click", () => toggleDislike(movie.title));
        buttonContainer.appendChild(dislikeButton);
        dislikeButtons[movie.title] = dislikeButton;

        movieCard.appendChild(buttonContainer);
        movieList.appendChild(movieCard);
    });
};






window.addEventListener("load", setup);
