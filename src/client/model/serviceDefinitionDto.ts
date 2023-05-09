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

import {PricingPlanDto} from './pricingPlanDto'
import {RuntimeConfiguration} from './runtimeConfiguration'
import {ServiceDefinitionDtoConfigurationsInner} from './serviceDefinitionDtoConfigurationsInner'
import {TaxonomyElement} from './taxonomyElement'

export class ServiceDefinitionDto {
    'id'?: string;
    'version'?: string;
    'name'?: string;
    'context'?: string;
    'description'?: string;
    'productionEndpoint'?: string;
    'gatewayEndpoint'?: string;
    'quantumBackend'?: ServiceDefinitionDto.QuantumBackendEnum;
    'type'?: ServiceDefinitionDto.TypeEnum;
    'pricingPlans'?: Array<PricingPlanDto>;
    'lifecycle'?: ServiceDefinitionDto.LifecycleEnum;
    'industries'?: Set<TaxonomyElement>;
    'createdAt'?: string;
    'modifiedAt'?: string;
    'createdBy'?: string;
    'modifiedBy'?: string;
    'configurations'?: Set<ServiceDefinitionDtoConfigurationsInner>;
    'runtimeConfiguration'?: RuntimeConfiguration;
    'logoUrl'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        },
        {
            "name": "version",
            "baseName": "version",
            "type": "string"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "context",
            "baseName": "context",
            "type": "string"
        },
        {
            "name": "description",
            "baseName": "description",
            "type": "string"
        },
        {
            "name": "productionEndpoint",
            "baseName": "productionEndpoint",
            "type": "string"
        },
        {
            "name": "gatewayEndpoint",
            "baseName": "gatewayEndpoint",
            "type": "string"
        },
        {
            "name": "quantumBackend",
            "baseName": "quantumBackend",
            "type": "ServiceDefinitionDto.QuantumBackendEnum"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "ServiceDefinitionDto.TypeEnum"
        },
        {
            "name": "pricingPlans",
            "baseName": "pricingPlans",
            "type": "Array<PricingPlanDto>"
        },
        {
            "name": "lifecycle",
            "baseName": "lifecycle",
            "type": "ServiceDefinitionDto.LifecycleEnum"
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
        },
        {
            "name": "modifiedAt",
            "baseName": "modifiedAt",
            "type": "string"
        },
        {
            "name": "createdBy",
            "baseName": "createdBy",
            "type": "string"
        },
        {
            "name": "modifiedBy",
            "baseName": "modifiedBy",
            "type": "string"
        },
        {
            "name": "configurations",
            "baseName": "configurations",
            "type": "Set<ServiceDefinitionDtoConfigurationsInner>"
        },
        {
            "name": "runtimeConfiguration",
            "baseName": "runtimeConfiguration",
            "type": "RuntimeConfiguration"
        },
        {
            "name": "logoUrl",
            "baseName": "logoUrl",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return ServiceDefinitionDto.attributeTypeMap;
    }
}

export namespace ServiceDefinitionDto {
    export enum QuantumBackendEnum {
        Ibm = <any> 'IBM',
        Ionq = <any> 'IONQ',
        Dwave = <any> 'DWAVE',
        None = <any> 'NONE'
    }
    export enum TypeEnum {
        Managed = <any> 'MANAGED',
        External = <any> 'EXTERNAL'
    }
    export enum LifecycleEnum {
        Error = <any> 'ERROR',
        Creating = <any> 'CREATING',
        Created = <any> 'CREATED',
        Accessible = <any> 'ACCESSIBLE',
        Published = <any> 'PUBLISHED'
    }
}