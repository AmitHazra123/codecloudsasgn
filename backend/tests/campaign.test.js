const axios = require("axios");
jest.mock("axios");

const Campaign = require('../src/api/models/Campaign');

test("create campaign should response the correct data", async () => {
  axios.mockResolvedValue({
    "status": "Running",
    "replyEmails": [
        "shivahazra@gmail.com",
        "nationmediatek@gmail.com"
    ],
    "errorLogs": [],
    "createdOn": "2021-06-20T14:27:13.324Z",
    "updatedOn": "2021-06-20T14:27:13.324Z",
    "_id": "60cf5041f22f7056152a2388",
    "name": "Test Campaign",
    "note": "Some note",
    "senderName": "Amit Hazra",
    "senderEmail": "<your verified email address>",
    "accessKeyID": "<your ses access key id>",
    "secretAccessKey": "<your ses secret access key>",
    "region": "<your ses region>",
    "subject": "Some Subject",
    "mailText": "Some Text",
    "fname": "Amit",
    "mname": "",
    "lname": "Hazra",
    "receiverEmail": "nationmediatek@gmail.com",
    "isMarkedForImmediateSend": true,
    "scheduleDate": "2021-06-20T14:10:42.216Z",
    "isValid": true,
    "__v": 0
  });
  Campaign.save = function() {
    return new Promise((resolve, reject) => {
       resolve({
        "status": "Running",
        "replyEmails": [
            "shivahazra@gmail.com",
            "nationmediatek@gmail.com"
        ],
        "errorLogs": [],
        "createdOn": "2021-06-20T14:27:13.324Z",
        "updatedOn": "2021-06-20T14:27:13.324Z",
        "_id": "60cf5041f22f7056152a2388",
        "name": "Test Campaign",
        "note": "Some note",
        "senderName": "Amit Hazra",
        "senderEmail": "<your verified email address>",
        "accessKeyID": "<your ses access key id>",
        "secretAccessKey": "<your ses secret access key>",
        "region": "<your ses region>",
        "subject": "Some Subject",
        "mailText": "Some Text",
        "fname": "Amit",
        "mname": "",
        "lname": "Hazra",
        "receiverEmail": "nationmediatek@gmail.com",
        "isMarkedForImmediateSend": true,
        "scheduleDate": "2021-06-20T14:10:42.216Z",
        "isValid": true,
        "__v": 0
      });
    });
  }
  const campaign = await Campaign.save();
  expect(campaign).toEqual({
    "status": "Running",
    "replyEmails": [
        "shivahazra@gmail.com",
        "nationmediatek@gmail.com"
    ],
    "errorLogs": [],
    "createdOn": "2021-06-20T14:27:13.324Z",
    "updatedOn": "2021-06-20T14:27:13.324Z",
    "_id": "60cf5041f22f7056152a2388",
    "name": "Test Campaign",
    "note": "Some note",
    "senderName": "Amit Hazra",
    "senderEmail": "<your verified email address>",
    "accessKeyID": "<your ses access key id>",
    "secretAccessKey": "<your ses secret access key>",
    "region": "<your ses region>",
    "subject": "Some Subject",
    "mailText": "Some Text",
    "fname": "Amit",
    "mname": "",
    "lname": "Hazra",
    "receiverEmail": "nationmediatek@gmail.com",
    "isMarkedForImmediateSend": true,
    "scheduleDate": "2021-06-20T14:10:42.216Z",
    "isValid": true,
    "__v": 0
  });
});

test("update campaign should response the correct data", async () => {
  axios.mockResolvedValue({
    "status": "Running",
    "replyEmails": [
        "shivahazra@gmail.com",
        "nationmediatek@gmail.com"
    ],
    "errorLogs": [],
    "createdOn": "2021-06-20T14:27:13.324Z",
    "updatedOn": "2021-06-20T14:27:13.324Z",
    "_id": "60cf5041f22f7056152a2388",
    "name": "Test Campaign",
    "note": "Some note",
    "senderName": "Amit Hazra",
    "senderEmail": "<your verified email address>",
    "accessKeyID": "<your ses access key id>",
    "secretAccessKey": "<your ses secret access key>",
    "region": "<your ses region>",
    "subject": "Some Subject",
    "mailText": "Some Text",
    "fname": "Amit",
    "mname": "",
    "lname": "Hazra",
    "receiverEmail": "nationmediatek@gmail.com",
    "isMarkedForImmediateSend": true,
    "scheduleDate": "2021-06-20T14:10:42.216Z",
    "isValid": true,
    "__v": 0
  });
  Campaign.findOneAndUpdate = function({query, updateQuery}) {
    return new Promise((resolve, reject) => {
       resolve({
        "status": "Running",
        "replyEmails": [
            "shivahazra@gmail.com",
            "nationmediatek@gmail.com"
        ],
        "errorLogs": [],
        "createdOn": "2021-06-20T14:27:13.324Z",
        "updatedOn": "2021-06-20T14:27:13.324Z",
        "_id": "60cf5041f22f7056152a2388",
        "name": "Test Campaign",
        "note": "Some note",
        "senderName": "Amit Hazra",
        "senderEmail": "<your verified email address>",
        "accessKeyID": "<your ses access key id>",
        "secretAccessKey": "<your ses secret access key>",
        "region": "<your ses region>",
        "subject": "Some Subject",
        "mailText": "Some Text",
        "fname": "Amit",
        "mname": "",
        "lname": "Hazra",
        "receiverEmail": "nationmediatek@gmail.com",
        "isMarkedForImmediateSend": true,
        "scheduleDate": "2021-06-20T14:10:42.216Z",
        "isValid": true,
        "__v": 0
      });
    });
  }
  const campaign = await Campaign.findOneAndUpdate({_id: "60cf5041f22f7056152a2388", isValid: true},
    {
      $set: {
        "status": "Running",
        "replyEmails": [
            "shivahazra@gmail.com",
            "nationmediatek@gmail.com"
        ],
        "errorLogs": [],
        "name": "Test Campaign",
        "note": "Some note",
        "senderName": "Amit Hazra",
        "senderEmail": "<your verified email address>",
        "accessKeyID": "<your ses access key id>",
        "secretAccessKey": "<your ses secret access key>",
        "region": "<your ses region>",
        "subject": "Some Subject",
        "mailText": "Some Text",
        "fname": "Amit",
        "mname": "",
        "lname": "Hazra",
        "receiverEmail": "nationmediatek@gmail.com",
        "isMarkedForImmediateSend": true,
        "scheduleDate": "2021-06-20T14:10:42.216Z",
        "isValid": true,
        "__v": 0
      }
    }
  );
  expect(campaign).toEqual({
    "status": "Running",
    "replyEmails": [
        "shivahazra@gmail.com",
        "nationmediatek@gmail.com"
    ],
    "errorLogs": [],
    "createdOn": "2021-06-20T14:27:13.324Z",
    "updatedOn": "2021-06-20T14:27:13.324Z",
    "_id": "60cf5041f22f7056152a2388",
    "name": "Test Campaign",
    "note": "Some note",
    "senderName": "Amit Hazra",
    "senderEmail": "<your verified email address>",
    "accessKeyID": "<your ses access key id>",
    "secretAccessKey": "<your ses secret access key>",
    "region": "<your ses region>",
    "subject": "Some Subject",
    "mailText": "Some Text",
    "fname": "Amit",
    "mname": "",
    "lname": "Hazra",
    "receiverEmail": "nationmediatek@gmail.com",
    "isMarkedForImmediateSend": true,
    "scheduleDate": "2021-06-20T14:10:42.216Z",
    "isValid": true,
    "__v": 0
  });
});

test("delete campaign should response the correct data", async () => {
  axios.mockResolvedValue({
    "status": "Running",
    "replyEmails": [
        "shivahazra@gmail.com",
        "nationmediatek@gmail.com"
    ],
    "errorLogs": [],
    "createdOn": "2021-06-20T14:27:13.324Z",
    "updatedOn": "2021-06-20T14:27:13.324Z",
    "_id": "60cf5041f22f7056152a2388",
    "name": "Test Campaign",
    "note": "Some note",
    "senderName": "Amit Hazra",
    "senderEmail": "<your verified email address>",
    "accessKeyID": "<your ses access key id>",
    "secretAccessKey": "<your ses secret access key>",
    "region": "<your ses region>",
    "subject": "Some Subject",
    "mailText": "Some Text",
    "fname": "Amit",
    "mname": "",
    "lname": "Hazra",
    "receiverEmail": "nationmediatek@gmail.com",
    "isMarkedForImmediateSend": true,
    "scheduleDate": "2021-06-20T14:10:42.216Z",
    "isValid": false,
    "__v": 0
  });
  Campaign.findOneAndUpdate = function({query, updateQuery}) {
    return new Promise((resolve, reject) => {
       resolve({
        "status": "Running",
        "replyEmails": [
            "shivahazra@gmail.com",
            "nationmediatek@gmail.com"
        ],
        "errorLogs": [],
        "createdOn": "2021-06-20T14:27:13.324Z",
        "updatedOn": "2021-06-20T14:27:13.324Z",
        "_id": "60cf5041f22f7056152a2388",
        "name": "Test Campaign",
        "note": "Some note",
        "senderName": "Amit Hazra",
        "senderEmail": "<your verified email address>",
        "accessKeyID": "<your ses access key id>",
        "secretAccessKey": "<your ses secret access key>",
        "region": "<your ses region>",
        "subject": "Some Subject",
        "mailText": "Some Text",
        "fname": "Amit",
        "mname": "",
        "lname": "Hazra",
        "receiverEmail": "nationmediatek@gmail.com",
        "isMarkedForImmediateSend": true,
        "scheduleDate": "2021-06-20T14:10:42.216Z",
        "isValid": false,
        "__v": 0
      });
    });
  }
  const campaign = await Campaign.findOneAndUpdate({_id: "60cf5041f22f7056152a2388", isValid: true},
    {
      $set: {
        isValid: false
      }
    }
  );
  expect(campaign).toEqual({
    "status": "Running",
    "replyEmails": [
        "shivahazra@gmail.com",
        "nationmediatek@gmail.com"
    ],
    "errorLogs": [],
    "createdOn": "2021-06-20T14:27:13.324Z",
    "updatedOn": "2021-06-20T14:27:13.324Z",
    "_id": "60cf5041f22f7056152a2388",
    "name": "Test Campaign",
    "note": "Some note",
    "senderName": "Amit Hazra",
    "senderEmail": "<your verified email address>",
    "accessKeyID": "<your ses access key id>",
    "secretAccessKey": "<your ses secret access key>",
    "region": "<your ses region>",
    "subject": "Some Subject",
    "mailText": "Some Text",
    "fname": "Amit",
    "mname": "",
    "lname": "Hazra",
    "receiverEmail": "nationmediatek@gmail.com",
    "isMarkedForImmediateSend": true,
    "scheduleDate": "2021-06-20T14:10:42.216Z",
    "isValid": false,
    "__v": 0
  });
});