import { Complaint } from "../../types/Complaint";
import { DynamoClient } from "./DynamoClient";

export default {

    put: async (complaint: Complaint) => {
        await DynamoClient.put({
            TableName: "Complaints",
            Item: complaint
        })
        return complaint
    },

    fetch: async (complaintId: string) => {
        const data = await DynamoClient.get({
            TableName: "Complaints",
            Key: { complaintId }
        })
        if (!data.Item){
            return null
        }
        return data.Item as Complaint
    },

    delete: async (complaintId: string) => {
        await DynamoClient.delete({
            TableName: "Complaints",
            Key: { complaintId }
        }) 
    }
}