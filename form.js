// Add event listener to button using jQuery
$("#submitButton").click(function() {
  const interviewType = $('input[name="type"]:checked').val();
  const numQuestions = $('#dropdown1').val();

  localStorage.setItem("interviewType", interviewType);

  // Navigate to new page
  window.location.href = "int_page.html";
});
