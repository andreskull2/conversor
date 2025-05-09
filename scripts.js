async function getExchangeRates() {
    try {
        // Fazendo a requisição para a API
        const response = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=BRL,EUR,GBP");
        const data = await response.json();

        console.log("Dados da API:", data); // Verifique se os dados estão sendo recebidos corretamente

        // Verificando se a resposta foi bem-sucedida
        if (!data.success) {
            throw new Error('Erro na obtenção das cotações da API');
        }

        // Atualiza as cotações
        const USD = 1;  // Dólar é sempre 1
        const EUR = data.rates.EUR || 0;
        const GBP = data.rates.GBP || 0;
        const BRL = data.rates.BRL || 0;

        // Atualiza a cotação exibida
        description.textContent = `US$ 1 = ${formatCurrencyBRL(BRL)}`;

        // Atualiza o horário da última atualização
        const updatedAt = document.getElementById("updatedAt");
        const now = new Date();
        updatedAt.textContent = `Última atualização: ${now.toLocaleDateString("pt-BR")} às ${now.toLocaleTimeString("pt-BR")}`;

        // Retorna as cotações
        return { USD, EUR, GBP, BRL };

    } catch (error) {
        // Exibe o erro no console e alerta o usuário
        console.log("Erro ao buscar as cotações:", error);
        alert("Não foi possível obter as cotações. Tente novamente mais tarde.");
        
        // Retorna um objeto vazio para evitar erro de destructuring no código de chamada
        return { USD: 1, EUR: 0, GBP: 0, BRL: 0 }; // Garantir que sempre tenha valores definidos
    }
}

// Obtendo os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// Manipulando o input amount para receber somente números
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g;
    amount.value = amount.value.replace(hasCharactersRegex, "");
});

// Capturando o evento de submit (enviar) do formulário
form.onsubmit = async (event) => {
    event.preventDefault();

    // Obtendo as cotações mais recentes
    const { USD, EUR, GBP, BRL } = await getExchangeRates();

    // Verifique se o retorno da API contém valores válidos
    if (USD && EUR && GBP && BRL) {
        switch (currency.value) {
            case "USD":
                convertCurrency(amount.value, USD, "US$");
                break;
            case "EUR":
                convertCurrency(amount.value, EUR, "€");
                break;
            case "GBP":
                convertCurrency(amount.value, GBP, "£");
                break;
        }
    } else {
        console.error("Erro: Cotações inválidas.");
        alert("Erro ao buscar as cotações. Tente novamente mais tarde.");
    }
};

// Função para converter a moeda.
function convertCurrency(amount, price, symbol) {
    try {
        // Exibindo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

        // Calcula o total
        let total = amount * price;

        // Verifica se o resultado não é um número
        if (isNaN(total)) {
            return alert("Por favor, digite o valor corretamente para converter.");
        }

        // Formatar o valor total
        total = formatCurrencyBRL(total).replace("R$", "");

        // Exibe o resultado total
        result.textContent = `${total} Reais`;

        // Aplica a classe que exibe o footer para mostrar o resultado
        footer.classList.add("show-result");

    } catch (error) {
        // Remove a classe do footer removendo ele da tela
        footer.classList.remove("show-result");

        console.log(error);
        alert("Não foi possível converter. Tente novamente mais tarde.");
    }
}

// Formata a moeda em Real Brasileiro.
function formatCurrencyBRL(value) {
    // Converte para número para utilizar o toLocaleString para formatar no padrão BRL (R$ 00,00)
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}
