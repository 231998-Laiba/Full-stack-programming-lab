$(document).ready(function(){
  let currentStep = 0;
  const steps = $(".form-step");

  $(".next-step").click(function(){
    steps.eq(currentStep).addClass("d-none");
    currentStep++;
    steps.eq(currentStep).removeClass("d-none");
  });

  $(".prev-step").click(function(){
    steps.eq(currentStep).addClass("d-none");
    currentStep--;
    steps.eq(currentStep).removeClass("d-none");
  });

  $("#membershipForm").submit(function(e){
    e.preventDefault();
    alert("Thank you! Your Direct Debit instruction has been submitted.");
  });
});