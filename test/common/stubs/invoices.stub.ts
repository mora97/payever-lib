import { Types } from 'mongoose';

export const invoicesStub = () => {
    const INVOICE_DATE = '2024-12-23T12:40:32Z';

    return {
        items: [
            {
                _id: new Types.ObjectId('67693aa2b1cccbab4cbed67a'),
                customer: 'mohammad',
                amount: 2,
                reference: 'item_1',
                date: new Date(INVOICE_DATE),
                items: [
                    {
                        stock_keeping_unit: 'ewew',
                        quantity: 2
                    }
                ],
                created_at: new Date(INVOICE_DATE)
            }
        ],
        pagination: {
            current_page: 1,
            total_pages: 1,
            total_items: 1,
            items_per_page: 2
        }
    }
};
