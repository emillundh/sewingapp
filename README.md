# Test project for sewing app
by Emil Lundh

## Reflections on the code
There are duplicated string constants; given more time I would like to get rid of those.

The server details (including a fictitious session token) all reside as constants in the module `WebRequestService.ts`. Should be moved to a setting, or be replaced by a proper login, respectively.

It is assumed that the server responds with 200 on success. I put this in a constant.

User input is assumed to follow certain patterns; naturally one would have to collect requirements on what input formats to allow.

The end user is not expected to care about the details of why the connection failed, but will receive a message "Connection error".
