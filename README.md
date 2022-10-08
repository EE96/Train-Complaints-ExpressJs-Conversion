Train Complaints Processor (TCP) is a project implementing a serverless backend for the storing, fetching, and processing of complaints. 

TCP uses the Serverless framework to deploy an AWS CloudFormation stack containing a DynamoDB Table used for the storing of complaints conforming to the Complaint type, which are identifiable by their complaintId. Interactions with this table are managed via Lambda functions. 

Automated acceptance tests have been implemented alongside each Lambda function using Mocha and Chai. 