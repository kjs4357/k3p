document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleButton");
  toggleButton.addEventListener("click", toggleSidebar);
  const advancedLearning_btn = document.getElementById("advanced_learning");
  advancedLearning_btn.addEventListener("click", toggleSidebar);
});

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const vodWrapper = document.querySelector(".main_contents");

  if (sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
    vodWrapper.style.width = "100%";
  } else {
    sidebar.classList.add("active");
    vodWrapper.style.width = "calc(100% - 353px)";
  }
}

document
  .getElementById("video_material_btn")
  .addEventListener("click", function () {
    const video_material = document.getElementById("video_material_contents");
    const video_material_arrow = document.getElementById(
      "video_material_arrow"
    );
    const video_material_title = document.getElementById(
      "video_material_title"
    );

    if (video_material.style.display == "none") {
      video_material.style.display = "block";
      this.querySelector("div").textContent = "수업노트 가리기";
      video_material_arrow.style.transform = "rotate(180deg)";
      video_material_arrow.style.top = "-1px";
      video_material_arrow.style.left = "2px";
      document.getElementById("video_material_title").scrollIntoView({
        behavior: "smooth",
      });
    } else {
      video_material.style.display = "none";
      this.querySelector("div").textContent = "수업노트 보기";
      video_material_arrow.style.transform = "";
      video_material_arrow.style.top = "";
      video_material_arrow.style.left = "";
    }
  });

document
  .querySelector(".assignment_pop")
  .addEventListener("click", function () {
    const intro = document.getElementById("assign_intro");
    const detail = document.getElementById("assign_detail");
    const question_box = document.getElementById("questions_box");
    if (intro.style.display !== "none") {
      intro.style.display = "none";
      detail.style.display = "block"; // 과제 상세 표시
      question_box.style.height = "calc(100% - 485px)";
      question_box.style.maxHeight = "calc(100% - 485px)";
    } else {
      intro.style.display = "block"; // 과제 간단 표시
      detail.style.display = "none";
      question_box.style.height = "calc(100% - 122px)";
      question_box.style.maxHeight = "calc(100% - 122px)";
    }
  });
