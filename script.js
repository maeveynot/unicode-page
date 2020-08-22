const initialScript = "sE";
const initialToggle = document.getElementById(initialScript);
const toggles = Array.from(document.getElementsByClassName("box"));
const segments = Array.from(document.getElementsByClassName("seg"));
const facade = document.getElementById("facade");

const updateVisibility = target => {
  const visible = new Set(toggles.flatMap(box =>
    box.checked ? Array.from(document.querySelectorAll(".seg." + box.value)) : []
  ));
  segments.forEach(node => {
    node.style.display = visible.has(node) ? "block" : "none";
  });
  if (initialToggle.indeterminate || target == initialToggle) {
    initialToggle.indeterminate = false;
    facade.style.display = "none";
  }
};

document.getElementById("show-init").addEventListener("click", event => {
  facade.style.display = "block";
  toggles.forEach(box => {
    box.checked = false;
    if (box.id == initialScript) {
      box.indeterminate = true;
    }
  });
  segments.forEach(node => {
    node.style.display = "none";
  });
});
document.getElementById("show-rand").addEventListener("click", event => {
  toggles.forEach(box => {
    box.checked = Math.random() < 0.05;
  });
  updateVisibility(null);
});

toggles.forEach(box => {
  box.addEventListener("change", event => {
    updateVisibility(event.target);
  });
});

requestAnimationFrame(timestamp => {
  initialToggle.indeterminate = true;
  if (getComputedStyle(document.body).display == "flex") {
    document.getElementById("st").open = true;
  }
});
