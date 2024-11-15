require('dotenv').config()

const express = require('express')
const contactData = require('./models/contact')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())

app.post('/addContact', async(req, res) => {
    try {
        const contact = await contactData.create(req.body)
        res.status(201).json(contact)
    } catch (error) {
        res.status(400).json({error: error.massage})
    }
})

app.get('/contacts', async(req, res) => {
    try {
        const contact = await contactData.find()
        const newContact = contact.map((cont) => ({
            id: cont._id.toString(),
            firstName: cont.firstName,
            lastName: cont.lastName,
            email: cont.email,
            phoneNumber: cont.phoneNumber,
            company: cont.company,
            jobTitle: cont.jobTitle
        }))
        res.status(200).json(newContact)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.put('/contact/:id', async(req, res) => {
    try {
        const contact = await contactData.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(contact)
    } catch (error) {
        res.status(500).json({error: error.massage})
    }
})

app.delete('/contact/:id', async(req, res) => {
    try {
        await contactData.findByIdAndDelete(req.params.id)
        res.json({message: 'Contact deleted successfully'})
    } catch (error) {
        res.status(500).json({error: error.massage})
    }
})

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDb connected"))
    .catch((err) => console.error("MongoDb connection error: ", err))

app.listen(process.env.PORT, () => {
    console.log("listening on port", process.env.PORT);
})