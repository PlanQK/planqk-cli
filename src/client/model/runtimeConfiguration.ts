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

export class RuntimeConfiguration {
    'runtime'?: RuntimeConfiguration.RuntimeEnum;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "runtime",
            "baseName": "runtime",
            "type": "RuntimeConfiguration.RuntimeEnum"
        }    ];

    static getAttributeTypeMap() {
        return RuntimeConfiguration.attributeTypeMap;
    }
}

export namespace RuntimeConfiguration {
    export enum RuntimeEnum {
        Docker = <any> 'DOCKER',
        PythonTemplate = <any> 'PYTHON_TEMPLATE',
        Python = <any> 'PYTHON'
    }
}
