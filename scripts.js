// Cotação de moedas do dia.
const USD = 5.69;
const EUR = 6.43;
const GBP = 7.56;

// Obtendo os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// Manipulando o input amount para receber somente números
amount.addEventListener("input", () => {
    
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")

    // console.log("Valor digitado:", amount.value) // ← Teste aqui
})

// Capturando o evento de submit (enviar) do formulário
form.onsubmit = (event) => {
    event.preventDefault()

    // console.log("Formulário enviado!") // ← Mostra se chegou aqui
    // console.log("Moeda escolhida:", currency.value) // ← Testa o select
    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break        
    }
}

// Função para converter a moeda.
function convertCurrency(amount, price, symbol) {
    // console.log("Convertendo:", amount, price, symbol) // ← Testa os dados recebidos
    
    try {
        // Exibindo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        // Calcula o total
        let total = amount * price

        // Exibe o resultado total
        result.textContent = total 

        // Aplica a classe que exibe o footer para mostrar o resultado
        footer.classList.add("show-result")
    } catch {
        // Remove a classe do footer removendo ele da tela
        footer.classList.remove("show-result")
        
        console.log(error)
        alert("Não foi possível converter. Tente novamente mais tarde.")
    }
}

// Formata a moeda em Real Brasileiro.
function formatCurrencyBRL(value) {
    
    // Converte para número para utilizar o toLocaleString para formatar no padrão BRL (R$ 00,00)
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}