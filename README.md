# TaskPhin API

Basic Recruiter Tool with Computed Score, Additional Attribute, and Optional Hosting. The application should allow recruiters to manage candidate information. Each candidate should have the following details:
1. Candidate Name
2. Contact information (email, phone)
3. Skills/Qualifications
4. Current status (Contacted, Interview Scheduled, Offer Extended, Hired, Rejected)
5. Additional Attribute: Expected Salary

#### URL
The API can be found at https://taskphin-api.rogerjacob.com, which is hosted on AWS EC2 using nginx along with custom domain management.

#### Technologies
Node, ElephantSQL

#### How to run the application locally
1. Clone the repository https://github.com/rogerjacobrj/taskphin-be
2. Navigate to the project root and run **npm install**.
3. Create a .env file and assign the value for the following variables
     - **PORT** - the port on which the app runs
     - **DB_CONNECTION_STRING** - the database connection URL for ElephantSQL
5. Run **npm run dev** to start the application in development mode.
6. Run **npm run start** to start the production server.

#### API Endpoints
  - GET - /candidates - fetch candidate list
  - POST - /candidates - add new candidates record
  - GET - /candidates/:id - get candidate record
  - PUT - /candidates/:id - update candidate record
  - DELETE - /candidates/:id - delete candidate record
