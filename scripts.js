let exchangeRates = {};

// Função para buscar as cotações de moedas
function fetchExchangeRates() {
  const url = 'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL'; // Cotações de USD, EUR, GBP

  // Fazendo o request para a API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("Resposta da API:", data);  // Verificando a resposta da API

      // Verifica se as cotações estão presentes na resposta
      if (data.USDBRL && data.EURBRL && data.GBPBRL) {
        exchangeRates = {
          USD: data.USDBRL.bid,
          EUR: data.EURBRL.bid,
          GBP: data.GBPBRL.bid
        };
        console.log("Cotações carregadas:", exchangeRates);
        enableForm();  // Habilita o formulário após carregar as cotações
      } else {
        throw new Error('Dados de câmbio não encontrados.');
      }
    })
    .catch(error => {
      console.error("Erro ao buscar cotações:", error);
      alert("Erro ao buscar cotações. Tente novamente mais tarde.");
      disableForm();  // Desabilita o formulário em caso de erro
    });
}

// Selecionando elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");
const button = form.querySelector("button");

// Inicializa as cotações da API assim que a aplicação carregar
fetchExchangeRates();

// Desabilitar o formulário até que as cotações estejam carregadas
function disableForm() {
  amount.disabled = true;
  currency.disabled = true;
  button.disabled = true;
  footer.classList.remove("show-result");
}

// Habilitar o formulário após as cotações estarem carregadas
function enableForm() {
  amount.disabled = false;
  currency.disabled = false;
  button.disabled = false;
}

// Remove caracteres não numéricos enquanto o usuário digita
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

// Quando o formulário for submetido
form.onsubmit = (event) => {
  event.preventDefault();

  const value = Number(amount.value);

  // Se o valor não for válido, alerta o usuário
  if (!value || isNaN(value)) {
    alert("Digite um valor válido para converter.");
    return;
  }

  // Se as cotações não foram carregadas ainda, informa o usuário
  if (Object.keys(exchangeRates).length === 0) {
    alert("As cotações ainda não foram carregadas. Tente novamente mais tarde.");
    return;
  }

  // Realiza a conversão de acordo com a moeda escolhida
  switch (currency.value) {
    case "USD":
      convertCurrency(value, exchangeRates.USD, "US$");
      break;
    case "EUR":
      convertCurrency(value, exchangeRates.EUR, "€");
      break;
    case "GBP":
      convertCurrency(value, exchangeRates.GBP, "£");
      break;
    default:
      alert("Escolha uma moeda para conversão.");
  }
}

// Função para realizar a conversão de moeda
function convertCurrency(amount, rate, symbol) {
  try {
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(rate)}`;
    let total = amount * rate;
    result.textContent = `${formatCurrencyBRL(total)}`;
    footer.classList.add("show-result");
  } catch (error) {
    footer.classList.remove("show-result");
    console.error(error);
    alert("Erro inesperado. Tente novamente.");
  }
}

// Função para formatar valores em moeda brasileira
function formatCurrencyBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}


