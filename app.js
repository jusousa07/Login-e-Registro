require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

const User = require('./moldes/User');

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem-vindo à API!' });
});

app.post('/auth/register', async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;

    if (!name) {
        return res.status(422).json({ msg: 'O nome é obrigatório!' })
    }

    
    if (!email) {
        return res.status(422).json({ msg: 'O email é obrigatório!' })
    }

    
    if (!password) {
        return res.status(422).json({ msg: 'A senha é obrigatória!' })
    }

    if (password !== confirmpassword) {
        return res.status(422).json({ msg: 'As senhas não conferem!' })
    }

    const userExists = await User.findOne({ email: email })

    if (userExists) {
        return res.status(422).json({ msg: 'Por favor, utilize outro email!' })
    }

});



const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.r3c7k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
)
  .then(() => { 
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
    console.log('Conectado ao banco!');
  })
  .catch((err) => console.log('Erro ao conectar ao banco:', err));
