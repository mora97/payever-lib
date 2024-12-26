import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceController } from '../../../src/business/invoice/invoice.controller';
import { InvoiceService } from '../../../src/business/invoice/invoice.service';
import { invoiceStub } from '../../common/stubs/invoice.stub';
import { invoicesStub } from '../../common/stubs/invoices.stub';
import { MockInvoiceService } from '../../common/mocks/mock-invoice.service'
import { ApiResponse } from '@app/common/controller/api-response';

describe('InvoiceController', () => {
    let invoiceController: InvoiceController;
    let invoiceService: InvoiceService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [InvoiceController],
            providers: [{ provide: InvoiceService, useValue: MockInvoiceService}]
        }).compile();

        invoiceController = moduleRef.get<InvoiceController>(InvoiceController);
        invoiceService = moduleRef.get<InvoiceService>(InvoiceService);

        jest.clearAllMocks();
    });

    describe('Get Invoices', () => {
        describe('getInvoices will be called, and return list of invoices', () => {
            let invoices: any

            beforeEach(async () => {
                invoices = await invoiceController.getInvoices({
                    date_from: '',
                    date_to: ''
                });
            });

            test('it should call invoiceService', () => {
                expect(MockInvoiceService.getInvoices).toHaveBeenCalledWith({date_from: '', date_to: ''})
            });

            test.only('it should return invoices in date_range filter', () => {
                expect(invoices.data).toEqual(invoicesStub())
            })
        });
    });

    describe('Get Invoice', () => {
        let invoice: ApiResponse;

        describe('getInvoice will be called, and return an specific invoice', () => {
            beforeEach(async () => {
                invoice = await invoiceController.getInvoice(invoiceStub()._id.toString());
            });
    
            test('it should call invoiceService', () => {
                expect(MockInvoiceService.getInvoice).toHaveBeenCalledWith(invoiceStub()._id.toString());
            });
    
            test('it should return an invoice', () => {
                expect(invoice).toEqual(invoiceStub());
            });
        })
    });
});
