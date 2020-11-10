const { createAmqpTunneler } = require('@kof3r/tunneler');

const { AMQP_URL, SERVICE_NAME } = process.env;

async function run() {
    const tunneler = await createAmqpTunneler(SERVICE_NAME, AMQP_URL);

    await tunneler.handleMessages({
        'parse': (numberAsString) => {
            console.log(`parsing: ${numberAsString}`);

            return parseFloat(numberAsString);
        },
    });

    console.log(`${SERVICE_NAME} available`);
}

run();
