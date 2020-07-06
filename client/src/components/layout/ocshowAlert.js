const ocShowAlert = (message, background = "#3089cf") => {
  let alertContainer = document.querySelector("#oc-alert-container"),
    alertEl = document.createElement("div"),
    textNode = document.createTextNode(message);
  alertEl.setAttribute("class", "oc-alert-pop-up");
  alertEl.style.background = background;
  alertEl.appendChild(textNode);
  alertContainer.appendChild(alertEl);
  setTimeout(function () {
    alertEl.remove();
  }, 3000);
};

export default ocShowAlert;
