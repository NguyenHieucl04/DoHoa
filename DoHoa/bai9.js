function login(){
    var username = document.myform.username.value
    var password = document.myform.password.value
    if (username === "hieu" && password === "123456")
        alert("login successful!")
    else
        alert("invalid username or password.")
}
function reset(){
    document.myform.reset()
}