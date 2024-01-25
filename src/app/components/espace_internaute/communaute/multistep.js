// multiStepForm.js
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");
  const formSteps = form.querySelectorAll(".form-step");
  const steps = document.querySelectorAll(".step");
  let currentStep = 0;

  const showStep = (stepIndex) => {
    formSteps.forEach((step, index) => {
      step.classList.remove("active");
      steps[index].classList.remove("active");
    });

    formSteps[stepIndex].classList.add("active");
    steps[stepIndex].classList.add("active");
  };

  document.querySelectorAll(".next").forEach((button) => {
    button.addEventListener("click", () => {
      if (currentStep < formSteps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  document.querySelectorAll(".prev").forEach((button) => {
    button.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Ajoutez ici la logique pour traiter le formulaire
  });
});
