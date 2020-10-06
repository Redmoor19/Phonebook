const cors = require('cors');
const express = require("express");
const morgan = require("morgan");
const app = express();

morgan.token('body', function getBody (req) {
    const body = JSON.stringify(req.body)
    if (body)
    return body
} )
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let persons = [
    {
        id: 1,
        name: "Artho Hellas",
        number: "040-49841688"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "040-567874985"
    },
    {
        id: 3,
        name: "Dan Abamov",
        number: "040-78849876"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "040-16586815"
    }
]

app.get('/info', (req, res) => {
    const date = new Date
    res.send(`Phonebook has info for ${persons.length} people </br> ${date}`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id == id)

    if (person) {
        res.json(person)
    }else{
        res.status(404).send("Person not found")
    }
})

app.post('/api/persons', (req, res) => {
    const person = {
        id: parseInt(Math.random()*1000),
        name: req.body.name,
        number: req.body.number
    }
    if (persons.find( person => person.name === req.body.name))
        res.send('Such person is already exist')
    else if (!req.body.name || !req.body.number)
        res.send('Enter the information about the person')
    else{
        persons.push(person)
        res.send('Success')
    }
        
})

app.put('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log(req.body)
    persons.map( item => {
        if(item.id === id){
            item.number = req.body.number
            return item
        }else{
            return item
        }
    })
    console.log(persons)
    res.send(persons)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter( persone => persone.id != id)

    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
} )