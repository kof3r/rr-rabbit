const { createAmqpTunneler } = require('@kof3r/tunneler');

const { AMQP_URL, SERVICE_NAME } = process.env;

async function run() {
    const tunneler = await createAmqpTunneler(SERVICE_NAME, AMQP_URL);

    await tunneler.handleMessages({
        'add': (numbers) => {
            console.log('adding', numbers);

            return numbers.reduce((total, a) => total + a, 0);
        },
    });

    console.log(`${SERVICE_NAME} available`);
}

run();
