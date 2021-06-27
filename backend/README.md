# Instructions to run this application #

This instructions would normally document whatever steps are necessary to get your application up and running.

### Application Summary ###

This application is about a small micro service where you can send a campaign immediately or schedule it with some date and time, by providing some information from your postman. The link is given below.

https://www.getpostman.com/collections/e0d7bec1e619e3958267

You can access this link via postman it will open.

### Steps of instruction to run this application. ###

1. git clone https://github.com/AmitHazra123/codecloudasgn.git
2. npm install
3. Configure you AWS SES with a verified email address.
4. Check this document to configure SES configuration set
https://docs.aws.amazon.com/ses/latest/DeveloperGuide/using-configuration-sets-in-email.html
5. Configure your system environment variable: 
    a) DB_CONN_STRING = <Your Database URL>
    b) CONFIGURATION_SET_NAME = <Your Configuration Set Name from AWS SES>
6. npm start -s

### Steps of instruction to this application with Docker image. ###

1. docker pull amithazra/codecloudeasgn
2. docker run amithazra/codecloudeasgn

### Steps of instruction to test this application with jest. ###

1. npm run test

### Any Query? ###

Hope this steps of instruction will help to run this application. Still if any problems you are facing, let me know, I can help you.

### Thank You! ###