# ConquestApiSample
Samples for consume Conquest API


## Add Import
>POST /api/import/add/{type}

Import Type Valid Values are: 
- Action 
- Asset 
- Defect
- Request
- AssetInspection
- RiskEvent
- LogBook

*Authorization* header is reqired for all import

The successfull call returns a key for status fetching.

## Check Import Status
>GET /api/import/state/{key}

Response status model:

~~~~
{ 
  "ProcessID": "string", 
  "ProcessType": 0,
  "Status": 0,
  "Title": "string",
  "Description": "string",
  "StatusDescription": "string",
  "Error": "string",
  "LastUpdated": "2016-10-15T12:59:43.080Z",
  "TotalWork": 0,
  "WorkDone": 0,
  "TaskProgress": 0,
  "ConnectionName": "string",
  "CreatedBy": "string",
  "Created": "2016-10-15T12:59:43.080Z"
}
~~~~