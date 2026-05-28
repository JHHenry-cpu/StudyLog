const express = require('express');
const app = express();
const quotes = [

    "Study hard, success will follow.",

    "Small progress is still progress.",

    "Consistency beats motivation.",

    "Push yourself every day.",

    "Your future self will thank you."

];

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

let tasks = [];

// HOME PAGE
app.get('/', (req, res) => {

    const randomQuote =
        quotes[Math.floor(Math.random() * quotes.length)];

    res.render('index', {

        tasks: tasks,
        quote: randomQuote

    });

});
// SHOW ADD PAGE
app.get('/add', (req, res) => {

    res.render('add');

});

// ADD TASK
app.post('/addTask', (req, res) => {

    const newTask = {
        title: req.body.title,
        subject: req.body.subject,
        completed: false
    };

    tasks.push(newTask);

    res.redirect('/');

});

// DELETE TASK
app.get('/delete/:index', (req, res) => {

    const index = req.params.index;

    tasks.splice(index, 1);

    res.redirect('/');

});

// COMPLETE TASK
app.get('/complete/:index', (req, res) => {

    const index = req.params.index;

    tasks[index].completed = !tasks[index].completed;

    res.redirect('/');

});

// SHOW EDIT PAGE
app.get('/edit/:index', (req, res) => {

    const index = req.params.index;

    res.render('edit', {
        task: tasks[index],
        index: index
    });

});

// UPDATE TASK
app.post('/update/:index', (req, res) => {

    const index = req.params.index;

    tasks[index] = {
        title: req.body.title,
        subject: req.body.subject
    };

    res.redirect('/');

});

// TIMER PAGE
app.get('/timer', (req, res) => {

    res.render('timer');

});



app.listen(3000, () => {

    console.log('Server running on http://localhost:3000');

});