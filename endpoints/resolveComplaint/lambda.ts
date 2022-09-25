import { APIGatewayProxyHandler } from "aws-lambda/trigger/api-gateway-proxy";

import ComplaintClient from "../../aws/dynamo/ComplaintClient";
import { DynamoClient } from "../../aws/dynamo/DynamoClient";
import {
    badRequestResponse,
    successResponse,
    notFoundResponse,
    serverErrorResponse
} from "../../helpers/responses";
import { Complaint, Status, StatusValues } from "../../types/Complaint";

export type RequestParams = {
    complaintId: string
    outcome: Status
    compensation?: number
}

const isResolutionParams = (check: any): boolean => {
    const conditions: boolean = (
        typeof check.complaintId === "string" &&
        StatusValues.includes(check.outcome) &&
        typeof check.compensation === "undefined" ||
        typeof check.compensation === "number"
    );
    return conditions;
}

export const handler: APIGatewayProxyHandler = async ({ body }) => {

    if (!body) {
        return badRequestResponse()
    }

    console.log(body)

    const params: RequestParams = JSON.parse(body)

    console.log("params are" + params)
    if(!isResolutionParams(params)){
        return badRequestResponse("Body does not conform to Request Params type")
    }

    try {
        const complaint = await ComplaintClient.fetch(params.complaintId) as Complaint
        complaint.outcome = params.outcome
        if (params.compensation) {
            complaint.compensation = params.compensation
        }
        await ComplaintClient.put(complaint)
        return successResponse(complaint)
    } catch {
        return notFoundResponse()
    }
}