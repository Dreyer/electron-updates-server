const express = require('express')
const app = express()

const config = require('./config')
const controller = require('./controller')

app.get('/_status', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send('OK')
})

app.get('/',function(req, res) {
    res.sendFile(`${__dirname}/public/index.html`);
})
//app.get('/', controller.index)
app.get('/update', controller.update)
app.get('/download', controller.download)
app.use('/releases', express.static(`${__dirname}/public/releases`));

app.listen(config.port, config.host, () => {
    console.log(`Server listening http://${config.host}:${config.port}/`)
});