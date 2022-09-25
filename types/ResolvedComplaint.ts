import { Complaint } from "./Complaint"

type Resolution = "Complaint Upheld" | "Complaint Upheld - Compensation Paid" | "Complaint Not Upheld" | "Pending"

export type ResolvedComplaint = Complaint & {
    outcome: Resolution,
    compensation?: number
}