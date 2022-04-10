const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', (req, res) => {
    res.status(200).send('Holi Jocobi uwu');
    });

router.post('/searchFriend', (req, res) => {
    const dataFriend = req.body;
    const {email} = dataFriend;
    console.log(email);
    pool.query(`SELECT * FROM user WHERE email like "${email}%"`, (err, rows) => {
        console.log(rows);
            console.log(err);
        if (!err  && rows.length) {
            res.status(200).send({isAuth: true, message: 'Encontrado.', dataFriend: rows});
        } else {
            res.status(500).send({isAuth: false, message: 'Email  no son validos.'});
        }
    });
});

router.post('/signin', (req, res) => {
    const data = req.body;
    const {email, password } = data;
    pool.query('SELECT * from user where email = ? and password = ?', [email, password ], (err, rows) => {
        console.log(rows);
            console.log(err);
        if (!err  && rows.length) {
            res.status(200).send({isAuth: true, message: 'Sesion Exitosa.', data: rows[0]});
        } else {
            res.status(500).send({isAuth: false, message: 'Email y/o contraseña no son validos.'});
        }
    });
});

// arreglar
router.post('/guardar', async (req, res) => {
    console.log(req.body);
    const data = req.body;
    const { firstName, lastName, weight, height, email, password } = data;
        if (data) {
            pool.query('INSERT INTO user(firstName, lastName, weight, height, email, password ) VALUES (?,?,?,?,?,?)', [firstName, lastName, weight, height, email, password ], (err, rows) => {
                if (err) {
                    res.status(500).send({status: 500, message: 'Ha surgido un error en el servidor'});
                    console.log(err);
                    return;
                }
                res.status(200).send({status: 200, message: 'Registro guardado.'});
            })
        }
});

module.exports = router;