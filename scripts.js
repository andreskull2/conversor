// Elementos do DOM
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const description = document.getElementById("description");
const result = document.getElementById("result");
const updatedAt = document.getElementById("updatedAt");
const footer = document.querySelector("footer");

// Só permite números no input
amount.addEventListener("input", () => {
    amount.value = amount.value.replace(/^0+/, "").replace(/\D+/g, "");
});

// Função para formatar como Real (BRL)
function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Função para buscar as taxas de câmbio
async function getExchangeRates() {
    try {
        const response = await fetch("https://v6.exchangerate-api.com/v6/20d0a2a98f4ddf43d315a9a9/latest/USD");
        const data = await response.json();

        if (data.result !== 'success') {
            throw new Error('Erro na API de câmbio');
        }

        const rates = data.conversion_rates;

        return {
            USD: rates.BRL,
            EUR: rates.BRL / rates.EUR,
            GBP: rates.BRL / rates.GBP
        };

    } catch (error) {
        console.log("Erro ao obter as cotações:", error);
        alert("Erro ao buscar cotações. Tente novamente mais tarde.");
        return {};
    }
}

// Função principal para conversão e exibição
async function convertCurrency() {
    const { USD, EUR, GBP } = await getExchangeRates();

    const value = Number(amount.value);
    if (!value || value <= 0) {
        return alert("Digite um valor numérico maior que zero.");
    }

    let total = 0;
    let symbol = "";

    switch (currency.value) {
        case "USD":
            total = value * USD;
            symbol = "US$";
            description.textContent = `${symbol} 1 = ${formatCurrencyBRL(USD)}`;
            break;
        case "EUR":
            total = value * EUR;
            symbol = "€";
            description.textContent = `${symbol} 1 = ${formatCurrencyBRL(EUR)}`;
            break;
        case "GBP":
            total = value * GBP;
            symbol = "£";
            description.textContent = `${symbol} 1 = ${formatCurrencyBRL(GBP)}`;
            break;
        default:
            return alert("Moeda não reconhecida.");
    }

    result.textContent = `${formatCurrencyBRL(total)} Reais`;

    const now = new Date();
    updatedAt.textContent = `Última atualização: ${now.toLocaleDateString("pt-BR")} às ${now.toLocaleTimeString("pt-BR")}`;

    footer.classList.add("show-result");
}

// Evento de envio do formulário
form.onsubmit = (event) => {
    event.preventDefault();
    convertCurrency();
};

// Evento de atualização ao digitar ou alterar a moeda
amount.addEventListener("input", convertCurrency);
currency.addEventListener("change", convertCurrency);
