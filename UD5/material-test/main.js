import "./style.css";

import "@material/web/all";

const dialog = document.getElementById("dialog");
const btnOpenDialog = document.getElementById("open-dialog");

btnOpenDialog.addEventListener("click", showDialog);

function showDialog() {
  dialog.show();
}
