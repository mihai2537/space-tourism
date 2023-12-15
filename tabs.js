const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener("keydown", changeTabFocus);

tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});

function changeTabFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;
  const tabArray = [...tabs];

  if (e.keyCode !== keydownLeft && e.keyCode !== keydownRight) return;

  const currentTab = tabArray.find(
    (tab) => tab.getAttribute("tabindex") === "0"
  );
  const currentIndex = tabArray.findIndex(
    (tab) => tab.getAttribute("tabindex") === "0"
  );

  let leftIndex = currentIndex - 1;
  leftIndex = leftIndex < 0 ? tabArray.length - 1 : leftIndex;

  const rightIndex = (currentIndex + 1) % tabArray.length;
  const nextIndex = keydownLeft === e.keyCode ? leftIndex : rightIndex;
  const nextTab = tabArray[nextIndex];

  // currentTab.setAttribute("aria-selected", false);
  currentTab.setAttribute("tabindex", -1);

  // nextTab.setAttribute("aria-selected", true);
  nextTab.setAttribute("tabindex", 0);
  nextTab.focus();
}

function changeTabPanel(e) {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute("aria-controls");
  const targetImage = targetTab.getAttribute("data-image");

  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute("aria-selected", false);

  targetTab.setAttribute("aria-selected", true);

  // Make all panels hidden
  // Make the clicked panel visible
  hideContent(mainContainer, '[role="tabpanel"]');
  showContent(mainContainer, `#${targetPanel}`);

  // hide all pictures
  // show the picture coresponding to the c;icked panel
  hideContent(mainContainer, "picture");
  showContent(mainContainer, `#${targetImage}`);
}

function hideContent(parent, content) {
  // Make all panels hidden
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute("hidden");
}
