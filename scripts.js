let exchangeRates = {}

async function fetchExchangeRates() {
  try {
    const response = await fetch("https://api.exchangerate.host/latest?base=BRL")
    const data = await response.json()

    // Pegando o valor de 1 unidade da moeda estrangeira em reais (invertendo)
    exchangeRates = {
      USD: 1 / data.rates.USD,
      EUR: 1 / data.rates.EUR,
      GBP: 1 / data.rates.GBP
    }
  } catch (error) {
    console.error("Erro ao buscar cotações:", error)
    alert("Não foi possível carregar as cotações. Tente novamente mais tarde.")
  }
}

const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "")
})

form.onsubmit = (event) => {
  event.preventDefault()

  const value = Number(amount.value)

  if (!value || isNaN(value)) {
    alert("Digite um valor válido para converter.")
    return
  }

  switch (currency.value) {
    case "USD":
      convertCurrency(value, exchangeRates.USD, "US$")
      break
    case "EUR":
      convertCurrency(value, exchangeRates.EUR, "€")
      break
    case "GBP":
      convertCurrency(value, exchangeRates.GBP, "£")
      break
    default:
      alert("Escolha uma moeda para conversão.")
  }
}

function convertCurrency(amount, rate, symbol) {
  try {
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(rate)}`
    let total = amount * rate
    result.textContent = `${formatCurrencyBRL(total)}`
    footer.classList.add("show-result")
  } catch (error) {
    footer.classList.remove("show-result")
    console.error(error)
    alert("Erro inesperado. Tente novamente.")
  }
}

function formatCurrencyBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
}

// Inicializa
fetchExchangeRates()
