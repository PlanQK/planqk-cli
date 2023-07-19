/* tslint:disable */
/* eslint-disable */
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

import * as runtime from '../runtime'
import type {MeteringRequest, MeteringResponse} from '../models'
import {MeteringRequestToJSON, MeteringResponseFromJSON} from '../models'

export interface MeteringOperationRequest {
  meteringRequest: MeteringRequest;
}

/**
 *
 */
export class ServicePlatformMeteringAPIApi extends runtime.BaseAPI {

  /**
   *  This endpoint is used to report the usage of your external service. The request body must contain a correlationId, which is forwarded by the PlanQK API Gateway upon service execution. The PlanQK Platform then logs a usage event for the corresponding product item (productId) and the submitted count. The correlationId is needed to correlate your reported usage to the corresponding user of your service. You can obtain the correlation id from the x-correlation-id header of the request that was forwarded by our API Gateway to your service. The productId is the id of the product you want to report. You can find the id of your product in the pricing plan table on the service details page. The count is the quantity of units you want to report.
   */
  async meteringRaw(requestParameters: MeteringOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MeteringResponse>> {
    if (requestParameters.meteringRequest === null || requestParameters.meteringRequest === undefined) {
      throw new runtime.RequiredError('meteringRequest', 'Required parameter requestParameters.meteringRequest was null or undefined when calling metering.')
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    if (this.configuration && this.configuration.apiKey) {
      headerParameters['X-Auth-Token'] = this.configuration.apiKey('X-Auth-Token') // apiKey authentication
    }

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters['Authorization'] = await this.configuration.accessToken('oauth2', [])
    }

    const response = await this.request({
      path: `/external-services/metering`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: MeteringRequestToJSON(requestParameters.meteringRequest),
    }, initOverrides)

    return new runtime.JSONApiResponse(response, (jsonValue) => MeteringResponseFromJSON(jsonValue))
  }

  /**
   *  This endpoint is used to report the usage of your external service. The request body must contain a correlationId, which is forwarded by the PlanQK API Gateway upon service execution. The PlanQK Platform then logs a usage event for the corresponding product item (productId) and the submitted count. The correlationId is needed to correlate your reported usage to the corresponding user of your service. You can obtain the correlation id from the x-correlation-id header of the request that was forwarded by our API Gateway to your service. The productId is the id of the product you want to report. You can find the id of your product in the pricing plan table on the service details page. The count is the quantity of units you want to report.
   */
  async metering(requestParameters: MeteringOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MeteringResponse> {
    const response = await this.meteringRaw(requestParameters, initOverrides)
    return await response.value()
  }

}