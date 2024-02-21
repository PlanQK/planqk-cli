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
 * @interface ServiceDefinitionOverviewDto
 */
export interface ServiceDefinitionOverviewDto {
    /**
     *
     * @type {string}
     * @memberof ServiceDefinitionOverviewDto
     */
    id?: string;
    /**
     *
     * @type {string}
     * @memberof ServiceDefinitionOverviewDto
     */
    name?: string;
    /**
     *
     * @type {string}
     * @memberof ServiceDefinitionOverviewDto
     */
    serviceId?: string;
    /**
     *
     * @type {string}
     * @memberof ServiceDefinitionOverviewDto
     */
    type?: ServiceDefinitionOverviewDtoTypeEnum;
    /**
     *
     * @type {string}
     * @memberof ServiceDefinitionOverviewDto
     */
    lifecycle?: ServiceDefinitionOverviewDtoLifecycleEnum;
    /**
     *
     * @type {boolean}
     * @memberof ServiceDefinitionOverviewDto
     */
    isDeleted?: boolean;
}


/**
 * @export
 */
export const ServiceDefinitionOverviewDtoTypeEnum = {
    Managed: 'MANAGED',
    External: 'EXTERNAL',
    Workflow: 'WORKFLOW'
} as const;
export type ServiceDefinitionOverviewDtoTypeEnum = typeof ServiceDefinitionOverviewDtoTypeEnum[keyof typeof ServiceDefinitionOverviewDtoTypeEnum];

/**
 * @export
 */
export const ServiceDefinitionOverviewDtoLifecycleEnum = {
    Created: 'CREATED',
    Accessible: 'ACCESSIBLE',
    Published: 'PUBLISHED'
} as const;
export type ServiceDefinitionOverviewDtoLifecycleEnum = typeof ServiceDefinitionOverviewDtoLifecycleEnum[keyof typeof ServiceDefinitionOverviewDtoLifecycleEnum];


/**
 * Check if a given object implements the ServiceDefinitionOverviewDto interface.
 */
export function instanceOfServiceDefinitionOverviewDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ServiceDefinitionOverviewDtoFromJSON(json: any): ServiceDefinitionOverviewDto {
    return ServiceDefinitionOverviewDtoFromJSONTyped(json, false);
}

export function ServiceDefinitionOverviewDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ServiceDefinitionOverviewDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'serviceId': !exists(json, 'serviceId') ? undefined : json['serviceId'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'lifecycle': !exists(json, 'lifecycle') ? undefined : json['lifecycle'],
        'isDeleted': !exists(json, 'isDeleted') ? undefined : json['isDeleted'],
    };
}

export function ServiceDefinitionOverviewDtoToJSON(value?: ServiceDefinitionOverviewDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'id': value.id,
        'name': value.name,
        'serviceId': value.serviceId,
        'type': value.type,
        'lifecycle': value.lifecycle,
        'isDeleted': value.isDeleted,
    };
}

