# Machine Details API

Base path: `/api/machine-details`

## Endpoints

### Get all machines
- `GET /api/machine-details`
- Response: `{ "success": true, "data": [<form_responses row>, ...] }`

### Get machine by serial number
- `GET /api/machine-details/:serialNo`
- Response: `{ "success": true, "data": <form_responses row> }`
- 404: `{ "success": false, "error": "Machine not found" }`

### Get machine by tag number
- `GET /api/machine-details/tag/:tagNo`
- Response: `{ "success": true, "data": <form_responses row> }`
- 404: `{ "success": false, "error": "Machine not found" }`

### Update machine by serial number
- `PUT /api/machine-details/:serialNo`
- Body: any subset of machine fields (`machine_name`, `model_no`, `manufacturer`, `department`, `location`, `purchase_date`, `purchase_price`, `vendor`, `warranty_expiration`, `initial_maintenance_date`, `notes`, `tag_no`, `user_allot`)
- Response: `{ "success": true, "message": "Machine updated successfully" }`
- 404: `{ "success": false, "error": "Machine not found" }`

### Update machine by tag number
- `PUT /api/machine-details/tag/:tagNo`
- Body: same fields as serial update
- Response: `{ "success": true, "message": "Machine updated successfully" }`
- 404: `{ "success": false, "error": "Machine not found" }`

### Get maintenance history by serial number
- `GET /api/machine-details/:serialNo/history`
- Response: `{ "success": true, "data": [ { "task_no", "serial_no", "machine_name", "task_type", "task_start_date", "actual_date", "doer_name", "maintenance_cost", "temperature_status", "remarks" }, ... ] }`

### Get maintenance history by tag number
- `GET /api/machine-details/tag/:tagNo/history`
- Response: `{ "success": true, "data": [ { "task_no", "tag_no", "machine_name", "task_type", "task_start_date", "actual_date", "doer_name", "maintenance_cost", "temperature_status", "remarks" }, ... ] }`

## Notes
- Empty string fields in updates are stored as `NULL`.
- History only returns completed tasks (`Actual_Date` present). If the DB table is capitalized, the service automatically retries with `"Maintenance_Task_Assign"`.
