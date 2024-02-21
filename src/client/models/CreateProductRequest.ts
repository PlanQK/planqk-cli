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

/**
 *
 * @export
 * @interface CreateProductRequest
 */
export interface CreateProductRequest {
    /**
     *
     * @type {string}
     * @memberof CreateProductRequest
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof CreateProductRequest
     */
    unitLabel?: string;
    /**
     *
     * @type {number}
     * @memberof CreateProductRequest
     */
    amountMajor: number;
}

/**
 * Check if a given object implements the CreateProductRequest interface.
 */
export function instanceOfCreateProductRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "amountMajor" in value;

    return isInstance;
}

export function CreateProductRequestFromJSON(json: any): CreateProductRequest {
    return CreateProductRequestFromJSONTyped(json, false);
}

export function CreateProductRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateProductRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'name': json['name'],
        'unitLabel': !exists(json, 'unitLabel') ? undefined : json['unitLabel'],
        'amountMajor': json['amountMajor'],
    };
}

export function CreateProductRequestToJSON(value?: CreateProductRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'name': value.name,
        'unitLabel': value.unitLabel,
        'amountMajor': value.amountMajor,
    };
}

