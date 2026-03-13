const currencyFirst = document.getElementById('currency-first');
const worthFirst = document.getElementById('worth-first');
const currencySecond = document.getElementById('currency-second');
const worthSecond = document.getElementById('worth-second');
const exchangeRate = document.querySelector('.exchange-rate');

updateRate();

function updateRate(){
    fetch(`https://v6.exchangerate-api.com/v6/4b02e910311197cddff8bec7/latest/${currencyFirst.value}`).then((res) => res.json()).then((data) => {
        const rate = data.conversion_rates[currencySecond.value];
        exchangeRate.textContent = `1 ${currencyFirst.value} = ${rate} ${currencySecond.value}`;

        worthSecond.value = (worthFirst.value * rate).toFixed(2);
    });
}

currencyFirst.addEventListener('change', updateRate);
currencySecond.addEventListener('change', updateRate);
worthFirst.addEventListener('input', updateRate);
worthSecond.addEventListener('input', updateRate);