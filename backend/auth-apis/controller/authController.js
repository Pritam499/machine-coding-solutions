const pool = require('../db/pool');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { use } = require('bcrypt/promises');
dotenv.Config();
const JWT_SECRET=process.env.JWT_SECRET || '';

exports.register = async (req, res) => {
    const {username, email, password} = req.body;

    try{

        const hashPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING (id, username, email)',[username, email, hashPassword]
        )

        res.status(201).json({user: result.rows[0]})

    }catch(err){
        if(err.code === '23505'){
            res.status(400).json({error:'user already exist'})
        }else{
            res.status(500).json({error: err.message})
        }
    }
}

exports.login = async (req, res) => {
    const { email, password} = req.body;

    try{

        const result = await pool.query(
            'SELECT * FROM users where email = $1',[email]
        )
        if(result.rows.length === 0){
            return res.status(401).json({error: 'Email not exist! Try to Register!'})
        }

        const user =  result.rows[0];

        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            return res.status(401).json({error: 'Invalid Credential!'})
        }
        
        const token = jwt.sign({userId: user.id, username: user.username}, JWT_SECRET, {expiresIn: '1h'});
        res.json({token});

    }catch(err){
            res.status(500).json({error: err.message})
    }
}

exports.logout = async (req,res) =>{
    res.json({message:'Logged out(client should delete token)'})
}