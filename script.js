const boxes = Array.prototype.slice.call(document.getElementsByClassName('togglebox'));

const setVisibilityAll = (v) => {
  boxes.forEach(b => {
    b.checked = v;
  });
  document.querySelectorAll(".block").forEach(div => {
    div.style.display = v ? "block" : "none";
  });
};

const updateVisibility = () => {
  const visible = new Set();
  boxes.forEach(b => {
    if (b.checked) {
      document.querySelectorAll(".block." + b.value).forEach(div => {
        visible.add(div);
      });
    }
  });
  document.querySelectorAll(".block").forEach(div => {
    div.style.display = visible.has(div) ? "block" : "none";
  });
};

boxes.forEach(b => {
  b.addEventListener("change", e => updateVisibility());
});
document.getElementById("show-all").addEventListener("click", e => {
  setVisibilityAll(true)
});
document.getElementById("hide-all").addEventListener("click", e => {
  setVisibilityAll(false)
});
document.getElementById("reset").addEventListener("click", e => {
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
