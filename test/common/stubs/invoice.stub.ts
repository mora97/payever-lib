import { Types } from 'mongoose';
import { Invoice } from '../../../src/schemas/invoice.schema';

const INVOICE_DATE = '2024-12-23T12:40:32Z';

export const invoiceStub = (): Invoice => {    
    return {
        _id: new Types.ObjectId('67693aa2b1cccbab4cbed67a'),
        customer: 'mohammad',
        amount: 2000,
        reference: 'item_1',
        date: new Date(INVOICE_DATE),
        items: [
            {
                stock_keeping_unit: 'test',
                quantity: 2
            }
        ],
        created_at: new Date(INVOICE_DATE)
    };
};

export const clientInvoiceStub = () => {
    return {
        customer: 'mohammad',
        amount: 2000,
        reference: 'item_1',
        date: new Date(INVOICE_DATE),
        items: [
            {
                stock_keeping_unit: 'test',
                quantity: 2
            }
        ],
    };
}
