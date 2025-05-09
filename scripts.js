let exchangeRates = {}

async function fetchExchangeRates() {
  try {
    const response = await fetch("https://v6.exchangerate-api.com/v6/20d0a2a98f4ddf43d315a9a9/latest/USD")
    const data = await response.json()

    exchangeRates = {
      USD: 1, // já está em USD
      EUR: data.conversion_rates.EUR / data.conversion_rates.USD,
      GBP: data.conversion_rates.GBP / data.conversion_rates.USD
    }
  } catch (error) {
    console.error("Erro ao buscar cotações:", error)
    alert("Não foi possível carregar as cotações. Tente novamente mais tarde.")
  }
}


// Obtendo os elementos do formulário.
const form = document.querySelector("form"); // formulário 
const amount = document.getElementById("amount"); // valor
const currency = document.getElementById("currency"); // moeda
const footer = document.querySelector("main footer"); 
const description = document.getElementById("description");
const result = document.getElementById("result");

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "")
});

// Captando o evento de submit (enviar) do formulário.
form.onsubmit = (event) => {
  event.preventDefault()


  switch (currency.value){
  case "USD":
    convertCurrency(amount.value, exchangeRates.USD, "US$");
    break
  case "EUR":
    convertCurrency(amount.value, exchangeRates.EUR, "€")
    break
  case "GBP":
    convertCurrency(amount.value, exchangeRates.GBP, "£")
    break
}

}

// Função para converter a moeda.
function convertCurrency(amount, price, symbol){
  try {
    // Exibindo a cotação da moeda selecionada
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    // Calcula o total
    let total = amount * price

    // Verifica se o resultado não é um número.
    if(isNaN(total)) {
        return alert("Por favor, digite o valor corretamente para converter.")
    }

    // Formata o total para Real Brasileiro
    total = formatCurrencyBRL(total).replace("R$", "")
    
    // Exibe o resultado total
    result.textContent = `${total} Reais` 


    // Aplica a classe que exibe o footer para mostrar o resultado
    footer.classList.add("show-result")
  } catch {
    
    // Remove a classe do footer removendo ele da tela
    footer.classList.remove("show-result")
    
    console.error(error)
    alert("Ocorreu um erro inesperado, tente novamente mais tarde.")
}
}

// Formata a moeda em Real Brasileiro
function formatCurrencyBRL (value) {
    // Converte para número para utilizar o toLocaleString para formatar no padrão BRL (R$ 00,00)
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}

fetchExchangeRates()