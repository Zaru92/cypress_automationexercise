import type { ContactMessage } from '../../testData/contactFactory';
import type { PaymentDetails } from '../../testData/paymentFactory';
import type { User } from '../../testData/userFactory';
import { CheckoutPage } from '../../pageObjects/CheckoutPage';
import { HomePage } from '../../pageObjects/HomePage';
import { OrderPlacementSuccessPage } from '../../pageObjects/OrderPlacementSuccessPage';
import { PaymentPage } from '../../pageObjects/PaymentPage';

export const completeCheckout = (
  user: User,
  message: ContactMessage,
  paymentDetails: PaymentDetails,
) => {
  new CheckoutPage()
    .assertCheckoutPageVisible()
    .assertAddressDetails(user)
    .fillForm(message)
    .placeOrder();
  new PaymentPage().assertPaymentPageVisible().fillForm(paymentDetails).submit();

  return new OrderPlacementSuccessPage().assertOrderPlaced();
};

export const placeOrderAndContinue = (
  user: User,
  message: ContactMessage,
  paymentDetails: PaymentDetails,
) => {
  completeCheckout(user, message, paymentDetails).continueAfterPlacement();

  return new HomePage().assertLoaded();
};

export const placeOrderAndDownloadInvoice = (
  user: User,
  message: ContactMessage,
  paymentDetails: PaymentDetails,
) => {
  completeCheckout(user, message, paymentDetails).downloadInvoice().continueAfterPlacement();

  return new HomePage().assertLoaded();
};
