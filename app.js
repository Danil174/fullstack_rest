const express = require('express');
const app = express();
const path = require('path');

const CONTACTS = [
    {id: 1, name: 'Danil', value: '8-800-555-55-55', marked: false}
];

app.get('/api/contacts', (req, res) => {
    res.status(200).json(CONTACTS);
})

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', index.html))
});

app.listen(3000, () => console.log('Server has been started on port 3000...'));