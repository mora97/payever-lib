import { invoiceStub } from '../stubs/invoice.stub';
import { invoicesStub } from '../stubs/invoices.stub';

export const MockInvoiceService = {
    getInvoices: jest.fn().mockResolvedValue(invoicesStub()),
    getInvoice: jest.fn().mockResolvedValue(invoiceStub()),
    createInvoice: jest.fn().mockResolvedValue(invoiceStub())
};
