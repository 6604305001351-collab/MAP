function showInfo(title, detail) {
  document.getElementById("popup-text").innerHTML =
    "<strong>" + title + "</strong><br>" + detail;
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
