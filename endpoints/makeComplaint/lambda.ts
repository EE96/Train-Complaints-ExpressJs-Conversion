import { APIGatewayProxyHandler } from "aws-lambda/trigger/api-gateway-proxy";

import ComplaintClient from "../../aws/dynamo/ComplaintClient";
import {
    successResponse,
    badRequestResponse,
    serverErrorResponse
} from '../../helpers/responses'
import { Complaint } from "../../types/Complaint";
import { isComplaint } from "../../helpers/validateObjects";

export const handler: APIGatewayProxyHandler = async ({ body }) => {

    if (!body) {
        return badRequestResponse("Request is missing body")
    }

    const complaint: Complaint = JSON.parse(body)

    if(!isComplaint(complaint)){
        return badRequestResponse("request body does not conform to the Complaint type")
    }

    try {
        const newComplaint = await ComplaintClient.put(complaint)
        return successResponse(newComplaint)
    } catch (err) {
        console.log(err)
        return serverErrorResponse()
    }
}