const WHITE_BG = "rgb(255, 255, 255)";
const BLACK_BG = "rgb(0, 0, 0)";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setBackgroundOnHover(e) {
  let r, g, b, rgbArr, currColor, rgbColor;

  currColor = e.target.style.backgroundColor;
  console.log("===currColor:",currColor);
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

    console.log("old:", currColor);
    rgbArr = currColor.split(",");
    r = ((parseInt(rgbArr[0].slice(4)) - this.rsubt) < 0) ? 0 :
          parseInt(rgbArr[0].slice(4)) - this.rsubt;
    g = ((parseInt(rgbArr[1].slice(1)) - this.gsubt) < 0) ? 0 :
          parseInt(rgbArr[1].slice(1)) - this.gsubt;
    b = ((parseInt(rgbArr[2].slice(1, -1)) - this.bsubt) < 0) ? 0 :
          parseInt(rgbArr[2].slice(1, -1)) - this.bsubt;
  }

  rgbColor = "rgb(" +
                    r.toString() + "," +
                    g.toString() + "," +
                    b.toString() +
                  ")";
  console.log("new:", rgbColor);
  e.target.style.backgroundColor = rgbColor;
}

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
      gridCol.style.backgroundColor = WHITE_BG;
      gridCol.addEventListener("mouseover", setBackgroundOnHover);

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
  return;
});

let clearBtn = document.querySelector("#clear-colors");
clearBtn.addEventListener("click", (e) => {
  let colDiv = document.querySelectorAll(".col");

  colDiv.forEach(col => {
    col.style.backgroundColor = WHITE_BG;
  });
});
