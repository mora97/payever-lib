import { Test, TestingModule } from "@nestjs/testing";
import { SalesReportEmail } from "../../../src/cron-jobs/sales-report-cron-job/sales-report-email";
import { RmqModule } from "@app/common";
import { CONSUMER_SERIVCE } from "../../../src/constants/services";
import { AppModule } from "../../../src/app.module";

describe('Email Sales Report', () => {
    let salesReportEmail: SalesReportEmail

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
                RmqModule.register({
                    name: CONSUMER_SERIVCE
                })
            ],
            providers: [SalesReportEmail],
        }).compile();

        salesReportEmail = moduleRef.get<SalesReportEmail>(SalesReportEmail);
    })

    describe('Check the Consumer Service will be called to send email', () => {
        it('If the report was sent, response status will be success', async () => {
            const response = await salesReportEmail.init({
                reportURL: 'http://test.com',
                totalSales: 20,
                soldQuantitiesPerItem: []
            }).send()
    
            
            expect(response.status).toEqual('success')
        })
    })
})