// server-express.js
const express = require('express')
const app = express() // initialize app
const port = 3000

// GET callback function returns a response message
app.get('/', (req, res) => {
    res.send('Hello there!')
})

let counter = 0;

app.get('/visits', (req, res) => {
	counter += 1
      // Text formatting from ‘text formatting’ JavaScript prelab section
	res.send(`There have been ${counter} visits to this session`);
});

// Rock Paper Scissors game, each route is the option the user selects. The 'bot' will randomly select one of the three options 
// 1 for rock, 2 for paper, 3 for scissors

//if the user chooses rock
app.get('/rock', (req, res) => {
    const rndInt = Math.floor(Math.random() * 3) + 1 // generates a random number from 0 to 1, then multiplies it by 3 and adds 1 (add by 1 bc we are flooring by 1)
    console.log(rndInt)
    if (rndInt === 3){
        res.send("Bot picked Scissors. You Win!!!");
    }
    else if (rndInt == 1){
        res.send("Bot picked Rock. Tie! Try again!");
    } else if (rndInt == 2){
        res.send("Bot picked Paper. You lost! Try again!");
    }
});
//if the user chooses paper
app.get('/paper', (req, res) => {
    const rndInt = Math.floor(Math.random() * 3) + 1 // generates a random number from 0 to 1, then multiplies it by 3 and adds 1 (add by 1 bc we are flooring by 1)
    console.log(rndInt)
    if (rndInt === 3){
        res.send("Bot picked Scissors. You lost! Try again!");
    }
    else if (rndInt == 1){
        res.send("Bot picked Rock. You Win!!!");
    } else if (rndInt == 2){
        res.send("Bot picked Paper. Tie! Try again!");
    }
});

//if the user chooses scissors
app.get('/scissors', (req, res) => {
    const rndInt = Math.floor(Math.random() * 3) + 1 // generates a random number from 0 to 1, then multiplies it by 3 and adds 1 (add by 1 bc we are flooring by 1)
    console.log(rndInt)
    if (rndInt === 3){
        res.send("Bot picked Scissors. Tie! Try again!");
    }
    else if (rndInt == 1){
        res.send("Bot picked Rock. You lost! Try again!");
    } else if (rndInt == 2){
        res.send("Bot picked Paper. You Win!!!");
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

