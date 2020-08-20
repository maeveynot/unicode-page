const initialScript = "sE";
const toggles = Array.from(document.getElementsByClassName("box"));

const initToggles = () => {
  if (!toggles.some(box => box.checked)) {
    document.getElementById(initialScript).checked = true;
  }
};

const updateVisibility = () => {
  const visible = new Set(toggles.flatMap(box =>
    box.checked ? Array.from(document.querySelectorAll(".seg." + box.value)) : []
  ));
  document.querySelectorAll(".seg").forEach(node => {
    node.style.display = visible.has(node) ? "block" : "none";
  });
};

const setAllToggles = (predicate) => {
  toggles.forEach(box => {
    box.checked = predicate(box);
  });
  updateVisibility();
};

document.getElementById("show-init").addEventListener("click", event => {
  setAllToggles(box => box.id == initialScript);
});
document.getElementById("show-rand").addEventListener("click", event => {
  setAllToggles(box => Math.random() < 0.05);
});
toggles.forEach(box => {
  box.addEventListener("change", event => {
    updateVisibility();
  });
});

requestAnimationFrame(timestamp => {
  initToggles();
  updateVisibility();
  if (getComputedStyle(document.body).display == "flex") {
    document.getElementById("st").open = true;
  }
  document.getElementById("facade").remove();
});
