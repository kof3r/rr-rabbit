const express = require('express');
const { createAmqpTunneler } = require('@kof3r/tunneler');

const {
    AMQP_URL,
    PORT = 3000,
    SERVICE_NAME,
    SERVICE_GREETER,
    SERVICE_NUMBER_ADDER,
    SERVICE_NUMBER_PARSER
} = process.env;

async function run() {
    const app = express();

    const tunneler = await createAmqpTunneler(SERVICE_NAME, AMQP_URL);

    const [
        greeterService,
        numberAdderService,
        numberParserService,
    ] = await Promise.all([
        tunneler.createServiceTunnel(SERVICE_GREETER),
        tunneler.createServiceTunnel(SERVICE_NUMBER_ADDER),
        tunneler.createServiceTunnel(SERVICE_NUMBER_PARSER),
    ]);
    
    app.get('/greet', async (req, res) => {
        const { query } = req;

        const greeting = await greeterService.send('greet', { who: query.who });
    
        res.json({ greeting });
    });

    app.get('/add', async (req, res) => {
        const { query } = req;

        console.log('need to parse this: ', query.a);

        const A = await Promise.all(query.a.map((aString) => numberParserService.send('parse', aString)));

        const sum = await numberAdderService.send('add', A);

        res.json({ sum });
    });
    
    app.listen(PORT, () => console.log(`api listening on port ${PORT}`));
}

run();
