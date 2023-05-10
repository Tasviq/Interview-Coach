// add event listener to button
document.getElementById("submitButton").addEventListener("click", function() {
  const interviewType = document.querySelector('input[name="type"]:checked').value;

  const numQuestions = document.querySelector('#dropdown1').value;

  // store interview type in local storage
  localStorage.setItem("interviewType", interviewType);

  // navigate to new page
  window.location.href = "int_page.html";
});
