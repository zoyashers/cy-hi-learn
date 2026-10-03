CY-HI Learn - system Architecture

overview

CY-HI learn built as a full-stack web application with a seperate frontend, backend API and database.
The current architecture uses:

Next.js
FastAPI
SQLModel
PostgreSQL
Docker
Python
TypeScript

high-level architecture

user - Next.js frontend - HTTP/API requests - FastAPI Backend - SQLModel - PostgreSQL Datablase

Frontend

The frontend provides user-facing platform,including:

Authentication interfaces
Dashboard
Learning content
Missions
Cases
Progress
XP
Levels
Badges
Lecturer-facing functionalities

Backend

This provides the API and application logic required by the frontend 

Responsibilities include:

Authentication
User managment
Learning content
Missions
Mission attempts
Cases
XP
Progression
Investigation functionality
Database interaction

Database
CY-HI uses PostgreSQL for persistent application data.SQLModel is used to define and interact

with database models.The database stores application infomation such as:

Users
Learning cintent
Missions
Mission attemots
Progress
XP
Levels
Other platform data

Authentication

The platform includes authentication through the backend API.The frontend communicates with the
authentication endpoint and maintains the authentication token required for authenticated requests.

Missions

The missions are designed to be practical cybersecurity activities.
They can contain infomation such as: 
Learning unit
Skill
Difficulty
XP reward
Investigation scenario

Mission attempts allow theplatform to track individual student activity.

Progress system

The platform contains a prgoress system based on XP.XP contributes towards levels and ranks.This
allows practical activity to become part of the students visable learning progression.

Docker

Docker is used to run the application components in a reprodicoble environment. The project includes
Docker configuration for the backend and database.The development enviroment can therefore be 
recreated without requiring everY dependency to be manually installed on the host machine.

Repository structure

cy-hi-learn/
│ ├── apps/
│ ├── backend/ 
│ │ ├── app/
│ │ ├── prisma/ 
│ │ ├── src/
│ │ └── yara_rules/
│ │ │ └── frontend/
│ ├── app/ 
│ ├── components/
│ ├── hooks/ 
│ ├── lib/
│ └── public/
│ ├── docs/
│ ├── docker-compose.yml
├── package.json
└── README.md

Future architecture

The architecture is intended to support future functionality including:

AI tutoring
Automated assesments
Cybersecurity lab environments
Security investigation terminals
Lecturer dashboards
University-specific deployments
Additional cybersecurity learning pathways
