const toggle = document.getElementById("toggle")
const close = document.getElementById("close")
const open = document.getElementById("open")
const modal = document.getElementById("modal")

//Toggle nav
toggle.addEventListener("click", ()=> {
    document.body.classList.toggle('show-nav')
    toggle.innerHTML = '<i class="fa fa-times"></i>'
    
                if(!document.body.classList.contains("show-nav")){
                    toggle.innerHTML = '<i class="fa fa-bars fa-2x"></i>'
                    
                }else{
                    toggle.innerHTML = '<i class="fa fa-times fa-2x"></i>'

                }
});

// Show modal
open.addEventListener("click", ()=> {
    modal.classList.add("show-modal");
})

// Close modal

close.addEventListener("click", ()=> {
    modal.classList.remove("show-modal")
})

// Hide modal on outside click

window.addEventListener("click", e => e.target == modal ? modal.classList.remove("show-modal") : false );