const setup = () => {
    const movieList = document.getElementById("movielist");
    const likeCounter = document.getElementById("like");
    const dislikeCounter = document.getElementById("dislike");
    const likeBar = document.getElementById("likebar");
    const likeBarMovies = document.getElementById("likebarmovies");

    let likeCount = 0;
    let dislikeCount = 0;

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

        // Like button
        const likeBtn = document.createElement("button");
        likeBtn.className = "like-button";
        const likeImg = document.createElement("img");
        likeImg.src = "images/like.png";
        likeImg.alt = "Like";
        likeBtn.appendChild(likeImg);
        likeBtn.style.backgroundColor = "gray";

        // Dislike button
        const dislikeBtn = document.createElement("button");
        dislikeBtn.className = "dislike-button";
        const dislikeImg = document.createElement("img");
        dislikeImg.src = "images/dislike.png";
        dislikeImg.alt = "Dislike";
        dislikeBtn.appendChild(dislikeImg);
        dislikeBtn.style.backgroundColor = "gray";

        likeBtn.addEventListener("click", () => {
            const likedItemId = `liked-${movie.id}`;
            const existingLikedItem = document.getElementById(likedItemId);

            if (likeBtn.style.backgroundColor === "green") {
                // Desactivar Like
                likeBtn.style.backgroundColor = "gray";
                likeCount--;
                likeCounter.textContent = likeCount;
                if (likeCount === 0) {
                    likeBar.style.visibility = "hidden";
                }
                if (existingLikedItem) {
                    existingLikedItem.remove();
                }
            } else {
                // Activar Like
                likeBtn.style.backgroundColor = "green";
                if (dislikeBtn.style.backgroundColor === "red") {
                    dislikeBtn.style.backgroundColor = "gray";
                    dislikeCount--;
                    dislikeCounter.textContent = dislikeCount;
                }
                likeCount++;
                likeCounter.textContent = likeCount;

                if (likeCount === 1) {
                    likeBar.style.visibility = "visible";
                }

                if (!existingLikedItem) {
                    const likedItem = document.createElement("div");
                    likedItem.className = "liked-item";
                    likedItem.id = likedItemId;
                    likedItem.textContent = movie.title;

                    const removeBtn = document.createElement("button");
                    removeBtn.className = "remove-button";
                    const removeImg = document.createElement("img");
                    removeImg.src = "images/remove.png";
                    removeImg.alt = "Remove";
                    removeBtn.appendChild(removeImg);
                    removeBtn.addEventListener("click", () => {
                        likedItem.remove();
                        likeCount--;
                        likeCounter.textContent = likeCount;
                        if (likeCount === 0) {
                            likeBar.style.visibility = "hidden";
                        }
                        likeBtn.style.backgroundColor = "gray";
                    });

                    likedItem.appendChild(removeBtn);
                    likeBarMovies.appendChild(likedItem);
                }
            }
        });


        // Dislike button logica
        dislikeBtn.addEventListener("click", () => {
            if (dislikeBtn.style.backgroundColor === "red") {
                // Desactivar Dislike
                dislikeBtn.style.backgroundColor = "gray";
                dislikeCount--;
                dislikeCounter.textContent = dislikeCount;
            } else {
                // Activar Dislike
                dislikeBtn.style.backgroundColor = "red";
                if (likeBtn.style.backgroundColor === "green") {
                    likeBtn.style.backgroundColor = "gray";
                    likeCount--;
                    likeCounter.textContent = likeCount;
                    const likedItem = document.getElementById(`liked-${movie.id}`);
                    if (likedItem) {
                        likedItem.remove();
                    }
                    if (likeCount === 0) {
                        likeBar.style.visibility = "hidden";
                    }
                }
                dislikeCount++;
                dislikeCounter.textContent = dislikeCount;
            }
        });


        movieCard.appendChild(likeBtn);
        movieCard.appendChild(dislikeBtn);
        movieList.appendChild(movieCard);
    });
};

window.addEventListener("load", setup);
