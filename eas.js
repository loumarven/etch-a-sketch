function createGrids(gridCount) {
  let container = document.querySelector(".container");
  let containerStyles = window.getComputedStyle(container);
  let containerHeight = parseInt(containerStyles.getPropertyValue("height"));
  let containerWidth = parseInt(containerStyles.getPropertyValue("width"));

  /* remove previously created grids */
  container.innerHTML = "";

  for (let i = 0; i < gridCount; i++) {
    let gridRow = document.createElement("div");
    gridRow.classList.add("row");

    for (let j = 0; j < gridCount; j++) {
      let gridCol = document.createElement("div");
      gridCol.classList.add("col");
      gridCol.style.height = (containerHeight / gridCount).toString() + "px";
      gridCol.style.width = (containerWidth / gridCount).toString() + "px";

      gridRow.appendChild(gridCol);
    }

    container.appendChild(gridRow);
  }
}

/* create a 16 x 16 grid on page load */
window.addEventListener("load", createGrids(16));

let setGridBtn = document.querySelector("#set-grid");
setGridBtn.addEventListener("click", (e) => {
  let gridCount = prompt("Enter grid count:");
  createGrids(gridCount);
});
