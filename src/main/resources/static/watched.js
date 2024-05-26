document.addEventListener("DOMContentLoaded", function() {
  const watchedLecBtn = document.getElementById("watched_lec");
  const notWatchedSpan = document.getElementById("not_watched");
  const svgCheck = document.getElementById("svg_check");
  const currentLessonId = "1"; // 현재 강의 ID를 설정합니다. 실제로는 동적으로 설정해야 합니다.

  // 수강 완료 버튼 클릭 이벤트
  watchedLecBtn.addEventListener("click", function() {
    fetch("/api/userlessons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lessonId: currentLessonId })
    })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            notWatchedSpan.style.display = "none";
            svgCheck.style.display = "inline";
          } else {
            alert("수강 완료 처리에 실패했습니다.");
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
  });

  // 페이지 로드 시 해당 강의를 수강 완료했는지 확인
  fetch(`/api/userlessons/${currentLessonId}`)
      .then(response => response.json())
      .then(data => {
        if (data.completed) {
          notWatchedSpan.style.display = "none";
          svgCheck.style.display = "inline";
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
});
