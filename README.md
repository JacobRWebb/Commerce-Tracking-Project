# UCMO Spring 2021 Commerce Bank Project - Cleaned up - Iteration 1

This is an attempt to clean up the originally instructions given.

## Alert Tracking and Acknowledgement System

Application presents list of `alerts` to `authenticated users` either in two states, waiting to be acknowledged or already acknowledged.
A server will deliver json (`Schema Shown Below`) via a `POST` request sent to an endpoint.

**{
"timestamp": "the timestamp of the file access",
"hostname": "the fully qualified domain name of the server hosting the file",
"application_id": "3 character id representing the owning application",
"file": "the fully qualified path of the file that has been modified",
"change_agent": "who changed the file, local system account, user id, etc",
"change_process": "the process that changed the file"
}**

For testing purposes you may use Postman via `curl <url> -X POST -d @<json file>`

## Page layouts

### Main Dashboard

[x] Displays a list of alerts with filters (switch between acknowledged and un-acknowledged)
[x] User may click the alert and a pop should prompt the user to either edit or close.

### Admin Dashboard

Show all alerts and allows filter (un-acknowledged alerts over 2 days old.)

### Login page

There shall be no registration page as the instructions state `users` must be `pre-established`
Simple... No password encryption.

## Schema

### User

A user associates with multiple application ids.
Database Layout
**{
username: string,
password: string,
role: string,
applications: string[] <-- Reference Application table.
}**

### Alert Change

Known change or unknown change (`manual` or `automated`)
Maliciously Changed? (Find out how the system knows if this change is malicious)(Notify It Department)
On user acknowledgement log `timestamp`, `user`, `comments`, `state`

## Extra Goals

System sends out emails when alerts have not be acknowledge in 2 days and as new alerts arrive.
