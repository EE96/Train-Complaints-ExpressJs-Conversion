export const StatusValues = [
    "Complaint Upheld",
    "Complaint Upheld - Compensation Paid",
    "Complaint Not Upheld",
    "Pending"
] as const;

export const StationValues = [
    "Glasgow Queen Street",
    "Glasgow Central Station",
    "Edinburgh Waverley",
    "Edinburgh Haymarket"
] as const

export type StationMap = typeof StationValues[number]
export type Status = typeof StatusValues[number];

    export type Complaint = {
        complaintId: string
        complainant: string,
        contactEmail: string,
        complaint: string
        travellingFrom: StationMap,
        destination: StationMap,
        dateOfEvent: string,
        timestamp: string,
        outcome: Status,
        compensation?: number
    }