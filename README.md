Quick notes:

- Use https://dashboard.ngrok.com/endpoints to expose localhost to internet (if you dont have ngrok, install it and run it)
- Use port 80 since it is the apache port = ask david if this is ok or should be changed to 8000 (artisan serve) or 5173 (vite)
- in Mailgun setup of receiving messages, Expression type must be set to Match recipient and recipient set to test@sandboxa0ac285d67634ae6aa635e7b76c21c6b.mailgun.org; forwarding must be set to ngrok url + appropriate route (i.e. https://d5f1-2a02-8308-84-6100-bd99-da35-c8f0-7d2a.ngrok-free.app/emails/receive)
- Dont forget to update ngrok url in https://app.mailgun.com/mg/receiving/routes each time you start ngrok!
- csrf validation of incoming message (post) must be disabled in bootstrap/app.php for this route (emails/receive), otherwise you get error 419

- TODO: fix route names
