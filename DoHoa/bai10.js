function showInfo() {
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var phone = document.getElementById("phone").value;
    
    document.getElementById("displayName").textContent = name;
    document.getElementById("displayAddress").textContent = address;
    document.getElementById("displayPhone").textContent = phone;
    
    document.getElementById("infoBox").classList.remove("hidden");
}