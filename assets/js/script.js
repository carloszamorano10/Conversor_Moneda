const input = document.getElementById("inputNumeros");
const selectMoneda = document.getElementById("selectorMoneda");
const btn = document.getElementById("btn");
const resultado = document.getElementById("resultado");
const cargando = document.getElementById("load");

btn.addEventListener("click", async () => {
  const valorIngresado = parseFloat(input.value);
  const monedaSel = selectMoneda.value;

  const valorMoneda = await traeMoneda(monedaSel);
  if (valorMoneda) {setTimeout(()=>{
    const conv = valorIngresado / valorMoneda;
    resultado.textContent = `Resultado: ${conv.toFixed(2)} ${monedaSel}` 
  },1000)
  }
});

async function traeMoneda(moneda) {
  try {
    cargando.style.display = "block";
    const res = await fetch("https://mindicador.cl/api");
    const data = await res.json();
    if (data[moneda]) {
      return data[moneda].valor;
    } else {
      console.error(`La moneda "${moneda}" no fue encontrada.`);
      alert("Moneda no válida.");
      return null;
    }
  } catch (error) {
    alert("Hubo un error en la carga...");
    return null;
  } finally {
    setTimeout(() => {
      cargando.style.display = "none";
    }, 1000);
  }
}
