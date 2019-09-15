export const sampleSessionData = [
    // ---- status codes ---- //
    // 0: Not completed
    // 1: Currently active
    // 2: Completed
    // ---- issue codes ---- //
    // -1: Finished session or conversation
    // null: Disabled area
    {
        // Conversation ID: 0
        id: 0,
        sender: {
            messages: {
                correct: 'Sample correct typed Message from id 0',
                close: null, // No message provided. It will not even be displayed
                wrong: 'Sample wrong typed Message from id 0'
            },
            status: 0 // sender did not send any messages yet
        },
        recipient: {
            messages: {
                correct: 'Sample correct typed respond from id 0',
                close: null, // No message provided. It will not even be displayed
                wrong: 'Sample wrong typed respond from id 0'
            },
            status: 0 // recipient did not recieve any messages yet
        },
        redirect: {
            correct: 1, // go to conversation id: 1
            close: null, // there is no any message or redirect record for this kind of message
            wrong: -1 // end session
        },
        respond: null, // Stores sent message type
        feedback: 'Some optional feedback text for id 0',
        status: 0 // this conversation is not started yet
    },
    {
        // Conversation ID: 1
        id: 1,
        sender: {
            messages: {
                correct: 'Sample correct typed Message from id 1',
                close: 'Sample close typed Message from id 1',
                wrong: 'Sample wrong typed Message from id 1'
            },
            status: 0 // sender did not send any messages yet
        },
        recipient: {
            messages: {
                correct: 'Sample correct typed respond from id 1',
                close: 'Sample close typed respond from id 1',
                wrong: 'Sample wrong typed respond from id 1'
            },
            status: 0 // recipient did not recieve any messages yet
        },
        redirect: {
            correct: 2, // go to conversation id: 2
            close: 2, // go to conversation id: 2
            wrong: -1 // end session
        },
        respond: null, // Stores sent message type
        feedback: 'Some optional feedback text for id 1',
        status: 0 // this conversation is not started yet
    },
    {
        // Conversation ID: 2
        id: 2,
        sender: {
            messages: {
                correct: 'Sample correct typed Message from id 2',
                close: 'Sample close typed Message from id 2',
                wrong: 'Sample wrong typed Message from id 2'
            },
            status: 0 // sender did not send any messages yet
        },
        recipient: {
            messages: {
                correct: 'Sample correct typed respond from id 2',
                close: 'Sample close typed respond from id 2',
                wrong: 'Sample wrong typed respond from id 2'
            },
            status: 0 // recipient did not recieve any messages yet
        },
        redirect: {
            correct: -1, // end session
            close: -1, // end session
            wrong: -1 // end session
        },
        respond: null, // Stores sent message type
        feedback: 'Some optional feedback text for id 2',
        status: 0 // this conversation is not started yet
    }
]
