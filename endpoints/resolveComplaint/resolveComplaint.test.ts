import axios from 'axios'
import { v4 as uuid } from "uuid";
import { expect } from 'chai'

import { Complaint } from '../../types/Complaint'
import ComplaintClient from '../../aws/dynamo/ComplaintClient';
import { RequestParams } from './lambda';


describe("resolveComplaint", function () {

    let complaintId: string

    afterEach(async function () {
        await ComplaintClient.delete(complaintId)
    })

    it("resolves a complaint before returning it to the database", async function () {

        complaintId = uuid()

        const newComplaint: Complaint = {
            complaintId,
            complainant: 'Mr. Brown',
            contactEmail: 'brown@test.com',
            complaint: 'The train from Glasgow Queen Street to Edinburgh Waverley was late',
            travellingFrom: 'Glasgow Queen Street',
            destination: 'Edinburgh Waverley',
            dateOfEvent: "23 September 2022",
            timestamp: new Date().toISOString(),
            outcome: 'Pending'
        }

        await ComplaintClient.put(newComplaint)

        const testParams: RequestParams = {
            complaintId: newComplaint.complaintId,
            outcome: 'Complaint Upheld - Compensation Paid',
            compensation: 2000
        }

        await axios.put(
            `http://localhost:3100/api/resolveComplaint/${complaintId}`,
            testParams
        )

        const comparisonComplaint: Complaint = newComplaint
        comparisonComplaint.outcome = 'Complaint Upheld - Compensation Paid'
        comparisonComplaint.compensation = 2000

        const testComplaint = await ComplaintClient.fetch(complaintId)

        expect(testComplaint).deep.equal(comparisonComplaint)
    })
})