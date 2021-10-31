function calculateBmi() {
  const form = document.getElementsByTagName("form")[0];

  if (form.checkValidity()) {
    document
      .getElementById("required-fields-error")
      .classList.add("visually-hidden");

    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const select = document.getElementById("gender");
    const gender = select.options[select.selectedIndex].value;

    const bmi = (weight / ((height * height) / 10000)).toFixed(1);

    document.getElementById("calculated-bmi").innerText = bmi;

    document.getElementById(this.highlightRow(bmi)).classList.add("bg-yellow");

    if (gender == "female") {
      document
        .getElementById("ideal-weight")
        .classList.remove("visually-hidden");
      document.getElementById("calculated-ideal-weight").innerText = (
        45.5 +
        0.91 * (height - 152.4)
      ).toFixed();
    } else if (gender == "male") {
      document
        .getElementById("ideal-weight")
        .classList.remove("visually-hidden");
      document.getElementById("calculated-ideal-weight").innerText = (
        50 +
        0.91 * (height - 152.4)
      ).toFixed();
    } else {
      document.getElementById("ideal-weight").classList.add("visually-hidden");
    }
  } else {
    document
      .getElementById("required-fields-error")
      .classList.remove("visually-hidden");
  }
}

function highlightRow(bmi) {
  document.querySelectorAll(".bg-yellow").forEach(function (row) {
    row.classList.remove("bg-yellow");
  });

  if (bmi < 18.5) return "underweight";
  if (bmi >= 18.5 && bmi < 25) return "normal";
  if (bmi >= 25 && bmi < 30) return "overweight";
  if (bmi >= 30 && bmi < 35) return "obese-type-1";
  if (bmi >= 35 && bmi < 40) return "obese-type-2";
  if (bmi >= 40) return "obese-type-3";
}
