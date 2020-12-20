function sendResponse(response, object) {
    response.writeHead(200, {
        'Content-Type': 'application/json'
    })

    response.write(JSON.stringify(object))

    response.end()
}

function sendError(response, code, object) {
    console.error(object)

    response.writeHead(code, {
        'Content-Type': 'application/json'
    })

    response.write(JSON.stringify(object))

    response.end()
}

module.exports = {
    sendResponse,
    sendError
}