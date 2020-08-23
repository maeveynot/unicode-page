const initialScript = "sE";
const wideQuery = window.matchMedia('(min-width: 621px)');
const initialToggle = document.getElementById(initialScript);
const details = document.getElementById("st");
const toggles = Array.from(document.getElementsByClassName("box"));
const segments = Array.from(document.getElementsByClassName("seg"));
const facade = document.getElementById("facade");
const full = document.getElementById("full");

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
    full.style.display = "block";
  }
};

document.getElementById("show-init").addEventListener("click", event => {
  full.style.display = "none";
  facade.style.display = "block";
  toggles.forEach(box => {
    box.checked = false;
    if (box.id == initialScript) {
      box.indeterminate = true;
    }
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

const updateDetails = event => {
  details.open = wideQuery.matches;
};

window.addEventListener("orientationchange", event => {
  window.addEventListener("resize", updateDetails, {once: true});
});

requestAnimationFrame(timestamp => {
  initialToggle.indeterminate = true;
  updateDetails(null);
});
