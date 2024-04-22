// Generara un número aleatorio entre 1 y 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

// Obtendra referencias a los elementos HTML necesarios
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

// Inicializa el contador de intentos y el botón de reinicio
let guessCount = 1;
let resetButton;

// Función para verificar el intento del jugador
function checkGuess() {
  // Obtiene el valor del intento del jugador como un número
  let userGuess = Number(guessField.value);
  
  // Si es el primer intento, muestra "Intentos anteriores:"
  if (guessCount === 1) {
    guesses.textContent = "Intentos anteriores: ";
  }
  
  // Agrega el intento actual a la lista de intentos anteriores
  guesses.textContent += userGuess + " ";

  // Comprueba si el intento es correcto
  if (userGuess === randomNumber) {
    // Muestra un mensaje de felicitación si el jugador adivina correctamente
    lastResult.textContent = "¡Felicidades! ¡Lo adivinaste!";
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    setGameOver(); // Finaliza el juego
  } else if (guessCount === 10) {
    // Si el jugador ha agotado los 10 intentos, muestra un mensaje de fin de juego
    lastResult.textContent = "¡¡¡Fin del juego!!!";
    setGameOver(); // Finaliza el juego
  } else {
    // Si el intento es incorrecto, indica si el número es más alto o más bajo
    lastResult.textContent = "¡Incorrecto!";
    lastResult.style.backgroundColor = "red";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "¡El número es muy bajo!";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "¡El número es muy grande!";
    }
  }

  // Incrementa el contador de intentos, borra el campo de entrada y lo enfoca para el siguiente intento
  guessCount++;
  guessField.value = "";
  guessField.focus();
}

// Agrega un evento de click al botón de envío de intento para llamar a la función checkGuess
guessSubmit.addEventListener("click", checkGuess);

// Función para finalizar el juego
function setGameOver() {
  // Deshabilita el campo de entrada y el botón de envío de intento
  guessField.disabled = true;
  guessSubmit.disabled = true;

  // Crea un botón de reinicio y lo agrega a la página
  resetButton = document.createElement("button");
  resetButton.textContent = "Iniciar nuevo juego";
  document.body.append(resetButton);

  // Agrega un evento de click al botón de reinicio para llamar a la función resetGame
  resetButton.addEventListener("click", resetGame);
}

// Función para reiniciar el juego
function resetGame() {
  // Reinicia el contador de intentos
  guessCount = 1;

  // Borra los mensajes de resultado anteriores
  const resetParas = document.querySelectorAll(".resultParas p");
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }

  // Elimina el botón de reinicio de la página
  resetButton.parentNode.removeChild(resetButton);

  // Habilita el campo de entrada y el botón de envío de intento
  guessField.disabled = false;
  guessSubmit.disabled = false;

  // Borra el contenido del campo de entrada, lo enfoca y cambia el color de fondo del resultado
  guessField.value = "";
  guessField.focus();
  lastResult.style.backgroundColor = "white";

  // Genera un nuevo número aleatorio para adivinar
  randomNumber = Math.floor(Math.random() * 100) + 1;
}

// Enfoca automáticamente el campo de entrada al cargar la página
guessField.focus();
