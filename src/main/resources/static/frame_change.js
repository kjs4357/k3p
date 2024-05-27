document.addEventListener("DOMContentLoaded", function () {
    const watchedLecBtn = document.getElementById("watched_lec");
    const lessonFrame = document.getElementById("lesson-frame");
    const infoTitle = document.getElementById("info_title");
    const nextLecBtn = document.getElementById("next_lec");
    const prevLecBtn = document.getElementById("previous_lec");
    const lec_selectors = document.querySelectorAll(".lec_selector");

    let currentLessonIndex = 0;
    let lessons = [];

    // 서버에서 강좌 목록을 가져오기
    fetch('/lessons')
        .then(response => response.json())
        .then(data => {
            lessons = data;
            if (lessons.length > 0) {
                updateLesson_seq(0);
                updateLecSelectorColors(); // 페이지 로드 시 lec_selector 색상 업데이트
            }
        })
        .catch(error => console.error('Error fetching lessons:', error));

    function updateLesson_seq(index) {
        lessonFrame.src = lessons[index].url;
        infoTitle.textContent = lessons[index].title;
        lessonFrame.dataset.lessonId = lessons[index].id;
        currentLessonIndex = index;

        // 수강 완료 상태 확인 및 버튼 상태 업데이트
        checkLessonCompleted(lessons[index].id);
    }

    function checkLessonCompleted(lessonId) {
        fetch(`/api/checkLessonCompleted/${lessonId}`)
            .then(response => response.json())
            .then(data => {
                const notWatchedSpan = document.getElementById("not_watched");
                const svgCheck = document.getElementById("svg_check");
                if (data.completed) {
                    notWatchedSpan.style.display = "none";
                    svgCheck.style.display = "block";
                } else {
                    notWatchedSpan.style.display = "block";
                    svgCheck.style.display = "none";
                }

                // lec_selector의 배경색 변경
                lec_selectors.forEach(selector => {
                    const selectorLessonId = selector.getAttribute('data-lesson-id');
                    if (data.completedLessons.includes(parseInt(selectorLessonId))) {
                        selector.style.backgroundColor = 'yellow';
                    } else {
                        selector.style.backgroundColor = ''; // 기본 배경색으로 초기화
                    }
                });
            })
            .catch(error => console.error('Error checking lesson completion:', error));
    }

    watchedLecBtn.addEventListener("click", function () {
        const lessonId = lessonFrame.dataset.lessonId;
        fetch('/api/completeLesson', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lessonId: lessonId })
        })
            .then(response => response.json())
            .then(data => {
                if (data.completed) {
                    const notWatchedSpan = document.getElementById("not_watched");
                    const svgCheck = document.getElementById("svg_check");
                    notWatchedSpan.style.display = "none";
                    svgCheck.style.display = "block";

                    // lec_selector의 배경색 변경
                    lec_selectors.forEach(selector => {
                        if (selector.getAttribute('data-lesson-id') == lessonId) {
                            selector.style.backgroundColor = 'yellow';
                        }
                    });
                } else {
                    alert("수강 완료 처리에 실패했습니다.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("수강 완료 처리에 실패했습니다.");
            });
    });

    nextLecBtn.addEventListener("click", function () {
        if (currentLessonIndex < lessons.length - 1) {
            currentLessonIndex++;
            updateLesson_seq(currentLessonIndex);
        } else {
            alert("마지막 강좌입니다.");
        }
    });

    prevLecBtn.addEventListener("click", function () {
        if (currentLessonIndex > 0) {
            currentLessonIndex--;
            updateLesson_seq(currentLessonIndex);
        } else {
            alert("첫 강좌입니다.");
        }
    });

    lec_selectors.forEach((button, index) => {
        button.addEventListener("click", function () {
            updateLesson_seq( 24 - index);
        });
    });

    function updateLecSelectorColors() {
        fetch('/api/completedLessons')
            .then(response => response.json())
            .then(data => {
                lec_selectors.forEach(selector => {
                    const selectorLessonId = selector.getAttribute('data-lesson-id');
                    if (data.completedLessons.includes(parseInt(selectorLessonId))) {
                        selector.style.backgroundColor = 'yellow';
                    } else {
                        selector.style.backgroundColor = ''; // 기본 배경색으로 초기화
                    }
                });
            })
            .catch(error => console.error('Error fetching completed lessons:', error));
    }
});