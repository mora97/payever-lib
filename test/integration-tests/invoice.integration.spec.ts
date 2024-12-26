import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { Connection, Types } from 'mongoose';
import { DatabaseService } from '@app/common/database/database.service';
import { clientInvoiceStub, invoiceStub } from '../common/stubs/invoice.stub';
import { AppModule } from '../../src/app.module';
import { invoicesStub } from '../common/stubs/invoices.stub';
import { Invoice } from '../../src/schemas/invoice.schema';


describe('Invoice Controller end 2 end testing', () => {
    let app: INestApplication;
    let dbConnection: Connection
    let httpServer: any

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleRef.createNestApplication();
        
        await app.useGlobalPipes(new ValidationPipe())
        await app.init();
        
        httpServer = app.getHttpServer()
        dbConnection = moduleRef.get<DatabaseService>(DatabaseService).getDbHandle()
    });

    afterEach(async () => {
        await dbConnection.collection('invoices').deleteMany({})
    })

    afterAll(async () => {
        await app.close();
    });

    describe('@Post /api/invoice', () => {
        it('Creat an invoice', async () => {
            const response = await request(httpServer).post('/').send(clientInvoiceStub())
            
            expect(response.status).toBe(201)
            expect(response.body.data).toHaveProperty('_id')
            expect(response.body.message).toEqual('Invoice added successfully')
        })
    })
    

    describe('@Get /api/invoice', () => {
        it('Get invoice list, without any filter', async () => {
            await dbConnection.collection('invoices').insertOne(invoiceStub())
    
            const response = await request(httpServer).get('/')
            
            response.body.data.items[0] = convertFileds(response.body.data.items[0])
            
            expect(response.status).toBe(200)
            expect(response.body.data).toEqual(invoicesStub())
        })

        it('Get invoice list with date filter, return a list of invoices', async () => {
            await dbConnection.collection('invoices').insertOne(invoiceStub())

            const response = await request(httpServer).get('?date_from=2024-12-20&date_to=2024-12-25')
            let data = response.body.data.items[0]
            
            response.body.data.items[0] = convertFileds(response.body.data.items[0])

            expect(response.status).toBe(200)
            expect(response.body.data).toEqual(invoicesStub())
        })

        it('Get invoice list with wroing date filter, when date_from is greater than date_to, return an error', async () => {
            await dbConnection.collection('invoices').insertOne(invoiceStub())

            const response = await request(httpServer).get('?date_from=2024-12-21&date_to=2024-12-20')
            
            expect(response.status).toBe(400)
        })
    })    

    describe('@Get /api/invoice/:id', () => {
        it('Get a specific invoice by :id', async () => {
            await dbConnection.collection('invoices').insertOne(invoiceStub())
    
            const response = await request(httpServer).get(`/${invoiceStub()._id.toString()}`)
            const body = convertFileds(response.body.data)
            
            expect(response.status).toBe(200)
            expect(body).toEqual(invoiceStub())
        });
    })
});

const convertFileds = (data: Invoice) => {
    return {
        ...data,
        date: new Date(data.date),
        created_at: new Date(data.created_at),
        _id: new Types.ObjectId(data._id)
    }
}
