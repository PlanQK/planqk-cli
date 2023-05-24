export * from './servicePlatformApplicationsApi';
import { ServicePlatformApplicationsApi } from './servicePlatformApplicationsApi';
export * from './servicePlatformDashboardApi';
import { ServicePlatformDashboardApi } from './servicePlatformDashboardApi';
export * from './servicePlatformJobsApi';
import { ServicePlatformJobsApi } from './servicePlatformJobsApi';
export * from './servicePlatformMarketplaceApi';
import { ServicePlatformMarketplaceApi } from './servicePlatformMarketplaceApi';
export * from './servicePlatformMeteringAPIApi';
import { ServicePlatformMeteringAPIApi } from './servicePlatformMeteringAPIApi';
export * from './servicePlatformServicesApi';
import { ServicePlatformServicesApi } from './servicePlatformServicesApi';
export * from './servicePlatformSubscriptionsApi';
import { ServicePlatformSubscriptionsApi } from './servicePlatformSubscriptionsApi';
export * from './taxonomiesApi';
import { TaxonomiesApi } from './taxonomiesApi';
import * as http from 'http';

export class HttpError extends Error {
    constructor (public response: http.IncomingMessage, public body: any, public statusCode?: number) {
        super('HTTP request failed');
        this.name = 'HttpError';
    }
}

export { RequestFile } from '../model/models';

export const APIS = [ServicePlatformApplicationsApi, ServicePlatformDashboardApi, ServicePlatformJobsApi, ServicePlatformMarketplaceApi, ServicePlatformMeteringAPIApi, ServicePlatformServicesApi, ServicePlatformSubscriptionsApi, TaxonomiesApi];
