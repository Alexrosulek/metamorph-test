/**
 * Metamorph Sender Actor
 * 
 * This actor demonstrates the metamorph feature.
 * It does some work, then metamorphs into the metamorph-receiver actor.
 * 
 * To test:
 * 1. Build and push both metamorph-sender and metamorph-receiver actors
 * 2. Run metamorph-sender with input like: { "message": "Hello from sender!" }
 * 3. Watch the logs - it should metamorph into metamorph-receiver
 * 4. The receiver will log the input and push data to the dataset
 */

import { Actor } from 'scrapely';

await Actor.main(async () => {
    console.log('='.repeat(60));
    console.log('METAMORPH SENDER ACTOR STARTED');
    console.log('='.repeat(60));

    // Get the input
    const input = await Actor.getInput();

    console.log('Sender received input:', JSON.stringify(input, null, 2));

    // Do some initial work
    console.log('Sender doing some work...');
    await Actor.pushData({
        phase: 'sender',
        message: 'This data was pushed by the sender before metamorph',
        timestamp: new Date().toISOString(),
        originalInput: input,
    });

    console.log('Sender completed initial work.');
    console.log('');
    console.log('*'.repeat(60));
    console.log('INITIATING METAMORPH TO metamorph-receiver...');
    console.log('*'.repeat(60));
    console.log('');

    // Metamorph into the receiver actor
    // Pass along the original input plus some additional data
    await Actor.metamorph('metamorph-receiver', {
        ...input,
        metamorphedAt: new Date().toISOString(),
        originalActor: 'metamorph-sender',
        message: (input as any)?.message || 'Hello from metamorph sender!',
    });

    // This code never runs - the container is replaced
    console.log('ERROR: This should never be reached!');
});