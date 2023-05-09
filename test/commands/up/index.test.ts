import {expect, test} from '@oclif/test'
import {BuildJobDto} from '../../../src/client/model/buildJobDto';

describe('up', () => {
  process.chdir('test/resources/dwave-service')

  test
  .nock('https://platform.planqk.de/qc-catalog', api => api.get('/v2/applications').reply(200, {}))
  .nock('https://platform.planqk.de/qc-catalog', api => api.post(uri => uri.includes('/v2/services')).reply(201, {}))
  .nock('https://platform.planqk.de/qc-catalog', api => api.get(uri => uri.includes('/build-status')).reply(200, {status: BuildJobDto.StatusEnum.Success}))
  .stdout()
  .command(['up'])
  .it('create managed service from planqk.json in current dir', ctx => {
    expect(ctx.stdout).to.contain('Creating service... pending: please check the PlanQK UI to determine the status')
  })
})
