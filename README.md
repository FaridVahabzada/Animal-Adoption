![Brand Logo](/public/img/home.png) 
 
# Application Name: **Animal Adoption**
## Purpose: **To enable logged-in users of the web application to adopt animals if possible.**
### Author: **Farid Vahabzada**

---

&nbsp;

# Application Installation and Usage Instructions
Not any special installation processes are required other than downloading the whole repository locally, and starting the web app & installing all the necessary packages & dependencies with the **npm start** & **npm install** commands in VS Code terminal, then accessing the [http://localhost:3000/](http://localhost:3000/) page in any browser. Additionally, there is a neeed for creation of an **.env** file. More details can be found below under the appropriate section name.\
**P.S.** We used and recommend using Google Chrome for avoiding any functionality disruptions.

# Environment Variables
Information on the environment variables needed:
```
ADMIN_USERNAME = "dabcaowner"
ADMIN_PASSWORD = "dabca1234"
DATABASE_NAME = "adoptiondb"
DIALECT = "mysql"
DIALECTMODEL = "mysql2"
PORT = "3000"
HOST = "localhost"
```

# Additional Libraries/Packages
The technologies / external libraries used are given below:\
\
![Packages](/public/img/packages.png)
# NodeJS Version Used
Node version was accessed by the **node -v** command and it is shown below:\
\
![Node Version](/public/img/node.png)

# DATABASE
The sql script responsible for creating the database:
```sql
DROP DATABASE adoptiondb;
CREATE DATABASE adoptiondb;
USE adoptiondb;
```

# DATABASEACCESS
The sql script responsible for creating the new user login and password with the admin rights and permissions:
```sql
CREATE USER 'dabcaowner'@'localhost'
IDENTIFIED WITH mysql_native_password
BY 'dabca1234';

GRANT ALL PRIVILEGES
ON adoptiondb.*
TO 'dabcaowner'@'localhost';
```

# Further recommendations and future plans

Remarks for the users or the issues to be fixed for the future app versions, as they do **NOT** cause any functionality problems, are: 
+ After the **Animals Born In Date Range** button is pressed and prompt information is filled, table will be sorted accordingly. However, if this button pressed again, no prompts are initiated. User **must** press any other button for the **Animals Born In Date Range** button to function again.
+ For the **Cancel Adoption** button to be shown for the **admin** user role, adopted animals **must** be present.
