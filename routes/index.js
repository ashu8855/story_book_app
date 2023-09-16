const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('login', {
        layout: 'login'
    })
});

router.get('/dashboard', (req, res, next) => {
    res.render('dashboard')
});


module.exports = router;