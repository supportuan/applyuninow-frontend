import { useState, useCallback, useRef } from 'react';

const API_BASE_PAYMENTS_URL = "https://payment.applyuninow.com" || '';
const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function parsePrice(priceStr) {
    const cleaned = priceStr.replace(/[₹,\s]/g, '');
    return parseFloat(cleaned);
}

const useRazorpay = () => {
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [error, setError] = useState(null);
    const pollingRef = useRef(null);
    const idempotencyKeyRef = useRef(null);

    const resetPayment = useCallback(() => {
        if (pollingRef.current) clearInterval(pollingRef.current);
        setLoading(false);
        setPaymentStatus(null);
        setError(null);
        idempotencyKeyRef.current = null;
    }, []);

    // Step 1: POST /payments
    async function createPayment(amount, metadata) {
        if (!idempotencyKeyRef.current) idempotencyKeyRef.current = generateUUID();

        const response = await fetch(`${API_BASE_PAYMENTS_URL}/payments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: 1,
                idempotency_key: idempotencyKeyRef.current,
                currency: 'INR',
                metadata: metadata
            })
        });
        const data = await response.json();
        return data.success ? data.payment : null;
    }

    // Step 2: POST /payments/:id/create_order
    async function createRazorpayOrder(paymentId) {
        const response = await fetch(`${API_BASE_PAYMENTS_URL}/payments/${paymentId}/create_order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return data.success ? data : null;
    }

    // Step 4: GET /payments/:reference  (poll every 2s)
    function pollPaymentStatus(paymentReference) {
        return new Promise((resolve) => {
            setPaymentStatus('processing');
            pollingRef.current = setInterval(async () => {
                try {
                    const response = await fetch(`${API_BASE_PAYMENTS_URL}/payments/${paymentReference}`);
                    const data = await response.json();
                    if (data.success && data.payment.status === 'captured') {
                        clearInterval(pollingRef.current);
                        setPaymentStatus('captured');
                        setLoading(false);
                        resolve('captured');
                    } else if (data.success && data.payment.status === 'failed') {
                        clearInterval(pollingRef.current);
                        setPaymentStatus('failed');
                        setError('Payment failed. Please try again.');
                        setLoading(false);
                        resolve('failed');
                    }
                } catch (err) {
                    console.error('Polling error:', err);
                }
            }, 2000);

            // Timeout after 2 minutes
            setTimeout(() => {
                clearInterval(pollingRef.current);
                setPaymentStatus('failed');
                setError('Payment verification timed out. Contact support.');
                setLoading(false);
                resolve('timeout');
            }, 120000);
        });
    }

    // Step 3: Open Razorpay checkout
    function openRazorpayCheckout(orderData, metadata) {
        return new Promise((resolve) => {
            if (typeof window === 'undefined' || !window.Razorpay) {
                setError('Razorpay SDK not loaded. Please refresh.');
                setLoading(false);
                resolve('error');
                return;
            }

            const options = {
                key: orderData.key_id || RAZORPAY_KEY_ID,
                amount: orderData.amount * 100,
                currency: orderData.currency || 'INR',
                order_id: orderData.razorpay_order_id,
                name: 'ApplyUniNow',
                description: metadata.description || 'Study Abroad Package',
                prefill: {
                    name: metadata.user_name || '',
                    email: metadata.user_email || '',
                    contact: metadata.user_phone || ''
                },
                theme: { color: '#1a73e8' },
                handler: function () {
                    pollPaymentStatus(orderData.payment_reference).then(resolve);
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                        setPaymentStatus('failed');
                        setError('Payment was cancelled.');
                        resolve('cancelled');
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                setPaymentStatus('failed');
                setError(response.error?.description || 'Payment failed.');
                setLoading(false);
                resolve('failed');
            });
            rzp.open();
        });
    }

    // Main entry point — mirrors initiatePayment() from reference
    const initiatePayment = useCallback(async (priceString, metadata = {}) => {
        setLoading(true);
        setPaymentStatus('processing');
        setError(null);

        try {
            const amount = parsePrice(priceString);

            // Step 1
            const payment = await createPayment(amount, metadata);
            if (!payment) {
                throw new Error('Failed to create payment');
            }

            // Step 2
            const orderData = await createRazorpayOrder(payment.id);
            if (!orderData) {
                throw new Error('Failed to create Razorpay order');
            }

            // Step 3 + 4 (checkout opens, then polls on success)
            return await openRazorpayCheckout(orderData, metadata);
        } catch (err) {
            console.error('Payment error:', err);
            setLoading(false);
            setPaymentStatus('failed');
            setError(err.message || 'Something went wrong.');
            return 'error';
        }
    }, []);

    return { loading, paymentStatus, error, initiatePayment, resetPayment };
};

export default useRazorpay;
