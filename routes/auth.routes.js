const { Router } = require('express');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = Router();

//добавляю andpoints запросы POST GET DELETE PUT и т д 
// уже есть готовый префикс /api/auth.
// то, что допишим в пост первым аргументом, будет конкатенироваться с префиксом
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина паролья 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }

            const { email, password } = req.body; // то что будем отправлять с фронтернда
            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' })
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, hashedPassword });

            await user.save();

            res.status(201).json({ message: 'Пользователь успешно создан' });

        } catch (e) {
            console.log('e', e);
            res.status(500).json({ message: 'Что-то пошло не так на сервере' })
        }
    });

router.post(
    '/login',
    [
        check('email', 'Некорректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400), json({
                    errors: errors.array(),
                    message: 'Некорректные данные при авторизации'
                })
            }

            const { email, password } = req.body;
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            const isMatch = await bcrypt.compare(password, user.hashedPassword);

            if (!isMatch) {
                res.status(400).json({ message: 'Неверный пароль' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id, message: 'Авторизация прошла успешно' })


        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    });

module.exports = router;