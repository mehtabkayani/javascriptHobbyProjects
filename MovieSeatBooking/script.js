const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;

//Save to selected movie index and price
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem("selectedMovieIndex",movieIndex)
    localStorage.setItem("selectedMoviePrice",moviePrice)
}

function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    //Copy Selected seats into array
    // Map through array
    //Return a new array of indexes
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length

    count.innerText = selectedSeatsCount;

    total.innerText = selectedSeatsCount * ticketPrice;

}
//ADD FUNCTIONALLITY AFTER PROJECT
// function unSelectCount(){
//     const selectedSeats = document.querySelectorAll(".row .seat.selected");
//     selectedSeats.forEach((seat)=>{
//         seat.classList.remove("selected")
//     })

//     count.innerText = 0;

//     total.innerText = 0;

// }


function populateUI(){

    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected")
            }
        })
    }
    const selectedMovieindex = localStorage.getItem("selectedMovieIndex");
    if(selectedMovieindex !== null){
        movieSelect.selectedIndex = selectedMovieindex;
    }
   

}
//Movie select event
movieSelect.addEventListener("change",(e)=>{
    ticketPrice = +e.target.value;
    // unSelectCount();
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedCount();

})


//Seat click event
container.addEventListener("click", (e)=>{
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected")
        updateSelectedCount();
    }
})

//Intial count and total set
updateSelectedCount()