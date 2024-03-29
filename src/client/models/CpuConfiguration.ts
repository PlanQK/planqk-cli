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
import type {ResourceConfiguration} from './ResourceConfiguration'
import {ResourceConfigurationFromJSONTyped, ResourceConfigurationToJSON} from './ResourceConfiguration'

/**
 *
 * @export
 * @interface CpuConfiguration
 */
export interface CpuConfiguration extends ResourceConfiguration {
    /**
     *
     * @type {number}
     * @memberof CpuConfiguration
     */
    amount?: number;
    /**
     *
     * @type {string}
     * @memberof CpuConfiguration
     */
    unit?: string;
}

/**
 * Check if a given object implements the CpuConfiguration interface.
 */
export function instanceOfCpuConfiguration(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CpuConfigurationFromJSON(json: any): CpuConfiguration {
    return CpuConfigurationFromJSONTyped(json, false);
}

export function CpuConfigurationFromJSONTyped(json: any, ignoreDiscriminator: boolean): CpuConfiguration {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        ...ResourceConfigurationFromJSONTyped(json, ignoreDiscriminator),
        'amount': !exists(json, 'amount') ? undefined : json['amount'],
        'unit': !exists(json, 'unit') ? undefined : json['unit'],
    };
}

export function CpuConfigurationToJSON(value?: CpuConfiguration | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...ResourceConfigurationToJSON(value),
        'amount': value.amount,
        'unit': value.unit,
    };
}

