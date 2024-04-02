/* tslint:disable */
/* eslint-disable */
/**
 * PlanQK Platform API
 * Part of the OpenAPI specification for the PlanQK Platform.
 *
 * The version of the OpenAPI document: v1
 * Contact: info@anaqor.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import {exists} from '../runtime'
import type {CreateProductRequest} from './CreateProductRequest'
import {CreateProductRequestFromJSON, CreateProductRequestToJSON} from './CreateProductRequest'

/**
 *
 * @export
 * @interface CreateExternalServicePricingPlanRequest
 */
export interface CreateExternalServicePricingPlanRequest {
    /**
     *
     * @type {string}
     * @memberof CreateExternalServicePricingPlanRequest
     */
    type: CreateExternalServicePricingPlanRequestTypeEnum;
    /**
     *
     * @type {Array<CreateProductRequest>}
     * @memberof CreateExternalServicePricingPlanRequest
     */
    products?: Array<CreateProductRequest>;
}


/**
 * @export
 */
export const CreateExternalServicePricingPlanRequestTypeEnum = {
    Free: 'FREE',
    Commercial: 'COMMERCIAL'
} as const;
export type CreateExternalServicePricingPlanRequestTypeEnum = typeof CreateExternalServicePricingPlanRequestTypeEnum[keyof typeof CreateExternalServicePricingPlanRequestTypeEnum];


/**
 * Check if a given object implements the CreateExternalServicePricingPlanRequest interface.
 */
export function instanceOfCreateExternalServicePricingPlanRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;

    return isInstance;
}

export function CreateExternalServicePricingPlanRequestFromJSON(json: any): CreateExternalServicePricingPlanRequest {
    return CreateExternalServicePricingPlanRequestFromJSONTyped(json, false);
}

export function CreateExternalServicePricingPlanRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateExternalServicePricingPlanRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'type': json['type'],
        'products': !exists(json, 'products') ? undefined : ((json['products'] as Array<any>).map(CreateProductRequestFromJSON)),
    };
}

export function CreateExternalServicePricingPlanRequestToJSON(value?: CreateExternalServicePricingPlanRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'type': value.type,
        'products': value.products === undefined ? undefined : ((value.products as Array<any>).map(CreateProductRequestToJSON)),
    };
}
