const input = document.getElementById("inputNumeros")
const selectMoneda = document.getElementById("selectorMoneda")
const btn = document.getElementById("btn");
const resultado = document.getElementById("resultado")
const cargando = document.getElementById("load")



btn.addEventListener("click", async () => {
  
  let valorIngresado = parseFloat(input.value)
  const monedaSel = selectMoneda.value

  const valorMoneda = await traeMoneda(monedaSel);
  setTimeout(() => {
    const conv = valorIngresado / valorMoneda;
    resultado.textContent = `Resultado: ${conv.toFixed(2)} ${monedaSel}`
    renderGrafica()
  }, 1000);
});

async function traeMoneda(moneda) {
  try {
    cargando.style.display = "block"
    const res = await fetch("https://mindicador.cl/api")
    const data = await res.json()
    if (data[moneda]) {
      return data[moneda].valor;
    } else {
      console.error(`La moneda "${moneda}" no fue encontrada.`)
      alert("Moneda no válida.")
      return null;
    }
  } catch (error) {
    alert("Hubo un error en la carga...")
    return null;
  } finally {
    setTimeout(() => {
      cargando.style.display = "none"
    }, 1000)
  }
}

async function getAndCreateDataToChart() {
  const monedaSel = selectMoneda.value
  let endPoint = ""
  if(monedaSel === "dolar"){
    endPoint = "https://mindicador.cl/api/dolar"
  } if(monedaSel === "euro"){
    endPoint = "https://mindicador.cl/api/euro"
  }
  
  const res = await fetch(endPoint)
  const dolar = await res.json()
  const labels = dolar.serie.map((serie) => {
    return serie.fecha.substring(0, 10)
  })
  const data = dolar.serie.map((serie) => {
    return serie.valor
  })
  const datasets = [
    {
      label: `${monedaSel} ultimos días`,
      borderColor: "rgb(255, 99, 132)",
      data,
    },
  ];
  return { labels, datasets }
}



async function renderGrafica() {
  const data = await getAndCreateDataToChart();
  const config = {
    type: "line",
    data: {
      labels: data.labels,
      datasets: data.datasets,
    },
  };
  if (Chart.getChart("myChart")){
    Chart.getChart("myChart").destroy();
  }
  let myChart = document.getElementById("myChart")
  myChart.style.backgroundColor = "white"
  new Chart(myChart, config)
}

