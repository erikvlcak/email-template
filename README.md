Quick notes:

- Run XAMPP; make sure that Apache is running on port 80
- Create database called **email**, run migrations to create tables for sent and receied emails
- For sending messages, .env must be set correctly (is already done in this template)
- Use https://dashboard.ngrok.com/endpoints to expose localhost to internet (register here - https://ngrok.com/ - download .exe file and run it, console will open)
- In ngrok console, type **ngrok http 80** since it is the apache port, and press enter - a new url will be generated pointing to our localhost 80. Click on this url and make sure it runs the email application. This url will be used in next step.
- Log into Mailgun to do a setup of receiving messages: Expression type must be set to **Match recipient** and recipient set to **test@sandboxa0ac285d67634ae6aa635e7b76c21c6b.mailgun.org** and forwarding must be set to **ngrok url** (copy it from ngrok console) + route **/emails/receive** (i.e. https://d5f1-2a02-8308-84-6100-bd99-da35-c8f0-7d2a.ngrok-free.app/emails/receive)
- Dont forget to update ngrok url in https://app.mailgun.com/mg/receiving/routes each time you run **ngrok http 80** in ngrok console!
- csrf validation of incoming message (directed to post route emails/receive) must be disabled in bootstrap/app.php for this route (emails/receive), otherwise you get 419 (is already done in this template)

- TODO: unify route names
