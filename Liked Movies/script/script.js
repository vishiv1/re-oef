// script.js
window.addEventListener("load", () => {
    const movieList = document.getElementById("movielist");
    const likeCounter = document.getElementById("like");
    const dislikeCounter = document.getElementById("dislike");
    const likebar = document.getElementById("likebar");
    const likebarMovies = document.getElementById("likebarmovies");

    let likeCount = 0;
    let dislikeCount = 0;
    const likedMovies = new Map(); // id → movie object
    const dislikedMovies = new Set(); // ids

    function updateCounters() {
        likeCounter.textContent = likeCount;
        dislikeCounter.textContent = dislikeCount;
    }

    function updateLikebar() {
        likebarMovies.innerHTML = "";
        if (likedMovies.size === 0) {
            likebar.style.visibility = "hidden";
            return;
        }
        likebar.style.visibility = "visible";

        likedMovies.forEach(movie => {
            const div = document.createElement("div");
            div.className = "liked-movie";

            const title = document.createElement("span");
            title.textContent = movie.title;

            const remove = document.createElement("i");
            remove.className = "fas fa-trash";
            remove.style.cursor = "pointer";
            remove.addEventListener("click", () => {
                // verwijderen → like undo
                likedMovies.delete(movie.id);
                likeCount--;
                updateCounters();
                updateLikebar();
                // reset de knop-styling in movielist
                const btn = document.querySelector(`#movie-${movie.id} .like`);
                btn.classList.remove("active");
            });

            div.append(title, remove);
            likebarMovies.appendChild(div);
        });
    }

    function renderMovie(movie) {
        const container = document.createElement("div");
        container.className = "movie";
        container.id = `movie-${movie.id}`;

        const title = document.createElement("h3");
        title.textContent = movie.title;

        const img = document.createElement("img");
        img.src = movie.imageUrl;
        img.alt = movie.title;
        img.width = 150;

        const desc = document.createElement("p");
        desc.textContent = movie.description;

        // buttons
        const btnLike = document.createElement("button");
        btnLike.innerHTML = "<i class='fas fa-thumbs-up'></i>";
        btnLike.className = "like";
        const btnDislike = document.createElement("button");
        btnDislike.innerHTML = "<i class='fas fa-thumbs-down'></i>";
        btnDislike.className = "dislike";

        btnLike.addEventListener("click", () => {
            if (likedMovies.has(movie.id)) {
                // undo like
                likedMovies.delete(movie.id);
                likeCount--;
                btnLike.classList.remove("active");
            } else {
                // like toevoegen
                likedMovies.set(movie.id, movie);
                likeCount++;
                btnLike.classList.add("active");
                // als hij gedisliked was → undo
                if (dislikedMovies.has(movie.id)) {
                    dislikedMovies.delete(movie.id);
                    dislikeCount--;
                    btnDislike.classList.remove("active");
                }
            }
            updateCounters();
            updateLikebar();
        });

        btnDislike.addEventListener("click", () => {
            if (dislikedMovies.has(movie.id)) {
                // undo dislike
                dislikedMovies.delete(movie.id);
                dislikeCount--;
                btnDislike.classList.remove("active");
            } else {
                dislikedMovies.add(movie.id);
                dislikeCount++;
                btnDislike.classList.add("active");
                // als hij geliked was → undo
                if (likedMovies.has(movie.id)) {
                    likedMovies.delete(movie.id);
                    likeCount--;
                    btnLike.classList.remove("active");
                }
            }
            updateCounters();
            updateLikebar();
        });

        const btnRow = document.createElement("div");
        btnRow.className = "buttons";
        btnRow.append(btnLike, btnDislike);

        container.append(title, btnRow, img, desc);
        return container;
    }

    // init
    movies.forEach(m => movieList.appendChild(renderMovie(m)));
    updateCounters();
});
// Plaats alle benodigde Javascript code in dit bestand.
// Zorg ervoor dat je alle functionaliteit die in de opgave gevraagd wordt voorziet.
