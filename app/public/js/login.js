

function closeForm(){
    document.getElementById("signup-form").style.display = "none"
}

function openForm(){
    console.log('clicked')
    document.getElementById("signup-form").style.display = "flex"
}
document.getElementById("signup-button").addEventListener('click',openForm)
document.getElementById('cancel-form').addEventListener('click',closeForm)

