Quick notes:

- Use https://dashboard.ngrok.com/endpoints to expose localhost to internet (if you dont have ngrok, install it and run it)
- Dont forget to update ngrok route in https://app.mailgun.com/mg/receiving/routes each time you start ngrok
- Use port 80 since it is the apache port = ask david if this is ok or should be changed to 8000 (artisan serve) or 5173 (vite)
- csrf validation of incoming message (post) must be disabled in bootstrap/app.php for the appropriate route (emails/receive) - it is the same route where emails are being forwarded with Mailgun

- TODO: fix route names
