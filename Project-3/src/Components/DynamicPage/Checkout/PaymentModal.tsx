import React, { useContext } from 'react';
import Checkout from './Checkout';
import { CheckoutContext } from "../../../Redux/Context";
import './PaymentModal.css';

function PaymentModal() {
  const { paymentModal, setPaymentModal } = useContext(CheckoutContext);

  return (
      <div className='payment-modal'>
          <div onClick={() => setPaymentModal(false)} className='modal'></div>
          <div className='modal-body'><Checkout/></div>
      </div>
  )
}

export default PaymentModal;