function toggleWindow(windowId, position, scale, appearStyle = !1) {
  if (windowId == "") {
    windowId = null;
  }
  const windowNew = document.querySelector(windowId);
  if (windowNew) {
    transparent = windowNew.closest("transparent");
  } else {
    windowActive = document.querySelector("window.active");
    if (!windowActive) {
      return;
    }
    transparent = windowActive.closest("transparent");
  }
  if (transparent.hasAttribute("data-beautiful_transparent")) {     
    transparent.removeAttribute("data-beautiful_transparent");
  }
  const activeWindow = transparent.querySelector("window.active");
  function closingAnimation() {
    if (transparent.hasAttribute("closing")) {
      transparent.classList.remove("active");
      transparent.removeAttribute("closing");
      activeWindow.classList.remove("active");
    }
  }
  if (activeWindow) {
    if (transparent.hasAttribute("closing")) {
      return;
    }
    transparent.setAttribute("closing", "");
    transparent.addEventListener(
      "animationend",
      () => {
        closingAnimation();
      },
      { once: !0 }
    );
    return;
  }
  if (
    transparent.hasAttribute("closing") &&
    transparent.classList.contains("active")
  ) {
    transparent.removeAttribute("closing");
  }
  transparent.classList.remove("dynamic", "right", "left", "top", "bottom");
  if (!windowNew) {
    return;
  }
  transparent.classList.add("active");
  localStorage.setItem("currentWindow", windowId);
  if (event && event.currentTarget) {
    element = event.currentTarget;
    windowNew.classList.remove("not-animated");
  } else {
    element = null;
    windowNew.classList.add("not-animated");
  }
  if (position == "absolute") {
    windowNew.classList.add("absolute");
    var rect = element.getBoundingClientRect();
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    if (rect.left < screenWidth / 2) {
      windowNew.style.right = "unset";
      windowNew.style.left = Math.round(rect.left) + "px";
      transparent.classList.add("left");
    } else {
      windowNew.style.left = "unset";
      windowNew.style.right = screenWidth - Math.round(rect.right) + "px";
      transparent.classList.add("right");
    }
    if (rect.top < screenHeight / 2) {
      windowNew.style.bottom = "unset";
      windowNew.style.top =
        Math.round(rect.top) + Math.round(rect.height) + 8 + "px";
      if (appearStyle) {
        windowNew.style.top = Math.round(rect.top) + "px";
      }
      transparent.classList.add("top");
    } else {
      windowNew.style.top = "unset";
      windowNew.style.bottom =
        screenHeight -
        Math.round(rect.bottom) +
        Math.round(rect.height) +
        8 +
        "px";
      if (appearStyle) {
        windowNew.style.bottom = screenHeight - Math.round(rect.bottom) + "px";
      }
      transparent.classList.add("bottom");
    }
  }
  if (scale === undefined) {
    scale = 0;
  } else {
    scale = 1;
  }
  animate(element, windowNew, position, scale);
}
function animate(element, windowNew, position, scale) {
  let easeType = CustomEase.create(
    "custom",
    "M0,0 C0.308,0.19 0.107,0.633 0.288,0.866 0.382,0.987 0.656,1 1,1 "
  );
  if (position === "absolute" && window.innerWidth >= 681) {
    easeType = CustomEase.create(
      "custom",
      "M0,0 C0.249,-0.124 0.04,0.951 0.335,1 0.684,1.057 0.614,0.964 1,1"
    );
  }
  if (scale === 0 || window.innerWidth >= 681) {
    var scaleValue = !0;
  } else {
    var scaleValue = !1;
  }
  let state = Flip.getState(element);
  windowNew.classList.toggle("active");
  Flip.from(state, {
    targets: windowNew,
    duration: 0.7,
    scale: scaleValue,
    ease: easeType,
    absolute: !0,
  });
}
function closeWindow(windowId) {
  const windowEl = document.querySelector(windowId);
  if (!windowEl) return;
  const transparent = windowEl.closest("transparent");
  if (!transparent) return;
  transparent.setAttribute("closing", "");
  transparent.addEventListener(
    "animationend",
    () => {
      transparent.classList.remove("active");
      transparent.removeAttribute("closing");
      windowEl.classList.remove("active");
    },
    { once: !0 }
  );
}
function animateFlip(windowNew, position, scale) {
  let easeType = CustomEase.create(
    "custom",
    "M0,0 C0.308,0.19 0.107,0.633 0.288,0.866 0.382,0.987 0.656,1 1,1"
  );
  if (position === "absolute" && window.innerWidth >= 681) {
    easeType = CustomEase.create(
      "custom",
      "M0,0 C0.249,-0.124 0.04,0.951 0.335,1 0.684,1.057 0.614,0.964 1,1"
    );
  }
  const scaleValue = scale === 0 || window.innerWidth >= 681;
  const state = Flip.getState(windowNew);
  Flip.from(state, {
    targets: windowNew,
    duration: 0.7,
    scale: scaleValue,
    ease: easeType,
    absolute: !0,
  });
}
