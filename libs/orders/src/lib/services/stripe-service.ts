import { Injectable, signal } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripe = signal<Stripe | null>(null);

  async init() {
    const stripe = await loadStripe('pk_test_51TFbmSIld2QHZHSQiNNEgqdRDlbEPKEoptQHy6N8BTJJ17D3zLP0SsKEEElxeqBHlb30Yfp2fE1bsiA4Vamy0sHp00fq5V6tYE');
    this.stripe.set(stripe);
  }

  getStripe() {
    return this.stripe();
  }
}
