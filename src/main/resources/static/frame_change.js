document.addEventListener("DOMContentLoaded", function () {
    const nextLecBtn = document.getElementById("next_lec");
    const prevLecBtn = document.getElementById("previous_lec");
    const lessonFrame = document.getElementById("lesson-frame");
    const infoTitle = document.getElementById("info_title");
    const lec_selector = document.querySelectorAll(".lec_selector");
    let currentLessonIndex = 0;
    let lessons = [];

    // 서버에서 강좌 목록을 가져오기
    fetch('/lessons')
        .then(response => response.json())
        .then(data => {
            lessons = data;
            if (lessons.length > 0) {
                lessonFrame.src = lessons[currentLessonIndex].url;
            }
        })
        .catch(error => console.error('Error fetching lessons:', error));

    function updateLesson_seq(index) {
        lessonFrame.src = lessons[currentLessonIndex].url;
        infoTitle.textContent = lessons[currentLessonIndex].title;
    }

    nextLecBtn.addEventListener("click", function () {
        if (currentLessonIndex < lessons.length - 1) {
            currentLessonIndex++;
            updateLesson_seq();
        } else {
            alert("마지막 강좌입니다.");
        }
    });
    prevLecBtn.addEventListener("click", function () {
        if (currentLessonIndex > 0) {
            currentLessonIndex--;
            updateLesson_seq();
        } else {
            alert("첫 강좌입니다.");
        }
    });

    function updateLesson(index) {
        if (index >= 0 && index < lessons.length) {
            lessonFrame.src = lessons[24 - index].url;
            infoTitle.textContent = lessons[24 - index].title;
            currentLessonIndex = 24 - index;
        }
    }
    lec_selector.forEach((button, index) => {
        button.addEventListener("click", function () {
            updateLesson(index);
        });
    });

});