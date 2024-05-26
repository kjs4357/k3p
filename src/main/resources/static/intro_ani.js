document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");
  let currentSection = 0;
  let isScrolling = false;

  function changeSection(direction) {
    sections[currentSection].classList.remove("active");
    currentSection =
      (currentSection + direction + sections.length) % sections.length;
    sections[currentSection].classList.add("active");
    setTimeout(() => {
      isScrolling = false;
    }, 2000); // Change this value to adjust the debounce duration
  }

  function handleScroll(event) {
    if (isScrolling) return;

    if (event.deltaY > 0) {
      // Scroll down
      changeSection(1);
    } else {
      // Scroll up
      changeSection(-1);
    }

    isScrolling = true;
  }

  window.addEventListener("wheel", handleScroll);

  // 페이지가 로드될 때 초기 상태를 설정합니다.
  sections[currentSection].classList.add("active");

  // 앵커 링크 클릭 이벤트 처리
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      sections[currentSection].classList.remove("active");
      currentSection = Array.from(sections).indexOf(targetSection);
      sections[currentSection].classList.add("active");
    });
  });
});
