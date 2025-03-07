(() => {
  // Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

function createNumbersArray(count) {
  const deck = [];
  for (let i = 1; i <= count; i++) {
    deck.push(i, i);
  }
  return deck
}

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

function shuffle(arr) {
  for ( let i = 0; i < arr.length; ++i) {
    let j = Math.floor(Math.random() * (arr.length));
     temp = arr[i];
     arr[i] = arr[j];
     arr[j] = temp;
  }
  return arr

}

const game = document.getElementById('game')
let firstCard = null;
let secondCard = null;

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

function startGame(count) {
  const name = document.createElement('h1');
  name.classList.add('name');
  name.textContent = 'Игра в пары'
  game.before(name)

  const deck = shuffle(createNumbersArray(count));

  for ( cardNum of deck) {
    const card = document.createElement('div')
    card.textContent = cardNum;
    card.classList.add('card', 'cardClosed', `card${cardNum}`)

    game.append(card)

    card.addEventListener('click', () => {
      if (card.classList.contains('success') || card.classList.contains('open')) {
        return
      }

      if (firstCard !== null && secondCard !== null) {
        firstCard.classList.add('cardClosed')
        secondCard.classList.add('cardClosed')
        firstCard.classList.remove('open')
        secondCard.classList.remove('open')

        firstCard = null;
        secondCard = null;
        }

      card.classList.remove('cardClosed');
      card.classList.add('open');

      if (firstCard === null) {
        firstCard = card
      } else {
        secondCard = card
      }

      if (firstCard !== null && secondCard !== null) {
        const firstCardNum = firstCard.textContent;
        const secondCardNum = secondCard.textContent;

        if (firstCardNum === secondCardNum) {
          firstCard.classList.add('success')
          secondCard.classList.add('success')

          firstCard = null;
          secondCard = null;
        }

        if (deck.length === document.querySelectorAll(".success").length) {
          const newGame = document.createElement('div');
          newGame.classList.add('newGame');

          const newText = document.createElement('h2');
          newText.classList.add('text');
          newText.textContent = 'Победа!';

          const newBtn = document.createElement('button');
          newBtn.classList.add('btn');
          newBtn.textContent = 'Сыграть еще раз';

          newBtn.addEventListener('click', () => {
            location.reload();
          })

          newGame.append(newText, newBtn);
          game.after(newGame);
        }
      }
    })
  }
}

function startForm() {
  const form = document.createElement('form');
  form.classList.add('form');

  const descr = document.createElement('h1')
  descr.classList.add('descr')
  descr.textContent = 'Настройте игру:'

  const input = document.createElement('input');
  input.classList.add('input');
  input.placeholder = 'Количество пар (1-8)';

  const formBtn = document.createElement('button');
  formBtn.classList.add('formBtn');
  formBtn.textContent = 'Начать игру'

  form.append(descr, input, formBtn);
  game.before(form);

  formBtn.addEventListener('click', () => {
    if (input.value <= 8)  {
      game.classList.add(`game${input.value}`)

      form.remove()

      startGame(input.value)
    } else {
      alert('Слишком много пар, значения по умолчанию — 4')
      game.classList.add(`game4`)

      startGame(4)

      form.remove()
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  startForm()
  // startGame(8)
})
}) ()

