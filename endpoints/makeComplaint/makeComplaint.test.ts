import axios from 'axios'
import { v4 as uuid } from "uuid";
import { expect } from 'chai'

import { Complaint } from '../../types/Complaint';
import ComplaintClient from '../../aws/dynamo/ComplaintClient';

describe('makeComplaint', function () {

    let complaintId: string

    afterEach(async function () {
        await ComplaintClient.delete(complaintId)
    })

    it('should build a complaint and add it to the database', async function () {

        complaintId = uuid()

        const complaint: Complaint = {
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

        const response = await axios.post(
            "http://localhost:3100/api/makeComplaint",
                complaint
        )

        const newComplaint = await ComplaintClient.fetch(complaint.complaintId) as Complaint

        expect(response.data).deep.equal(newComplaint)

    });
});
