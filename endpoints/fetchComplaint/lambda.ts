import { APIGatewayProxyHandler } from "aws-lambda/trigger/api-gateway-proxy";

import ComplaintClient from "../../aws/dynamo/ComplaintClient";
import {
    successResponse,
    notFoundResponse,
    badRequestResponse,
    serverErrorResponse
} from '../../helpers/responses'

export const handler: APIGatewayProxyHandler = async ({ pathParameters }) => {
    if (!pathParameters?.complaintId) {
        return badRequestResponse("Request is missing path parameters")
    }

    const { complaintId } = pathParameters;
    try {
        const response = await ComplaintClient.fetch(complaintId)
        if (!response) {
            return notFoundResponse(`cannot find complaint with complaintId ${complaintId}`)
        }
        return successResponse(response)
    } catch {
        return serverErrorResponse()
    }
}