const input = document.getElementById("inputNumeros");
const selectMoneda = document.getElementById("selectorMoneda");
const btn = document.getElementById("btn");
const resultado = document.getElementById("resultado");

btn.addEventListener("click", () => {
  const valorIngresado = parseFloat(input.value);
  console.log(valorIngresado);
});
