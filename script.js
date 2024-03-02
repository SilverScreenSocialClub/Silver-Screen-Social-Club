fetch('example.txt')
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.text();
})
.then(token => {
  const options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  return fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=100&sort_by=popularity.desc&vote_average.gte=7&without_genres=music', options);
})
.then(response => {
  if (!response.ok) {
    throw new Error('API request was not successful');
  }
  return response.json();
})
.then(response => {
  const moviesContainer = document.getElementById('movies-container');

  moviesContainer.innerHTML = '';

  response.results.forEach(movie => {
    const movieTitle = document.createElement('p');
    movieTitle.textContent = movie.title;
    moviesContainer.appendChild(movieTitle);
  });
})
.catch(error => {
  console.error('There was a problem:', error);
});
