import {fetchWithTimeout , fetchMovies, fetchBooks} from "./services";
const movies = require("./data/movies.json");

const getBooksandMovies = () => {
    return Promise.all([fetchBooks(), fetchMovies()])
    .then(([books, movies ]) => ({
        books,
        movies
      }))
    .catch(error => console.log("Error fetching books and movies", error));
}

const getBooksandMoviesPromise = getBooksandMovies();

getBooksandMoviesPromise.then(results => {
    console.log("getBooksandMoviesPromise", results);
});

function getBooksOrMovies(){
    return Promise.race([fetchBooks(), fetchMovies()])
    .then(results => results)
    .catch(error => console.log("Error waiting for the promise race", error));
}

const getBooksOrMoviesPromise = getBooksOrMovies();

getBooksOrMoviesPromise.then(results => {
    console.log("getBooksOrMoviesPromise", results);
});