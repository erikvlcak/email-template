How to use:

- clone repository into your folder and run all steps from https://classes.codingbootcamp.cz/coding-bootcamp/wd-autumn-2024/1462-laravel-checklist
- Run XAMPP; make sure that Apache is running on port 80
- Create database called **email**, run migrations to create tables for sent and receied emails
- For sending messages, .env must be set correctly (is already done in this template). This is done only once and will always work, however, you can send emails only to verified email addresses (currently mine and yours, up to 5 can be added). More can be added in Mailgun app - go to Send->Overview and use Authorized Recipients form on the right. Confirmation email will be sent to each new address. 
- Use ngrok to expose localhost to internet (register here - https://ngrok.com/ - download .exe file and run it, console will open)
- In ngrok console, type **ngrok http 80** since it is the apache port, and press enter - a new url will be generated pointing to our localhost 80. Click on this url and make sure it runs the email application. This url will be used in next step.
- Log into Mailgun (I will provide login data) to do a setup for receiving messages: Expression type must be set to **Match recipient** and recipient set to **test@sandboxa0ac285d67634ae6aa635e7b76c21c6b.mailgun.org** and forwarding must be set to **ngrok url** (copy it from ngrok console) + route **/emails/receive** (i.e. https://d5f1-2a02-8308-84-6100-bd99-da35-c8f0-7d2a.ngrok-free.app/emails/receive)
- Each time you run **ngrok http 80** in ngrok console, new url is generated - dont forget to update it in https://app.mailgun.com/mg/receiving/routes (see previous step) 
- csrf validation of incoming message (directed to post route emails/receive) must be disabled in bootstrap/app.php for this route, otherwise you get 419 (is already done in this template)

- TODO: unify route names
