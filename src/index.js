import {fetchWithTimeout , fetchMovies, fetchBooks, asyncFetchBooks, asyncFetchMovies} from "./services";
const movies = require("./data/movies.json");

const getBooksandMovies = () => {
    return Promise.all([fetchBooks(), fetchMovies()])
    .then(([books, movies ]) => ({
        books,
        movies
      }))
    .catch(error => console.log("Error fetching books and movies", error));
};

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

async function getBooksAndMoviesAsync(){
    try{
        const [books,movies] = await Promise.all([
            asyncFetchBooks(),
            asyncFetchMovies()
        ]);
        return { books,movies};
    }
    catch(error){
        console.log("Error fetching books and movies", error);
        return error;
    }
}

async function getBooksOrMoviesAsync(){
    const values = await Promise.race([asyncFetchBookss(), asyncFetchMovies()]);
    return values;
}

getBooksAndMoviesAsync()
    .then(results =>{
        console.log("movies and books", {
            movies: results.movies,
            books: results.books
          });
    }).catch(error => {
        console.error("Error in getBooksAndMoviesAsync execution", error);
    });

getBooksOrMoviesAsync().then(results => {
        console.log("movies OR books", {
            results,
          });
    });