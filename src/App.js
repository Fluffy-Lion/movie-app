import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import MovieList from './components/MovieList'
import MovieListHeading from './components/MovieListHeading'
import SearchBox from './components/SearchBox'
import AddToFavourites from './components/AddToFavourites'

const App = () => {
  //    currentstate , function that updates it
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favourites, setFavourites] = useState([])

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=8658255f`

    const response = await fetch(url)
    const responseJson = await response.json()

    if (responseJson.Search) {
      setMovies(responseJson.Search)
    }
  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie]
    setFavourites(newFavouriteList)
  }
  //side effect, makes the call only one time
  useEffect(() => {
    getMovieRequest(searchValue) //when the useEffect runs is passes the new search value to getMoviesRequest
  }, [searchValue])   //runs whenever the searchValue is updated 
  return (
    <div className="container-fluid movie-app">
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row'>
       <MovieList 
        movies={movies} 
        favouriteComponent={AddToFavourites}
        handleFavouritesClick={addFavouriteMovie}
      />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='favourites' />
      </div>
      <div className='row'>
        <MovieList movies={favourites} favouriteComponent={AddToFavourites} />
      </div>
    </div>
  );
} 

export default App;
