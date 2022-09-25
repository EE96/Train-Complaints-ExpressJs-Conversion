import axios from 'axios'
import { v4 as uuid } from "uuid";
import { expect } from 'chai'

import { Complaint } from '../../types/Complaint';
import ComplaintClient from '../../aws/dynamo/ComplaintClient';

describe('fetchComplaint', function () {
    let complaintId: string

    afterEach(async function () {
        await ComplaintClient.delete(complaintId)
    })

    it('should fetch a Complaint from the database via its complaintId', async function () {

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
            outcome: "Pending"
        }

        await ComplaintClient.put(newComplaint)

        const response = await axios.get(
            `http://localhost:3100/api/fetchComplaint/${complaintId}`
        )

        expect(newComplaint).deep.equal(response.data)
    })
})