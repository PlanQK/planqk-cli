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
 * @interface CreateApplicationRequest
 */
export interface CreateApplicationRequest {
    /**
     *
     * @type {string}
     * @memberof CreateApplicationRequest
     */
    name?: string;
}

/**
 * Check if a given object implements the CreateApplicationRequest interface.
 */
export function instanceOfCreateApplicationRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CreateApplicationRequestFromJSON(json: any): CreateApplicationRequest {
    return CreateApplicationRequestFromJSONTyped(json, false);
}

export function CreateApplicationRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateApplicationRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'name': !exists(json, 'name') ? undefined : json['name'],
    };
}

export function CreateApplicationRequestToJSON(value?: CreateApplicationRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'name': value.name,
    };
}

