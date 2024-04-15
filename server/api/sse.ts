export default defineEventHandler(async (event) => {
    setHeader(event, 'cache-control', 'no-cache')
    setHeader(event, 'connection', 'keep-alive')
    setHeader(event, 'content-type', 'text/event-stream')
    setResponseStatus(event, 200)

    let counter = 0

    const sendEvent = (data: any) => {
        event.node.res.write(`id: ${++counter}\n`);
        event.node.res.write(`data: ${JSON.stringify(data)}\n\n`);
    }

    setInterval(() => sendEvent({ message: 'ping' }), 3000)

    // Keep the connection open
    event._handled = true;
})
