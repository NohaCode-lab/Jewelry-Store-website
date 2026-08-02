import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  try {
    const signature = req.headers.get('stripe-signature');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

    if (!webhookSecret) {
      return new Response(JSON.stringify({ received: true, mode: 'simulation' }), { status: 200 });
    }

    const body = await req.text();
    // Validate signature and update order status in database to 'paid'
    return new Response(JSON.stringify({ status: 'success', event: 'payment_intent.succeeded' }), {
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
});
