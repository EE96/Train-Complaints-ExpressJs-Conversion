export const successResponse = (bodyObject: any = "") => ({
    statusCode: 200, 
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': '*'
    },
    body: JSON.stringify(
        bodyObject,
        null, 
        2
    )
})

export const badRequestResponse = (message: string = "Bad Request") => ({
    statusCode: 400, 
    header: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': '*'
    },
    body: JSON.stringify({
        message
    },
        null, 
        2
    )
})

export const notFoundResponse = (message: string = "Not Found") => ({
    statusCode: 404, 
    header: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': '*'
    },
    body: JSON.stringify({
        message
    },
        null, 
        2
    )
})

export const serverErrorResponse = (message: string = "Internal Sever Error") => ({
    statusCode: 500, 
    header: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': '*'
    },
    body: JSON.stringify ({
        message
    },
    null, 
    2
    )
})


