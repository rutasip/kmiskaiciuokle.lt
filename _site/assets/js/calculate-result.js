function getResult() {
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const bmi = (weight / ((height * height) / 10000)).toFixed(1);
    document.getElementById("calculatedBMI").innerText = bmi;
}