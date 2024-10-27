document.getElementById("buttonGender").addEventListener("click", function() {
  const selectedGender = document.querySelector('input[name="gender"]:checked');
  if (selectedGender) {
    alert("Giới tính đã chọn: " + selectedGender.value);
  } else {
    alert("Vui lòng chọn giới tính.");
  }
});
