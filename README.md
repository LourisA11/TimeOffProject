# 🗓️ Shift Scheduler – MySQL Database

A MySQL-based backend system for managing employee shift cover requests, tracking coverage, and supporting approvals in a workplace environment.

---

## 📁 Project Overview

This project includes a structured and relational MySQL schema to:

- Track users and departments
- Manage and store shifts
- Allow employees to request shift coverage
- Record which employees are covering which shifts
- Monitor status of requests (e.g. `PENDING`, `APPROVED`, `DECLINED`)

---

## 🗂️ Database Schema

### Tables:

| Table         | Description                                |
|---------------|--------------------------------------------|
| `User`        | Stores user information                    |
| `Shifts`      | Stores shift date, time, and location      |
| `CoverRequest`| Handles employee cover requests            |
| `ShiftCover`  | Tracks which employees are covering shifts |

### Relationships:

- `CoverRequest.EmployeeID` → `User.UserID`
- `CoverRequest.ShiftID` → `Shifts.ShiftID`
- `ShiftCover.RequestID` → `CoverRequest.RequestID`
- `ShiftCover.CoveringEmployeeID` → `User.UserID`



![ERD Diagram] <img width="829" alt="Screenshot 2025-04-16 at 4 09 40 PM" src="https://github.com/user-attachments/assets/66fe4ce9-9dac-45e0-9059-f15580be5394" />

![Relations] <img width="585" alt="Screenshot 2025-04-16 at 4 07 49 PM" src="https://github.com/user-attachments/assets/8ed9612c-0a57-4530-8489-9b874db5a476" />

---
