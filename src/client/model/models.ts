import * as localVarRequest from 'request'
import * as fs from 'fs'
import {AccessTokenDto} from './accessTokenDto'
import {AmountMajorDto} from './amountMajorDto'
import {ApiDto} from './apiDto'
import {ApiOverviewDto} from './apiOverviewDto'
import {ApplicationDto} from './applicationDto'
import {BuildJobDto} from './buildJobDto'
import {CpuConfiguration} from './cpuConfiguration'
import {CpuConfigurationAllOf} from './cpuConfigurationAllOf'
import {CreateApplicationRequest} from './createApplicationRequest'
import {CreateExternalServicePricingPlanRequest} from './createExternalServicePricingPlanRequest'
import {CreateInternalSubscriptionRequest} from './createInternalSubscriptionRequest'
import {CreateManagedServicePricingPlanRequest} from './createManagedServicePricingPlanRequest'
import {CreateProductRequest} from './createProductRequest'
import {CreateSubscriptionRequest} from './createSubscriptionRequest'
import {GpuConfiguration} from './gpuConfiguration'
import {GpuConfigurationAllOf} from './gpuConfigurationAllOf'
import {MemoryConfiguration} from './memoryConfiguration'
import {MemoryConfigurationAllOf} from './memoryConfigurationAllOf'
import {MeteringRequest} from './meteringRequest'
import {MeteringResponse} from './meteringResponse'
import {MonthAmountDto} from './monthAmountDto'
import {PlatformManagedConfiguration} from './platformManagedConfiguration'
import {PricingPlanDto} from './pricingPlanDto'
import {ProductAmountDto} from './productAmountDto'
import {ProductDto} from './productDto'
import {ProductGroupDto} from './productGroupDto'
import {ProductUsageDto} from './productUsageDto'
import {ResourceConfiguration} from './resourceConfiguration'
import {RuntimeConfiguration} from './runtimeConfiguration'
import {ServiceDefinitionCommand} from './serviceDefinitionCommand'
import {ServiceDefinitionDto} from './serviceDefinitionDto'
import {ServiceDefinitionDtoConfigurationsInner} from './serviceDefinitionDtoConfigurationsInner'
import {ServiceDto} from './serviceDto'
import {ServiceExecutionConsumerDto} from './serviceExecutionConsumerDto'
import {ServiceExecutionDto} from './serviceExecutionDto'
import {ServiceOverviewDto} from './serviceOverviewDto'
import {SubscriptionDto} from './subscriptionDto'
import {TaxonomyElement} from './taxonomyElement'
import {UpdateVersionRequest} from './updateVersionRequest'
import {ValidationResult} from './validationResult'

export * from './accessTokenDto';
export * from './amountMajorDto';
export * from './apiDto';
export * from './apiOverviewDto';
export * from './applicationDto';
export * from './buildJobDto';
export * from './cpuConfiguration';
export * from './cpuConfigurationAllOf';
export * from './createApplicationRequest';
export * from './createExternalServicePricingPlanRequest';
export * from './createInternalSubscriptionRequest';
export * from './createManagedServicePricingPlanRequest';
export * from './createProductRequest';
export * from './createSubscriptionRequest';
export * from './gpuConfiguration';
export * from './gpuConfigurationAllOf';
export * from './memoryConfiguration';
export * from './memoryConfigurationAllOf';
export * from './meteringRequest';
export * from './meteringResponse';
export * from './monthAmountDto';
export * from './platformManagedConfiguration';
export * from './pricingPlanDto';
export * from './productAmountDto';
export * from './productDto';
export * from './productGroupDto';
export * from './productUsageDto';
export * from './resourceConfiguration';
export * from './runtimeConfiguration';
export * from './serviceDefinitionCommand';
export * from './serviceDefinitionDto';
export * from './serviceDefinitionDtoConfigurationsInner';
export * from './serviceDto';
export * from './serviceExecutionConsumerDto';
export * from './serviceExecutionDto';
export * from './serviceOverviewDto';
export * from './subscriptionDto';
export * from './taxonomyElement';
export * from './updateVersionRequest';
export * from './validationResult';

export interface RequestDetailedFile {
    value: Buffer;
    options?: {
        filename?: string;
        contentType?: string;
    }
}

export type RequestFile = string | Buffer | fs.ReadStream | RequestDetailedFile;

/* tslint:disable:no-unused-variable */
let primitives = [
                    "string",
                    "boolean",
                    "double",
                    "integer",
                    "long",
                    "float",
                    "number",
                    "any"
                 ];

let enumsMap: {[index: string]: any} = {
        "AccessTokenDto.ScopesEnum": AccessTokenDto.ScopesEnum,
        "ApiDto.QuantumBackendEnum": ApiDto.QuantumBackendEnum,
        "ApiDto.PricingCategoryEnum": ApiDto.PricingCategoryEnum,
        "ApiDto.LifecycleEnum": ApiDto.LifecycleEnum,
        "ApiDto.ServiceTypeEnum": ApiDto.ServiceTypeEnum,
        "ApiOverviewDto.TypeEnum": ApiOverviewDto.TypeEnum,
        "ApiOverviewDto.QuantumBackendEnum": ApiOverviewDto.QuantumBackendEnum,
        "ApiOverviewDto.LifecycleEnum": ApiOverviewDto.LifecycleEnum,
        "ApiOverviewDto.PricingCategoryEnum": ApiOverviewDto.PricingCategoryEnum,
        "ApplicationDto.CurrentUserPermissionEnum": ApplicationDto.CurrentUserPermissionEnum,
        "BuildJobDto.StatusEnum": BuildJobDto.StatusEnum,
        "BuildJobDto.StepEnum": BuildJobDto.StepEnum,
        "CreateExternalServicePricingPlanRequest.TypeEnum": CreateExternalServicePricingPlanRequest.TypeEnum,
        "CreateManagedServicePricingPlanRequest.TypeEnum": CreateManagedServicePricingPlanRequest.TypeEnum,
        "GpuConfiguration.AcceleratorEnum": GpuConfiguration.AcceleratorEnum,
        "GpuConfigurationAllOf.AcceleratorEnum": GpuConfigurationAllOf.AcceleratorEnum,
        "PricingPlanDto.TypeEnum": PricingPlanDto.TypeEnum,
        "ProductDto.TypeEnum": ProductDto.TypeEnum,
        "RuntimeConfiguration.RuntimeEnum": RuntimeConfiguration.RuntimeEnum,
        "ServiceDefinitionCommand.TypeEnum": ServiceDefinitionCommand.TypeEnum,
        "ServiceDefinitionDto.QuantumBackendEnum": ServiceDefinitionDto.QuantumBackendEnum,
        "ServiceDefinitionDto.TypeEnum": ServiceDefinitionDto.TypeEnum,
        "ServiceDefinitionDto.LifecycleEnum": ServiceDefinitionDto.LifecycleEnum,
        "ServiceDefinitionDtoConfigurationsInner.AcceleratorEnum": ServiceDefinitionDtoConfigurationsInner.AcceleratorEnum,
        "ServiceDto.CurrentUserPermissionEnum": ServiceDto.CurrentUserPermissionEnum,
        "ServiceExecutionConsumerDto.StatusEnum": ServiceExecutionConsumerDto.StatusEnum,
        "ServiceOverviewDto.CurrentUserPermissionEnum": ServiceOverviewDto.CurrentUserPermissionEnum,
        "ServiceOverviewDto.TypeEnum": ServiceOverviewDto.TypeEnum,
        "ServiceOverviewDto.QuantumBackendEnum": ServiceOverviewDto.QuantumBackendEnum,
        "ServiceOverviewDto.LifecycleEnum": ServiceOverviewDto.LifecycleEnum,
        "ValidationResult.StateEnum": ValidationResult.StateEnum,
}

let typeMap: {[index: string]: any} = {
    "AccessTokenDto": AccessTokenDto,
    "AmountMajorDto": AmountMajorDto,
    "ApiDto": ApiDto,
    "ApiOverviewDto": ApiOverviewDto,
    "ApplicationDto": ApplicationDto,
    "BuildJobDto": BuildJobDto,
    "CpuConfiguration": CpuConfiguration,
    "CpuConfigurationAllOf": CpuConfigurationAllOf,
    "CreateApplicationRequest": CreateApplicationRequest,
    "CreateExternalServicePricingPlanRequest": CreateExternalServicePricingPlanRequest,
    "CreateInternalSubscriptionRequest": CreateInternalSubscriptionRequest,
    "CreateManagedServicePricingPlanRequest": CreateManagedServicePricingPlanRequest,
    "CreateProductRequest": CreateProductRequest,
    "CreateSubscriptionRequest": CreateSubscriptionRequest,
    "GpuConfiguration": GpuConfiguration,
    "GpuConfigurationAllOf": GpuConfigurationAllOf,
    "MemoryConfiguration": MemoryConfiguration,
    "MemoryConfigurationAllOf": MemoryConfigurationAllOf,
    "MeteringRequest": MeteringRequest,
    "MeteringResponse": MeteringResponse,
    "MonthAmountDto": MonthAmountDto,
    "PlatformManagedConfiguration": PlatformManagedConfiguration,
    "PricingPlanDto": PricingPlanDto,
    "ProductAmountDto": ProductAmountDto,
    "ProductDto": ProductDto,
    "ProductGroupDto": ProductGroupDto,
    "ProductUsageDto": ProductUsageDto,
    "ResourceConfiguration": ResourceConfiguration,
    "RuntimeConfiguration": RuntimeConfiguration,
    "ServiceDefinitionCommand": ServiceDefinitionCommand,
    "ServiceDefinitionDto": ServiceDefinitionDto,
    "ServiceDefinitionDtoConfigurationsInner": ServiceDefinitionDtoConfigurationsInner,
    "ServiceDto": ServiceDto,
    "ServiceExecutionConsumerDto": ServiceExecutionConsumerDto,
    "ServiceExecutionDto": ServiceExecutionDto,
    "ServiceOverviewDto": ServiceOverviewDto,
    "SubscriptionDto": SubscriptionDto,
    "TaxonomyElement": TaxonomyElement,
    "UpdateVersionRequest": UpdateVersionRequest,
    "ValidationResult": ValidationResult,
}

export class ObjectSerializer {
    public static findCorrectType(data: any, expectedType: string) {
        if (data == undefined) {
            return expectedType;
        } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        } else if (expectedType === "Date") {
            return expectedType;
        } else {
            if (enumsMap[expectedType]) {
                return expectedType;
            }

            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }

            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            } else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if(typeMap[discriminatorType]){
                        return discriminatorType; // use the type given in the discriminator
                    } else {
                        return expectedType; // discriminator did not map to a type
                    }
                } else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }

    public static serialize(data: any, type: string) {
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index = 0; index < data.length; index++) {
                let datum = data[index];
                transformedData.push(ObjectSerializer.serialize(datum, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return data.toISOString();
        } else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }

            // Get the actual type of this object
            type = this.findCorrectType(data, type);

            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance: {[index: string]: any} = {};
            for (let index = 0; index < attributeTypes.length; index++) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }

    public static deserialize(data: any, type: string) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index = 0; index < data.length; index++) {
                let datum = data[index];
                transformedData.push(ObjectSerializer.deserialize(datum, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return new Date(data);
        } else {
            if (enumsMap[type]) {// is Enum
                return data;
            }

            if (!typeMap[type]) { // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index = 0; index < attributeTypes.length; index++) {
                let attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type);
            }
            return instance;
        }
    }
}

export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: localVarRequest.Options): Promise<void> | void;
}

export class HttpBasicAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        requestOptions.auth = {
            username: this.username, password: this.password
        }
    }
}

export class HttpBearerAuth implements Authentication {
    public accessToken: string | (() => string) = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            const accessToken = typeof this.accessToken === 'function'
                            ? this.accessToken()
                            : this.accessToken;
            requestOptions.headers["Authorization"] = "Bearer " + accessToken;
        }
    }
}

export class ApiKeyAuth implements Authentication {
    public apiKey: string = '';

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (this.location == "query") {
            (<any>requestOptions.qs)[this.paramName] = this.apiKey;
        } else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        } else if (this.location == 'cookie' && requestOptions && requestOptions.headers) {
            if (requestOptions.headers['Cookie']) {
                requestOptions.headers['Cookie'] += '; ' + this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
            else {
                requestOptions.headers['Cookie'] = this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
        }
    }
}

export class OAuth implements Authentication {
    public accessToken: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}

export class VoidAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(_: localVarRequest.Options): void {
        // Do nothing
    }
}

export type Interceptor = (requestOptions: localVarRequest.Options) => (Promise<void> | void);
