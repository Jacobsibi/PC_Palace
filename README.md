# PC Palace

We are an ecommerce website for selling computer parts and providing a PC builder experience from our warehouse.

This is a project written in Nextjs using Firebase Logins for logins, Sanity for a data warehouse, Stripe for payment checkouts, and EmailJS for email operations.

This is a group project written for COMP602 Software Development Practices paper at Auckland University of Technology.


## Getting Started

Create an account and get a key from 
[Firebase Logins](https://firebase.google.com/products/auth) and
[Stripe](https://stripe.com/), and
[EmailJS](https://www.emailjs.com/).

Clone the repository using `git clone https://github.com/Jacobsibi/PC_Palace`

Install npm packages using `npm i`

Enter your API keys into the `.env` file:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = stripe publishable key
NEXT_PUBLIC_STRIPE_SECRET_KEY = stripe secret key
NEXT_PUBLIC_FIREBASE_CONFIG_APIKEY = firebase api key
NEXT_PUBLIC_EMAILJS_SERVICE_ID = emailjs service id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = emailjs template id
```


## Usage

### Website

To build a production build, execute:
```
npm run build
```

To run the production build, execute:
```
npm run start
```

### Sanity
To view the Sanity warehouse, execute:
```
cd sanitypcpalace
sanity dev
```
