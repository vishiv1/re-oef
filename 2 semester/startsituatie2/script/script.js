const setup = () =>{
    const likeBar = document.getElementById('likebar');
    const like = document.getElementById('like');
    const dislike = document.getElementById('dislike');
    const movieList = document.getElementById("movielist");
    const likeBarMovies = document.getElementById('likebarmovies');

    let dislikeCount = 0;
    let likeCount = 0;

    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.className = "movie-card";

        const img = document.createElement("img");
        img.className = "image";
        img.src = movie.imageUrl;
        img.alt = movie.title;
        movieCard.appendChild(img);

        const title = document.createElement("h2");
        title.textContent = movie.title;
        movieCard.appendChild(title);

        const desc = document.createElement("p");
        desc.textContent = movie.description;
        movieCard.appendChild(desc);

        const likeBtn = document.createElement("button");
        likeBtn.className = "like-button";
        const likeImg = document.createElement("img");
        likeImg.src = "images/like.png";
        likeImg.alt = "Like";
        movieCard.appendChild(likeBtn)
        likeBtn.style.background = "gray";

        const dislikeBtn = document.createElement("button");
        likeBtn.className = "like-button";
        const dislikeImg = document.createElement("img");
        likeImg.src = "images/dislike.png";
        likeImg.alt = "Dislike";
        movieCard.appendChild(dislikeBtn)
        likeBtn.style.background = "gray";


        likeBtn.addEventListener("click", () =>{
            const likedItemId = `liked-${movie.id}`;
            const existingLikedItem = document.getElementById(likedItemId);

            if(likeBtn.style.background === "green")
            {
                likeBtn.style.background = "gray";
                likecount--;
            }
        });

        movieList.appendChild(movieCard);
    });
};
window.addEventListener('load', setup);