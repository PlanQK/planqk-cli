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
 * @interface RuntimeConfiguration
 */
export interface RuntimeConfiguration {
    /**
     *
     * @type {string}
     * @memberof RuntimeConfiguration
     */
    runtime?: RuntimeConfigurationRuntimeEnum;
    /**
     *
     * @type {{ [key: string]: string; }}
     * @memberof RuntimeConfiguration
     */
    environment?: { [key: string]: string; };
    /**
     *
     * @type {boolean}
     * @memberof RuntimeConfiguration
     */
    applyProviderTokens?: boolean;
}


/**
 * @export
 */
export const RuntimeConfigurationRuntimeEnum = {
    Docker: 'DOCKER',
    PythonTemplate: 'PYTHON_TEMPLATE'
} as const;
export type RuntimeConfigurationRuntimeEnum = typeof RuntimeConfigurationRuntimeEnum[keyof typeof RuntimeConfigurationRuntimeEnum];


/**
 * Check if a given object implements the RuntimeConfiguration interface.
 */
export function instanceOfRuntimeConfiguration(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function RuntimeConfigurationFromJSON(json: any): RuntimeConfiguration {
    return RuntimeConfigurationFromJSONTyped(json, false);
}

export function RuntimeConfigurationFromJSONTyped(json: any, ignoreDiscriminator: boolean): RuntimeConfiguration {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'runtime': !exists(json, 'runtime') ? undefined : json['runtime'],
        'environment': !exists(json, 'environment') ? undefined : json['environment'],
        'applyProviderTokens': !exists(json, 'applyProviderTokens') ? undefined : json['applyProviderTokens'],
    };
}

export function RuntimeConfigurationToJSON(value?: RuntimeConfiguration | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'runtime': value.runtime,
        'environment': value.environment,
        'applyProviderTokens': value.applyProviderTokens,
    };
}
