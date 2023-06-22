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

import {TaxonomyElement} from './taxonomyElement'

export class ServiceOverviewDto {
    /**
    * The access permission role for this entity of the current user
    */
    'currentUserPermission'?: ServiceOverviewDto.CurrentUserPermissionEnum;
    'id'?: string;
    'serviceDefinitionId'?: string;
    'name'?: string;
    'logoUrl'?: string;
    'provider'?: string;
    'type'?: ServiceOverviewDto.TypeEnum;
    'quantumBackend'?: ServiceOverviewDto.QuantumBackendEnum;
    'lifecycle'?: ServiceOverviewDto.LifecycleEnum;
    'industries'?: Set<TaxonomyElement>;
    'createdAt'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "currentUserPermission",
            "baseName": "currentUserPermission",
            "type": "ServiceOverviewDto.CurrentUserPermissionEnum"
        },
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        },
        {
            "name": "serviceDefinitionId",
            "baseName": "serviceDefinitionId",
            "type": "string"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "logoUrl",
            "baseName": "logoUrl",
            "type": "string"
        },
        {
            "name": "provider",
            "baseName": "provider",
            "type": "string"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "ServiceOverviewDto.TypeEnum"
        },
        {
            "name": "quantumBackend",
            "baseName": "quantumBackend",
            "type": "ServiceOverviewDto.QuantumBackendEnum"
        },
        {
            "name": "lifecycle",
            "baseName": "lifecycle",
            "type": "ServiceOverviewDto.LifecycleEnum"
        },
        {
            "name": "industries",
            "baseName": "industries",
            "type": "Set<TaxonomyElement>"
        },
        {
            "name": "createdAt",
            "baseName": "createdAt",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return ServiceOverviewDto.attributeTypeMap;
    }
}

export namespace ServiceOverviewDto {
    export enum CurrentUserPermissionEnum {
        Viewer = <any> 'VIEWER',
        Maintainer = <any> 'MAINTAINER',
        Owner = <any> 'OWNER'
    }
    export enum TypeEnum {
        Managed = <any> 'MANAGED',
        External = <any> 'EXTERNAL'
    }
    export enum QuantumBackendEnum {
        Ibm = <any> 'IBM',
        Ionq = <any> 'IONQ',
        Dwave = <any> 'DWAVE',
        None = <any> 'NONE'
    }
    export enum LifecycleEnum {
        Created = <any> 'CREATED',
        Accessible = <any> 'ACCESSIBLE',
        Published = <any> 'PUBLISHED'
    }
}
