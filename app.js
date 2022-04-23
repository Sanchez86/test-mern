const expresss = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routAuth = require('./routes/auth.routes');
const routLink = require('./routes/link.routes');
const routRedirect = require('./routes/redirect.routes');
const res = require('express/lib/response');
const app = expresss();

app.use(bodyParser.json());
app.use('/api/auth', routAuth);
app.use('/api/link', routLink);
app.use('/t', routRedirect);

if (process.env.NODE_ENV === 'production') {
    app.use('/', expresss.static(path.join(__dirname, 'client', 'build')));

    app.get('*', () => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
};

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), { // соединяюсь с базой
            //useNewUrlParser: true,
        })
        app.listen(PORT, () => console.log(`App has been started... ${PORT}`));
    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1); //Завершаю процесс, если что-то пошло не так.
    }
}

start();
