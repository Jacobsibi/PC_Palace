import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1N0JhoEFEV6OCr2hoqrxXS2J' },
          { shipping_rate: 'shr_1N0JjiEFEV6OCr2hHADdPlvi' },
        ],


        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/uf4u9rbz/production/').replace('-webp', '.webp');

          return {
            price_data: {
              currency: 'nzd',
              product_data: {
                name: item.name,
                images: [newImage],
              },
              // price * 100 to get value in cents
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity
          }
        }),

         success_url: `${req.headers.origin}/success`,
        // success_url: `${req.headers.origin}/receipts`,
        cancel_url: `${req.headers.origin}/cancel`,
      }
      
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);


    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}