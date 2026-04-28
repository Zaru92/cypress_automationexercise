import type { ContactFormData } from '../../testData/contactFactory';
import type { CardPaymentDetails } from '../../testData/paymentFactory';
import type { TestUser } from '../../testData/userFactory';
import { CheckoutPage } from '../../pageObjects/CheckoutPage';
import { HomePage } from '../../pageObjects/HomePage';
import { OrderConfirmationPage } from '../../pageObjects/OrderConfirmationPage';
import { PaymentPage } from '../../pageObjects/PaymentPage';

export const completeCheckoutAndPay = (
  user: TestUser,
  message: ContactFormData,
  paymentDetails: CardPaymentDetails,
) => {
  new CheckoutPage()
    .assertCheckoutPageVisible()
    .assertDeliveryAddressDetails(user)
    .enterOrderComment(message)
    .placeOrder();
  new PaymentPage().assertPaymentPageVisible().fillPaymentForm(paymentDetails).submitPayment();

  return new OrderConfirmationPage().assertOrderPlaced();
};

export const placeOrderAndContinue = (
  user: TestUser,
  message: ContactFormData,
  paymentDetails: CardPaymentDetails,
) => {
  completeCheckoutAndPay(user, message, paymentDetails).continueAfterPlacement();

  return new HomePage().assertLoaded();
};

export const placeOrderAndDownloadInvoice = (
  user: TestUser,
  message: ContactFormData,
  paymentDetails: CardPaymentDetails,
) => {
  completeCheckoutAndPay(user, message, paymentDetails).downloadInvoice().continueAfterPlacement();

  return new HomePage().assertLoaded();
};
