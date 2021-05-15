# rental-house-management-system

Steps to run the project are as follow: -

1. INSTALLATION: -
      Database used for this project is SQL hence in order to run project you can  use a virtual server i.e XAMPP(https://www.apachefriends.org/download.html) on your PC
      once down installed XAMPP, open xampp control panel and start Apache server and in the browser type http://localhost/phpmyadmin/
      After this download project code and extract the files, then follow these steps:-
      1. Copy the main project folder and navigate to location where you have installed xammp
      2. you need to Paste project folder in xampp/htdocs/
      3. in the http://localhost/phpmyadmin/ Click on the databases tab and create a database naming “rhms” and then click on the import tab
      4. Click on browse file and select “rhms.sql” file which is inside the “db” folder of our project and click go.
      5. after that open db.js file present in the db folder change password with password of your root directory.
      
      OR
      
      you should have mysql installed on your system and create database by name rhms and define tables according to our project report.
      
2. Run the project:-
      steps to run the project:-
      1.Open terminal in project directory and type npm install(nodejs should be installed in your system to type this command)
      2.after that type node server.js or nodemon server.js, once message stating db connected appears then open browser 
      3.type http://localhost:4343/
      
      Now the project has started.
