const boxes = Array.prototype.slice.call(document.getElementsByClassName('box'));

const setVisibilityAll = (v) => {
  boxes.forEach(b => {
    b.checked = v;
  });
  document.querySelectorAll(".seg").forEach(div => {
    div.style.display = v ? "block" : "none";
  });
};

const updateVisibility = () => {
  const visible = new Set();
  boxes.forEach(b => {
    if (b.checked) {
      document.querySelectorAll(".seg." + b.value).forEach(div => {
        visible.add(div);
      });
    }
  });
  document.querySelectorAll(".seg").forEach(div => {
    div.style.display = visible.has(div) ? "block" : "none";
  });
};

boxes.forEach(b => {
  b.addEventListener("change", e => updateVisibility());
});
document.getElementById("show-none").addEventListener("click", e => {
  setVisibilityAll(false)
});
document.getElementById("show-init").addEventListener("click", e => {
  boxes.forEach(b => {
    b.checked = (b.id == "sE");
  });
  updateVisibility();
});

requestAnimationFrame(t => {
  if (!boxes.find(b => b.checked)) {
    document.getElementById("sE").checked = true;
  }
  updateVisibility();
  document.getElementById("facade").remove();
});
