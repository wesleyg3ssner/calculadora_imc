const btnSortImc = document.querySelector("#sortImc");
const alertNode = document.querySelector(".alert");

function verifyInput() {
  const weight = Number(document.querySelector("#weight").value);
  const height = Number(document.querySelector("#height").value);

  if (typeof weight !== "number" || typeof height !== "number") {
    throw Error("Todos os campos precisam ser números!");
  }
  if (isNaN(weight) || isNaN(height)) {
    throw Error("Digite todos os campos corretamente.");
  }
  if (weight <= 0 || height <= 0) {
    throw Error("Peso/Altura não pode ser zero ou número negativo.");
  }

  console.log(weight, height);
  return {
    weight,
    height,
  };
}
function calcImc(_data) {
  const data = _data();

  return Math.round(data.weight / (data.height * data.height));
}

function sortImc(_calcImc) {
  const imc = _calcImc(verifyInput);

  if (imc < 16.9) {
    alertNode.innerHTML = `Muito abaixo do peso.<br> IMC: ${imc}`;
  } else if (imc < 18.4) {
    alertNode.innerHTML = `Abaixo do peso.<br> IMC: ${imc}`;
  } else if (imc < 24.9) {
    alertNode.innerHTML = `Peso normal.<br> IMC: ${imc}`;
  } else if (imc < 29.9) {
    alertNode.innerHTML = `Acima do peso.<br> IMC: ${imc}`;
  } else if (imc < 34.9) {
    alertNode.innerHTML = `Obesidade Grau I.<br> IMC: ${imc}`;
  } else if (imc < 40) {
    alertNode.innerHTML = `Obesidade Grau II.<br> IMC: ${imc}`;
  } else {
    alertNode.innerHTML = `Obesidade Grau III.<br> IMC: ${imc}`;
  }
}

btnSortImc.addEventListener("click", (event) => {
  event.preventDefault();
  alertNode.classList.remove("hidden");
  try {
    sortImc(calcImc);
    if (alertNode.classList.contains("alert-warning")) {
      alertNode.classList.replace("alert-warning", "alert-info");
    }

    alertNode.classList.add("alert-info");
  } catch (error) {
    alertNode.innerHTML = error.message;
    alertNode.classList.add("alert-warning");
  }
});
