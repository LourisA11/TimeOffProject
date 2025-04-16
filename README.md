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



![ERD Diagram](ERD.png)

---
