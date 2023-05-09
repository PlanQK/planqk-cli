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

export class ServiceExecutionConsumerDto {
    'id'?: string;
    'createdAt'?: string;
    'startedAt'?: string;
    'endedAt'?: string;
    'status'?: ServiceExecutionConsumerDto.StatusEnum;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        },
        {
            "name": "createdAt",
            "baseName": "createdAt",
            "type": "string"
        },
        {
            "name": "startedAt",
            "baseName": "startedAt",
            "type": "string"
        },
        {
            "name": "endedAt",
            "baseName": "endedAt",
            "type": "string"
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "ServiceExecutionConsumerDto.StatusEnum"
        }    ];

    static getAttributeTypeMap() {
        return ServiceExecutionConsumerDto.attributeTypeMap;
    }
}

export namespace ServiceExecutionConsumerDto {
    export enum StatusEnum {
        Unknown = <any> 'UNKNOWN',
        Pending = <any> 'PENDING',
        Running = <any> 'RUNNING',
        Succeeded = <any> 'SUCCEEDED',
        Cancelled = <any> 'CANCELLED',
        Failed = <any> 'FAILED'
    }
}
