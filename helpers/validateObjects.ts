import { Complaint, StationValues } from "../types/Complaint"
import { StatusValues } from "../types/Complaint"

export const isComplaint = (check: any): boolean => {
    const conditions: boolean = (
        typeof check.complaintId === "string" &&
        typeof check.complainant === "string" &&
        typeof check.contactEmail === "string" &&
        typeof check.complaint === "string" &&
        StationValues.includes(check.travellingFrom) &&
        StationValues.includes(check.destination) &&
        typeof check.dateOfEvent === "string" &&
        typeof check.timestamp === "string" &&
        StatusValues.includes(check.outcome))
    return conditions
}