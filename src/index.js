import { createPaymentMethod, retrievePaymentMethod } from './payment-methods/index';
import { createPaymentIntent, retrievePaymentIntent, attachToPaymentIntent } from './payment-intents/index';
import { createToken, retrieveToken } from './tokens/index';
import { createSource } from './sources/index';
import { createPayment, retrievePayment, listPayments } from './payments/index';
import { createWebhook, retrieveWebhook, listWebhooks, toggleWebhook } from './webhooks/index';

export default class Paymongo {
  constructor (secret) {
    if (Paymongo.instance instanceof Paymongo) return Paymongo.instance;
    if (!secret) throw new Error('API key is required!');
    this.secret = secret;

    // PAYMENT METHODS
    this.paymentMethods = {
      create: (data) => createPaymentMethod(this.secret, data),
      retrieve: (id) => retrievePaymentMethod(this.secret, id),
    };
    // PAYMENT INTENT
    this.paymentIntents = {
      create: (data) => createPaymentIntent(this.secret, data),
      retrieve: (id) => retrievePaymentIntent(this.secret, id),
      attach: (id, data) => attachToPaymentIntent(this.secret, id, data),
    };
    // SOURCES
    this.sources = {
      create: (data) => createSource(this.secret, data),
    };
    // PAYMENTS
    this.payments = {
      create: (data) => createPayment(this.secret, data),
      retrieve: (id) => retrievePayment(this.secret, id),
      list: () => listPayments(this.secret),
    };
    // TOKENS
    this.tokens = {
      create: (data) => createToken(this.secret, data),
      retrieve: (id) => retrieveToken(this.secret, id),
    };
    // WEBHOOKS
    this.webhooks = {
      create: (data) => createWebhook(this.secret, data),
      retrieve: (id) => retrieveWebhook(this.secret, id),
      list: () => listWebhooks(this.secret),
      toggle: (id, action) => toggleWebhook(this.secret, id, action),
    };

    Object.freeze(this.secret);
    Object.freeze(this);
    Paymongo.instance = this;
  }
}