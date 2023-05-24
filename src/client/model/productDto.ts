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

import { RequestFile } from './models';

export class ProductDto {
    'id'?: string;
    'name'?: string;
    'unitLabel'?: string;
    'amountMajor'?: number;
    'currency'?: string;
    'type'?: ProductDto.TypeEnum;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "unitLabel",
            "baseName": "unitLabel",
            "type": "string"
        },
        {
            "name": "amountMajor",
            "baseName": "amountMajor",
            "type": "number"
        },
        {
            "name": "currency",
            "baseName": "currency",
            "type": "string"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "ProductDto.TypeEnum"
        }    ];

    static getAttributeTypeMap() {
        return ProductDto.attributeTypeMap;
    }
}

export namespace ProductDto {
    export enum TypeEnum {
        Api = <any> 'API',
        Cpu = <any> 'CPU',
        Memory = <any> 'MEMORY',
        Ionq1GateShot = <any> 'IONQ_1_GATE_SHOT',
        Ionq2GateShot = <any> 'IONQ_2_GATE_SHOT',
        Custom = <any> 'CUSTOM',
        GpuNvidiaT4 = <any> 'GPU_NVIDIA_T4',
        GpuNvidiaV100 = <any> 'GPU_NVIDIA_V100'
    }
}
