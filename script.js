const initialScript = "sE";
const initialToggle = document.getElementById(initialScript);
const toggles = Array.from(document.getElementsByClassName("box"));

const updateVisibility = target => {
  const visible = new Set(toggles.flatMap(box =>
    box.checked ? Array.from(document.querySelectorAll(".seg." + box.value)) : []
  ));
  document.querySelectorAll(".seg").forEach(node => {
    node.style.display = visible.has(node) ? "block" : "none";
  });
  if (initialToggle.indeterminate || target == initialToggle) {
    initialToggle.indeterminate = false;
    document.getElementById("facade").style.display = "none";
  }
};

document.getElementById("show-init").addEventListener("click", event => {
  document.getElementById("facade").style.display = "block";
  toggles.forEach(box => {
    box.checked = false;
    if (box.id == initialScript) {
      box.indeterminate = true;
    }
  });
  document.querySelectorAll(".seg").forEach(node => {
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
