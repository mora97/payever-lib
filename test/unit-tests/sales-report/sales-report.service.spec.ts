import { Test, TestingModule } from "@nestjs/testing";
import { SalesService  } from "../../../src/business/sales-report/sales-report.service";
import { AppModule } from "../../../src/app.module";
import { INestApplication } from "@nestjs/common";
import { Connection } from "mongoose";
import { DatabaseModule, DatabaseService } from "@app/common";
import { invoiceStub } from "../../common/stubs/invoice.stub";
import { InvoiceRepository } from "../../../src/repositories/invoice.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Invoice, InvoiceSchema } from "../../../src/schemas/invoice.schema";

describe('Sales Unit Test', () => {
    let app: INestApplication;
    let dbConnection: Connection
    let salesService: SalesService

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
                MongooseModule.forFeature([
                    {
                        name: Invoice.name,
                        schema: InvoiceSchema
                    },
                ]),
                DatabaseModule
            ],
            providers: [SalesService, InvoiceRepository],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
                
        dbConnection = moduleRef.get<DatabaseService>(DatabaseService).getDbHandle()    
        salesService = moduleRef.get<SalesService>(SalesService)

    });

    afterEach(async () => {
        await dbConnection.collection('invoices').deleteMany({})
    })

    afterAll(async () => {
        await app.close();
    });

    describe('calulateTotalSale Method', () => {
        it('this method, when find items in the provided date, sum of amounts will be returned ', async () => {
            await dbConnection.collection('invoices').insertOne(invoiceStub())
        
            const totalAmount = await salesService.calculateTotalSales(new Date('2024-12-23'))
            
            expect(totalAmount).toEqual(2000)
        })

        it('when does not exist any invoice, will be reutned 0', async () => {    
            const totalAmount = await salesService.calculateTotalSales()
            
            expect(totalAmount).toEqual(0)
        })
    })
    

    describe('calculateTotalSoldQuantitiesPerItem Metho', () => {
        it(' when find items in the provided date, array of sku with all their quantities will be returned', async () => {
            await dbConnection.collection('invoices').insertOne(invoiceStub())
        
            const skuQuanities = await salesService.calculateTotalSoldQuantitiesPerItem(new Date('2024-12-23'))
            
            expect(skuQuanities).toEqual([
                {
                    _id: invoiceStub().items[0].stock_keeping_unit,
                    totalQuantity: invoiceStub().items[0].quantity
                }
            ])
        })
    
        it('calculateTotalSoldQuantitiesPerItem, when doen not have any items, empty array will be returned', async () => {
            await dbConnection.collection('invoices').insertOne(invoiceStub())
        
            const skuQuanities = await salesService.calculateTotalSoldQuantitiesPerItem()
            
            expect(skuQuanities).toEqual([])
        })
    })    
})