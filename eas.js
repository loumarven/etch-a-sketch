/* CONSTANTS */
const WHITE_BG = "rgb(255, 255, 255)";
const BLACK_BG = "rgb(0, 0, 0)";

/* GLOBALS */
let container = document.querySelector(".grid-container");
let containerStyles = window.getComputedStyle(container);
let containerHeight = parseInt(containerStyles.getPropertyValue("height"));
let containerWidth = parseInt(containerStyles.getPropertyValue("width"));

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setBackgroundOnHover(e) {
  let r, g, b, rgbArr, currColor, rgbColor;

  currColor = e.target.style.backgroundColor;

  if (currColor === WHITE_BG) {
    r = getRandomInt(0, 255);
    g = getRandomInt(0, 255);
    b = getRandomInt(0, 255);

    this.rsubt = Math.ceil(r / 10);
    this.gsubt = Math.ceil(g / 10);
    this.bsubt = Math.ceil(b / 10);
  } else {
    if (currColor === BLACK_BG) {
      return;
    }

    rgbArr = currColor.split(",");

    r = parseInt(rgbArr[0].slice(4));
    r = (r - this.rsubt) < 0 ? 0 : r - this.rsubt;

    g = parseInt(rgbArr[1].slice(1));
    g = (g - this.gsubt) < 0 ? 0 : g - this.gsubt;

    b = parseInt(rgbArr[2].slice(1, -1));
    b = (b - this.bsubt) < 0 ? 0 : b - this.bsubt;
  }

  rgbColor = "rgb(" +
                    r.toString() + "," +
                    g.toString() + "," +
                    b.toString() +
                  ")";
  e.target.style.backgroundColor = rgbColor;
}

function createGrids(gridCount) {
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
      gridCol.style.backgroundColor = WHITE_BG;
      gridCol.addEventListener("mouseover", setBackgroundOnHover);

      gridRow.appendChild(gridCol);
    }

    container.appendChild(gridRow);
  }
}

/* create a 16 x 16 grid on page load */
window.addEventListener("load", (e) => {
  createGrids(16);
});

let setGridBtn = document.querySelector("#set-grid");
setGridBtn.addEventListener("click", (e) => {
  let gridCount = 0;
  do {
    gridCount = prompt("Enter grid count with min val of 1, max of 100 (eg. 20 for 20x20 grid):");
  } while (isNaN(gridCount) || gridCount < 1 || gridCount > 100);
  createGrids(gridCount);
});

let clearBtn = document.querySelector("#clear-colors");
clearBtn.addEventListener("click", (e) => {
  let colDiv = document.querySelectorAll(".col");

  colDiv.forEach(col => {
    col.style.backgroundColor = WHITE_BG;
  });
});

let defaultBtn = document.querySelector("#set-default");
defaultBtn.addEventListener("click", (e) => {
  createGrids(16);
});
