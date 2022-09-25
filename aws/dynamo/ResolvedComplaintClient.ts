import { ResolvedComplaint } from "../../types/ResolvedComplaint";
import { DynamoClient } from "./DynamoClient";

export default {

    put: async (resolvedComplaint: ResolvedComplaint) => {
        await DynamoClient.put({
            TableName: "ResolvedComplaints",
            Item: resolvedComplaint
        })
    }
}