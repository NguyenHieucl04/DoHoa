document.getElementById("showPreference").addEventListener("click", function() {
    const zingMp3Checkbox = document.getElementById("zingMp3");
    if (zingMp3Checkbox.checked) {
        alert("Bạn thích ZingMp3!");
    } else {
        alert("Bạn không thích ZingMp3.");
    }
});
