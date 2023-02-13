async function fetchQuotes() {
  try {
    const res = await fetch("https://type.fit/api/quotes");
    const data = await res.json();
    const allQuotes = data;
    const quotes = [];

for (let i = 0; i < 15; i++) {
  const randomIndex = Math.floor(Math.random() * allQuotes.length);
  quotes.push(allQuotes[randomIndex]);
  allQuotes.splice(randomIndex, 1);
}

return quotes;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function displayQuote(quote) {
  document.getElementById("quote").innerText = quote;
}

function displayQuoteTime(timeTaken) {
  document.getElementById("quote-time").innerText = timeTaken;
}

function displayQuoteTimeAverage(averageTime) {
  document.getElementById("quote-time-average").innerHTML = averageTime;
}

function dispalayError(){
  document.getElementById("error-message").innerHTML="Wrong Quote Entered"
}

async function endGame(startTime, score, quotes) {
  const endTime = new Date();
  const totalTime = (endTime - startTime) / 1000;
  const averageTime = Math.floor(totalTime / quotes.length);
  localStorage.setItem("score", totalTime + ":" + score);
  alert(`Total Time : ${totalTime} seconds Score :${score} points. Game Over`);
  displayQuoteTimeAverage(averageTime);
}

async function startGame() {
  try {
    const quotes = await fetchQuotes();
    let score = 0;
    let currentQuoteIndex = 0;
    let startTime = new Date();
    let quoteStartTime = new Date();
  
    displayQuote(quotes[currentQuoteIndex].text);
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
       
        const input = document.getElementById("input").value;
        if (input === quotes[currentQuoteIndex].text) {
          score++;
          const quoteEndTime = new Date();
          const timeTaken = (quoteEndTime - quoteStartTime) / 1000;
          displayQuoteTime(timeTaken);
          document.getElementById("input").value = "";
          currentQuoteIndex++;
          quoteStartTime = new Date();
  
          if (currentQuoteIndex === quotes.length) {
            endGame(startTime, score, quotes);
          } else {
            displayQuote(quotes[currentQuoteIndex].text);
          }
        } else {
          currentQuoteIndex++;
           dispalayError()
          alert("Wrong Score 0");
  
          if (currentQuoteIndex === quotes.length) {
            endGame(startTime, score, quotes);
          } else {
            displayQuote(quotes[currentQuoteIndex].text);
          }
        }
      }
    });
  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching the quotes. Please try again later.");
  }
} 

startGame();
