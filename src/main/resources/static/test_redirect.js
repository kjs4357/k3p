
document.addEventListener("DOMContentLoaded", function() {
    const test1Div = document.getElementById("test_1");
    const test2Div = document.getElementById("test_2");
    const test3Div = document.getElementById("test_3");
    const test4Div = document.getElementById("test_4");
    const test5Div = document.getElementById("test_5");

    test1Div.addEventListener("click", function() {
    window.location.href = "/test_1";
    });
    test2Div.addEventListener("click", function() {
        window.location.href = "/test_2";
    });
    test3Div.addEventListener("click", function() {
        window.location.href = "/test_3";
    });
    test4Div.addEventListener("click", function() {
        window.location.href = "/test_4";
    });
    test5Div.addEventListener("click", function() {
        window.location.href = "/test_5";
    });
});
