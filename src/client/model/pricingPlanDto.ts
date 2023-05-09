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

import {ProductDto} from './productDto'

export class PricingPlanDto {
    'id'?: string;
    'type'?: PricingPlanDto.TypeEnum;
    'products'?: Array<ProductDto>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "PricingPlanDto.TypeEnum"
        },
        {
            "name": "products",
            "baseName": "products",
            "type": "Array<ProductDto>"
        }    ];

    static getAttributeTypeMap() {
        return PricingPlanDto.attributeTypeMap;
    }
}

export namespace PricingPlanDto {
    export enum TypeEnum {
        Free = <any> 'FREE',
        Commercial = <any> 'COMMERCIAL'
    }
}
