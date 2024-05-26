document.addEventListener("DOMContentLoaded", function () {
  const navigationBarPlace = document.querySelector(".navigation_bar_place");
  const elements = navigationBarPlace.querySelectorAll(".scrollanimation");
  const animatedElements = document.querySelectorAll(
    ".scrollanimation.component_frame"
  );
  let lastScrollTop = 0; // 이전 스크롤 위치 저장
  let isScrolling; // 스크롤 상태 저장

  // 기존 CSS 애니메이션을 비활성화하는 함수
  function disableCssAnimation(element) {
    element.style.animation = "none";
  }

  // 새로운 애니메이션을 적용하는 함수
  function applyNewAnimation(element) {
    const currentTransform = getComputedStyle(element).transform;
    const translateYMatch = currentTransform.match(/matrix.*\((.+)\)/);
    const translateY = translateYMatch
      ? parseFloat(translateYMatch[1].split(", ")[5])
      : 0;

    element.style.animation = "none"; // 기존 애니메이션을 비활성화
    element.style.setProperty("--translateY", `${translateY}px`); // 현재 위치를 CSS 변수에 저장
    element.offsetHeight; // 강제로 리플로우 발생
    element.style.animation = "float 2s infinite alternate"; // 새로운 애니메이션 적용
  }

  navigationBarPlace.addEventListener("scroll", function () {
    clearTimeout(isScrolling);

    const scrollPosition = navigationBarPlace.scrollTop;
    const scrollDirection = scrollPosition > lastScrollTop ? "down" : "up";

    elements.forEach((element, index) => {
      if (element.classList.contains("component_frame")) {
        disableCssAnimation(element); // 스크롤 시 기존 CSS 애니메이션 비활성화
      }

      const delay = 0.1 * (index + 1); // 인덱스에 따른 지연 시간 설정
      const transitionDelay =
        scrollDirection === "down" ? 0.5 - delay / 2 : delay / 2;

      // 요소를 한 박자 늦게 따라오게 함
      element.style.transform = `translateY(${scrollPosition * 0.15}px)`;

      // 한 박자 늦게 따라오는 효과를 위해 트랜지션 시간 조정
      element.style.transitionDuration = `${transitionDelay}s`;
    });

    // 현재 스크롤 위치 저장
    lastScrollTop = scrollPosition;

    // 스크롤 종료 후 CSS 애니메이션을 다시 활성화
    isScrolling = setTimeout(() => {
      // 애니메이션 재적용 전에 트랜지션이 완료될 시간을 기다림
      setTimeout(() => {
        animatedElements.forEach((element) => {
          applyNewAnimation(element);
        });
      }, 500); // 트랜지션 시간이 0.5초이므로 500ms 후에 새로운 애니메이션 적용
    }, 200); // 스크롤 종료 후 200ms 후에 애니메이션 재적용 타이머 시작
  });
});
