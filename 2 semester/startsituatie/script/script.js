

const setup = () => {
    loadMovies();
}


const loadMovies = () =>
{

    let movieList = document.getElementById('movielist');
    movies.forEach((movie, index) =>{
        const movieDiv = createElementWithClassName('div', 'movie');
        const title = createElementWithClassNameAndText('p', 'title', movie.title);
        const image = createElementWithClassName('img', 'image');
        const description = createElementWithClassNameAndText('p', 'description', movie.description);
        movieDiv.appendChild(title);
        movieDiv.appendChild(image);
        movieList.appendChild(movieDiv);
    })


    // const createIconButton = (iconClass, buttonClass, onClick) => {
    //     const button = createElementWithClassName("a", buttonClass);
    //     const icon = createElementWithClassName("i", iconClass);
    //     button.appendChild(icon);
    //     button.addEventListener("click", onClick);
    //     return button;
    // };
    //
    // const createElementWithClassName = (element, className) => {
    //     let e = document.createElement(element);
    //     e.setAttribute("class", className);
    //     return e;
    // };
    //
    //
    // const createElementWithClassNameAndText = (element, className, text) => {
    //     let e = createElementWithClassName(element, className);
    //     e.appendChild(document.createTextNode(text));
    //     return e;
    // };
    //
    // const createElementWithClassImage = (element, image) => {
    //     let e = createElementWithClassImage(element, image);
    //     e.appendChild(document.createTextNode(image));
    //     return e;
    // };



    const likedMovies = [];
    const dislikedMovies = [];

    // Hulpfuncties
    const createElement = (tag, className = "", textContent = "") => {
        const el = document.createElement(tag);
        if (className) {
            className.split(" ").forEach(cls => el.classList.add(cls));
        }
        if (textContent) el.textContent = textContent;
        return el;
    };

    const createIconButton = (iconClass, buttonClass, onClick) => {
        const button = createElement("a", buttonClass);
        const icon = createElement("i", iconClass);
        button.appendChild(icon);
        button.addEventListener("click", onClick);
        return button;
    };

    // Hoofdfunctie
    const loadMovies = () => {
        const movieList = document.getElementById("movielist");

        movies.forEach((movie, index) => {
            const movieDiv = createElement("div", "movie");
            const title = createElement("p", "title", movie.title);
            const description = createElement("p", "description", movie.description);
            const image = createElement("img", "image");
            image.setAttribute("src", movie.imageUrl);
            const likeButton = createIconButton(
                "fas fa-thumbs-up",
                "unset likebutton",
                () => like(movie.title)
            );
            likeButtons.push(likeButton);
            const dislikeButton = createIconButton(
                "fas fa-thumbs-down",
                "unset dislikebutton",
                () => dislike(movie.title)
            );
            dislikeButtons.push(dislikeButton);

            const buttons = createElement("div", "buttons");
            buttons.appendChild(likeButton);
            buttons.appendChild(dislikeButton);

            movieDiv.appendChild(title);
            movieDiv.appendChild(image);
            movieDiv.appendChild(description);
            movieDiv.appendChild(buttons);

            movieList.appendChild(movieDiv);
        });
};


window.addEventListener("load", setup);}