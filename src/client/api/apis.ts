export * from './servicePlatformApplicationsApi';
import {ServicePlatformApplicationsApi} from './servicePlatformApplicationsApi'
import {ServicePlatformDashboardApi} from './servicePlatformDashboardApi'
import {ServicePlatformMarketplaceApi} from './servicePlatformMarketplaceApi'
import {ServicePlatformMeteringAPIApi} from './servicePlatformMeteringAPIApi'
import {ServicePlatformServicesApi} from './servicePlatformServicesApi'
import {ServicePlatformSubscriptionsApi} from './servicePlatformSubscriptionsApi'
import {TaxonomiesApi} from './taxonomiesApi'
import * as http from 'http'

export * from './servicePlatformDashboardApi';
export * from './servicePlatformMarketplaceApi';
export * from './servicePlatformMeteringAPIApi';
export * from './servicePlatformServicesApi';
export * from './servicePlatformSubscriptionsApi';
export * from './taxonomiesApi';

export class HttpError extends Error {
    constructor (public response: http.IncomingMessage, public body: any, public statusCode?: number) {
        super('HTTP request failed');
        this.name = 'HttpError';
    }
}

export { RequestFile } from '../model/models';

export const APIS = [ServicePlatformApplicationsApi, ServicePlatformDashboardApi, ServicePlatformMarketplaceApi, ServicePlatformMeteringAPIApi, ServicePlatformServicesApi, ServicePlatformSubscriptionsApi, TaxonomiesApi];
