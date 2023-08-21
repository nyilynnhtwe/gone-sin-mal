const generateBtn = document.getElementById('generateBtn');
const cardNumberOutput = document.getElementById('cardNumber');
const expirationDateOutput = document.getElementById('expirationDate');
const cvvOutput = document.getElementById('cvv');

generateBtn.addEventListener('click', () => {
  let randomCardNumber = generateRandomNumber(16);
  const expirationDate = generateExpirationDate();
  const randomCVV = generateRandomNumber(3);

  cardNumberOutput.textContent = `${randomCardNumber}|${expirationDate}|${randomCVV}`;
});

function generateRandomNumber(length) {
  let number = '';
  let checkCCValid = false;
  while(!checkCCValid)
  {
    for (let i = 0; i < length; i++) {
        if(i<1)
        {
            number += Math.floor(Math.random() * 2) + 4;
        }
        else
        {
            number += Math.floor(Math.random() * 10);
        }
      }
      checkCCValid = isCreditCardValid(number);
      if(!checkCCValid)
      {
        number = '';
      }
  }
  return number;
}

function generateExpirationDate() {
  const currentYear = new Date().getFullYear();
  const futureYear = currentYear + Math.floor(Math.random() * 5); // Generate a random year within the next 5 years
  const month = Math.floor(Math.random() * 12) + 1; // Generate a random month (1-12)
  return `${month.toString().padStart(2, '0')}|${futureYear.toString().substr(-2)}`;
}



function isCreditCardValid(number) {
    if (!/^\d+$/.test(number)) {
      return false;
    }

    const reversedDigits = Array.from(number).map(Number).reverse();
    let total = 0;

    for (let i = 0; i < reversedDigits.length; i++) {
      if (i % 2 !== 0) {
        const doubledDigit = reversedDigits[i] * 2;
        total += doubledDigit <= 9 ? doubledDigit : doubledDigit - 9;
      } else {
        total += reversedDigits[i];
      }
    }

    return total % 10 === 0;
  }