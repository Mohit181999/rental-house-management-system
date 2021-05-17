# Rental House Management System

Here is video link showing how our project works :- 
 https://drive.google.com/file/d/1TLT7NMk1pTDBmJ6eheN5nbmPGdWo4Pug/view?usp=sharing

## Steps to run the project are as follow:

Database used for this project is mySQL hence in order to run project you can use a virtual server i.e [XAMPP](https://www.apachefriends.org/download.html) on your PC, Install XAMPP, open xampp control panel and start Apache server and in the browser and go to phpmyadmin `http://localhost/phpmyadmin/` and extract the project files, then the steps are as follow:
- Copy the main project folder and navigate to location where you have installed xammp
- Paste project folder in `xampp/htdocs/`
- In `http://localhost/phpmyadmin/`, Click on the databases tab and create a database naming `rhms` and then click on the import tab
- Click on browse file and select `rhms.sql` file which is inside the `db` folder of our project and click go.
- after that open db.js file present in the db folder change password with password of your root directory.
      
### OR
      
Install mySQL on your system and create the database for the project manually

Steps are as follow:
- Open terminal in project directory and type `npm install` (nodejs should be installed in your system)
- then type `node server.js` or `nodemon server.js`, once message stating db connected appears then open browser
- Now the server is running on `http://localhost:4343/`
