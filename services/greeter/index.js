const { createAmqpTunneler } = require('@kof3r/tunneler');

const { AMQP_URL, SERVICE_NAME } = process.env;

async function run() {
    const tunneler = await createAmqpTunneler(SERVICE_NAME, AMQP_URL);

    await tunneler.handleMessages({
        'greet': (payload) => `Hello, ${payload.who || 'World'}!`,
    });

    console.log(`${SERVICE_NAME} available`);
}

run();
