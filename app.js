document.addEventListener(`DOMContentLoaded`, () => {
    //Fetch the details of the first movie and display them
    fetch(`http://localhost:3000/films/1`)
    .then(response => {
        if(!response.ok) {
            throw new Error("Could not fetch resource");
        }
        return response.json();
        })
    .then(movie => {
        displayMovieDetails(movie);
    }).catch(error => console.error(error));
   
    //fetch all movies and populate the films menu
    fetch(`http://localhost:3000/films`)
    .then(response => 
        response.json())
    .then(movies => {
        movies.forEach((movie) => {
         populateFilmsMenu(movie);
        });
    });
    //Function for displaying movie details
    function displayMovieDetails(movie) {
        const moviePoster = document.getElementById(`movie-poster`);
        const movieTitle = document.getElementById(`movie-title`);
        const movieRuntime = document.getElementById(`movie-runtime`);
        const movieShowtime = document.getElementById(`movie-showtime`);
        const availableTickets = movie.capacity - movie.tickets_sold;

        moviePoster.src = movie.poster;
        movieTitle.textContent = movie.title;
        movieShowtime.textContent = `Showtime: ${movie.showtime}`;
        movieRuntime.textContent = `${movie.runtime} mins`;
        document.getElementById(`available-tickets`).textContent = `Tickets available: ${availableTickets}`;
          //buy ticket button click
        document.getElementById('buy-ticket').addEventListener(`click`, () => {
            const availableTickets = movie.capacity - movie.tickets_sold;
            
          if(availableTickets !== 0) {
            document.getElementById("available-tickets").textContent = `Tickets available: ${availableTickets - 1}`;
          } else (availableTickets === 0); {
           alert("Tickets sold out");
          }
    
        });
        
    }

    //function for populating the films menu
    function populateFilmsMenu (movie) {
        const filmsMenu = document.getElementById(`films`);
        const li1 = document.createElement(`li`);
        
        li1.textContent = movie.title;
        
        if(movie.tickets_sold === movie.capacity) {
            li1.classList.add('sold-out').textContent = "sold-out"
        }
       //Append the li1 variable containing 'li element' to the filmsMenu variable
       filmsMenu.appendChild(li1);
    }

   
   
    // BONUS- Clicking on a movie in the menu should replace the currently displayed movie's details with the new movie details
    document.getElementById(`films`).addEventListener(`click`, (event) => {
        if(event.target.classList.contains(`films`)) {
            const movieId = event.target.dataset.id;
            fetch(`http://localhost:3000/films/${movieId}`)
            .then(response => {
                 response.json();
                })
            
                .then(movie => {
                    displayMovieDetails(movie);
                }).catch(error => console.error(error));
        }
        });
        //extra bonus- DELETE A FILM FROM THE SERVER
        document.getElementById(`films`).addEventListener(`click`, (event) => {
            if(event.target.classList.contains('delete-button')) {
            fetch(`http://localhost:3000/films/${movieId}`, {
                method: 'DELETE',
                headers: {
                  "Content-Type": "application/json"
                }
            }) 
            .then(() => {
            });
            }  

        });
         
        });
        fetch(`http://localhost:3000/films/1`, {
            method:'PATCH',
            headers: {
               "Content-Type": "application/json"
            },
            body: 
               JSON.stringify({
               tickets_sold: 28
               })
   
            
           })
           .then(response => response.json())
           .then(data => console.log(data))
           .catch(error => console.error(error))



