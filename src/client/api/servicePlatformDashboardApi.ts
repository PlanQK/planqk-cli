/**
 * PlanQK Platform OpenAPI definition
 * OpenAPI definition for the Platform and Ecosystem for Quantum-assisted Artificial Intelligence Platform
 *
 * The version of the OpenAPI document: v1
 * Contact: info@stoneone.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as localVarRequest from 'request'
import * as http from 'http'

/* tslint:disable:no-unused-locals */
import {MonthAmountDto} from '../model/monthAmountDto'

import {ApiKeyAuth, Authentication, Interceptor, OAuth, ObjectSerializer, VoidAuth} from '../model/models'

import {HttpError} from './apis'

let defaultBasePath = 'https://platform.planqk.de/qc-catalog';

// ===============================================
// This file is autogenerated - Please do not edit
// ===============================================

export enum ServicePlatformDashboardApiApiKeys {
    apiKey,
}

export class ServicePlatformDashboardApi {
    protected _basePath = defaultBasePath;
    protected _defaultHeaders : any = {};
    protected _useQuerystring : boolean = false;

    protected authentications = {
        'default': <Authentication>new VoidAuth(),
        'apiKey': new ApiKeyAuth('header', 'X-Auth-Token'),
        'oauth2': new OAuth(),
    }

    protected interceptors: Interceptor[] = [];

    constructor(basePath?: string);
    constructor(basePathOrUsername: string, password?: string, basePath?: string) {
        if (password) {
            if (basePath) {
                this.basePath = basePath;
            }
        } else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername
            }
        }
    }

    set useQuerystring(value: boolean) {
        this._useQuerystring = value;
    }

    set basePath(basePath: string) {
        this._basePath = basePath;
    }

    set defaultHeaders(defaultHeaders: any) {
        this._defaultHeaders = defaultHeaders;
    }

    get defaultHeaders() {
        return this._defaultHeaders;
    }

    get basePath() {
        return this._basePath;
    }

    public setDefaultAuthentication(auth: Authentication) {
        this.authentications.default = auth;
    }

    public setApiKey(key: ServicePlatformDashboardApiApiKeys, value: string) {
        (this.authentications as any)[ServicePlatformDashboardApiApiKeys[key]].apiKey = value;
    }

    set accessToken(token: string) {
        this.authentications.oauth2.accessToken = token;
    }

    public addInterceptor(interceptor: Interceptor) {
        this.interceptors.push(interceptor);
    }

    /**
     * Returns the cost report for a given month.
     * @param year Year of the month to get the costs for.
     * @param month Month to get the costs for.
     * @param xOrganizationId The ID of your organization in case you want to perform operations in this context. Leave it empty to operate in your personal space.
     */
    public async getCostsByMonth (year: number, month: number, xOrganizationId?: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: http.IncomingMessage; body: MonthAmountDto;  }> {
        const localVarPath = this.basePath + '/dashboard/costs';
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this._defaultHeaders);
        const produces = ['application/json'];
        // give precedence to 'application/json'
        if (produces.indexOf('application/json') >= 0) {
            localVarHeaderParams.Accept = 'application/json';
        } else {
            localVarHeaderParams.Accept = produces.join(',');
        }
        let localVarFormParams: any = {};

        // verify required parameter 'year' is not null or undefined
        if (year === null || year === undefined) {
            throw new Error('Required parameter year was null or undefined when calling getCostsByMonth.');
        }

        // verify required parameter 'month' is not null or undefined
        if (month === null || month === undefined) {
            throw new Error('Required parameter month was null or undefined when calling getCostsByMonth.');
        }

        if (year !== undefined) {
            localVarQueryParameters['year'] = ObjectSerializer.serialize(year, "number");
        }

        if (month !== undefined) {
            localVarQueryParameters['month'] = ObjectSerializer.serialize(month, "number");
        }

        localVarHeaderParams['X-OrganizationId'] = ObjectSerializer.serialize(xOrganizationId, "string");
        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };

        let authenticationPromise = Promise.resolve();
        if (this.authentications.apiKey.apiKey) {
            authenticationPromise = authenticationPromise.then(() => this.authentications.apiKey.applyToRequest(localVarRequestOptions));
        }
        if (this.authentications.oauth2.accessToken) {
            authenticationPromise = authenticationPromise.then(() => this.authentications.oauth2.applyToRequest(localVarRequestOptions));
        }
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));

        let interceptorPromise = authenticationPromise;
        for (const interceptor of this.interceptors) {
            interceptorPromise = interceptorPromise.then(() => interceptor(localVarRequestOptions));
        }

        return interceptorPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise<{ response: http.IncomingMessage; body: MonthAmountDto;  }>((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            body = ObjectSerializer.deserialize(body, "MonthAmountDto");
                            resolve({ response: response, body: body });
                        } else {
                            reject(new HttpError(response, body, response.statusCode));
                        }
                    }
                });
            });
        });
    }
    /**
     * Returns the revenue report for a given month.
     * @param year Year of the month to get the revenue for.
     * @param month Month to get the revenue for.
     * @param xOrganizationId The ID of your organization in case you want to perform operations in this context. Leave it empty to operate in your personal space.
     */
    public async getRevenueByMonth (year: number, month: number, xOrganizationId?: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: http.IncomingMessage; body: MonthAmountDto;  }> {
        const localVarPath = this.basePath + '/dashboard/revenue';
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this._defaultHeaders);
        const produces = ['application/json'];
        // give precedence to 'application/json'
        if (produces.indexOf('application/json') >= 0) {
            localVarHeaderParams.Accept = 'application/json';
        } else {
            localVarHeaderParams.Accept = produces.join(',');
        }
        let localVarFormParams: any = {};

        // verify required parameter 'year' is not null or undefined
        if (year === null || year === undefined) {
            throw new Error('Required parameter year was null or undefined when calling getRevenueByMonth.');
        }

        // verify required parameter 'month' is not null or undefined
        if (month === null || month === undefined) {
            throw new Error('Required parameter month was null or undefined when calling getRevenueByMonth.');
        }

        if (year !== undefined) {
            localVarQueryParameters['year'] = ObjectSerializer.serialize(year, "number");
        }

        if (month !== undefined) {
            localVarQueryParameters['month'] = ObjectSerializer.serialize(month, "number");
        }

        localVarHeaderParams['X-OrganizationId'] = ObjectSerializer.serialize(xOrganizationId, "string");
        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };

        let authenticationPromise = Promise.resolve();
        if (this.authentications.apiKey.apiKey) {
            authenticationPromise = authenticationPromise.then(() => this.authentications.apiKey.applyToRequest(localVarRequestOptions));
        }
        if (this.authentications.oauth2.accessToken) {
            authenticationPromise = authenticationPromise.then(() => this.authentications.oauth2.applyToRequest(localVarRequestOptions));
        }
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));

        let interceptorPromise = authenticationPromise;
        for (const interceptor of this.interceptors) {
            interceptorPromise = interceptorPromise.then(() => interceptor(localVarRequestOptions));
        }

        return interceptorPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise<{ response: http.IncomingMessage; body: MonthAmountDto;  }>((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            body = ObjectSerializer.deserialize(body, "MonthAmountDto");
                            resolve({ response: response, body: body });
                        } else {
                            reject(new HttpError(response, body, response.statusCode));
                        }
                    }
                });
            });
        });
    }
}