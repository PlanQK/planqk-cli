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
import type {ProductDto} from './ProductDto'
import {ProductDtoFromJSON, ProductDtoToJSON} from './ProductDto'

/**
 *
 * @export
 * @interface PricingPlanDto
 */
export interface PricingPlanDto {
    /**
     *
     * @type {string}
     * @memberof PricingPlanDto
     */
    id?: string;
    /**
     *
     * @type {string}
     * @memberof PricingPlanDto
     */
    type?: PricingPlanDtoTypeEnum;
    /**
     *
     * @type {Array<ProductDto>}
     * @memberof PricingPlanDto
     */
    products?: Array<ProductDto>;
}


/**
 * @export
 */
export const PricingPlanDtoTypeEnum = {
    Free: 'FREE',
    Commercial: 'COMMERCIAL'
} as const;
export type PricingPlanDtoTypeEnum = typeof PricingPlanDtoTypeEnum[keyof typeof PricingPlanDtoTypeEnum];


/**
 * Check if a given object implements the PricingPlanDto interface.
 */
export function instanceOfPricingPlanDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PricingPlanDtoFromJSON(json: any): PricingPlanDto {
    return PricingPlanDtoFromJSONTyped(json, false);
}

export function PricingPlanDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PricingPlanDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'id': !exists(json, 'id') ? undefined : json['id'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'products': !exists(json, 'products') ? undefined : ((json['products'] as Array<any>).map(ProductDtoFromJSON)),
    };
}

export function PricingPlanDtoToJSON(value?: PricingPlanDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'id': value.id,
        'type': value.type,
        'products': value.products === undefined ? undefined : ((value.products as Array<any>).map(ProductDtoToJSON)),
    };
}

