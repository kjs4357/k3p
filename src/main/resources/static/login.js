document.querySelector("#start_btn").addEventListener("click", function () {
  const modal = document.getElementById("login_modal");
  if (modal.style.display == "none") {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none"; // 과제 간단 표시
  }
});
document.getElementById("close_btn").addEventListener("click", function () {
  const modal = document.getElementById("login_modal");
  if (modal.style.display == "none") {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none"; // 과제 간단 표시
  }
});
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 27) {
    // ESC 키
    var modal = document.getElementById("login_modal");
    if (modal.style.display == "flex") {
      modal.style.display = "none";
    }
  }
});
document.getElementById("signup_btn").addEventListener("click", function () {
  const login_form = document.getElementById("login_form");
  const signup_form = document.getElementById("signup_form");
  const login_form_btn = document.getElementById("login_form_btn");
  const signup_form_btn = document.getElementById("signup_form_btn");
  const login_btn = document.getElementById("login_btn");
  const signup_btn = document.getElementById("signup_btn");

  if (signup_form.style.display == "none") {
    signup_form.style.display = "flex";
    signup_btn.style.color = "white";
    signup_form_btn.style.backgroundColor = "#a9d18e";
    login_form_btn.style.backgroundColor = "white";
    login_form.style.display = "none";
    login_btn.style.color = "#cacaca";
  }
});
document.getElementById("login_btn").addEventListener("click", function () {
  const login_form = document.getElementById("login_form");
  const signup_form = document.getElementById("signup_form");
  const login_form_btn = document.getElementById("login_form_btn");
  const signup_form_btn = document.getElementById("signup_form_btn");
  const login_btn = document.getElementById("login_btn");
  const signup_btn = document.getElementById("signup_btn");

  if (login_form.style.display == "none") {
    signup_form.style.display = "none";
    signup_btn.style.color = "#cacaca";
    signup_form_btn.style.backgroundColor = "white";
    login_form_btn.style.backgroundColor = "#a9d18e";
    login_form.style.display = "flex";
    login_btn.style.color = "white";
  }
});

function checkUserID() {
  var userID = document.getElementById("userID").value;
  console.log("Sending userID:", userID); // 전송할 userID 값을 콘솔에 출력
  fetch('/checkUserID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'userID=' + encodeURIComponent(userID)
  })
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log("response:", data);
          alert('사용가능한 아이디입니다.');
        } else {
          alert('이미 사용중인 아이디입니다.');
        }
      });
}

function checkUserEmail() {
  var userEmail = document.querySelector('input[name="userEmail"]').value;
  fetch('/checkUserEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'userEmail=' + encodeURIComponent(userEmail)
  })
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log("response:", data);
          alert('사용 가능한 Email입니다.');
        } else {
          alert('이미 사용중인 Email입니다.');
        }
      });
}
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("signup_form").addEventListener("submit", function(event) {
    if (!validateForm(event)) {
      event.preventDefault();
    }
  });
});

function validateForm(event) {
  const password = document.getElementById("userPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const userID = document.getElementById("userID").value;
  const userIDRegex = /^[a-zA-Z0-9]+$/; // 알파벳 대소문자와 숫자만 허용

  let isValid = true;

  if (!userIDRegex.test(userID)) {
    alert("ID에는 특수문자를 사용할 수 없습니다.");
    isValid = false;
  }
  if (password !== confirmPassword) {
    alert("password가 일치하지 않습니다.");
    isValid = false;
  }
  if (!isValid) {
    event.preventDefault(); // 폼 제출을 막음
  }
  return isValid;
}