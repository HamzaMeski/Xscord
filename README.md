

Follow these steps to set up and run both the 
Spring Boot backend and the Angular frontend 
on your local machine.

----------------------------------------------------
 Backend (Spring Boot)
----------------------------------------------------

1. Create the Database
   - Ensure a database exists with a name matching 
     the one specified in application.yml.
   - Edit application.yml to update:
     - username
     - password

2. Run the Backend Application
   > mvn spring-boot:run

----------------------------------------------------
 Frontend (Angular)
----------------------------------------------------

1. Install Dependencies
   > npm install

2. Start the Angular Application
   > ng serve

The Angular app will be accessible at:
   http://localhost:4200

----------------------------------------------------
 Notes
----------------------------------------------------
- Ensure Node.js and Angular CLI are installed.
- Ensure Java 17+ and Maven are properly set up.
- Update any additional configurations if necessary.
