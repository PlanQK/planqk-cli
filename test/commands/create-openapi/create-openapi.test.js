const { expect, test } = require('@oclif/test')
const util = require('util');
const exec = util.promisify(require('child_process').exec);

describe('tests for create-openapi', () => {
  let stdout, stderr;

  // ensure that tmp-dir is available as root for test-case-execution
  ({ stdout, stderr } = exec('mkdir -p test/commands/create-openapi/tmp'));

  // TC1:
  // the good one: input files are given, output should be generated

  // clean tc1
  ({ stdout, stderr } = exec('rm -r test/commands/create-openapi/tmp/tc1'));

  // prepare tc1
  ({ stdout, stderr } = exec('cp -r test/commands/create-openapi/tc1 test/commands/create-openapi/tmp'));

  // execute tc1
  test
    // .stdout()
    .stderr()
    .command(['create-openapi','--wd=test/commands/create-openapi/tmp/tc1'])
    .it('should regenerate open-api spec', async ctx => {
      expect(ctx.stderr).to.contain('finished');
      let stdout, stderr;
      // check that there is a copy from origin openapi-spec.yml
      ({ stdout, stderr } = await exec('ls'));
      // console.log('stdout_ls:', stdout);
      // console.log('stderr_ls:', stderr);
      expect(stdout).to.contain('openapi-spec-saved.yml');
      // check that updated openapi-spec.yml has correct content
      ({stdout, stderr} = await exec('sum test/commands/create-openapi/tmp/tc1/openapi-spec.yml'));
      // console.log('stdout_sum:', stdout);
      // console.log('stderr_sum:', stderr);
      expect(stdout).to.contain('58541');
    });

  // TC2:
  // the bad one: should throw exception due to missing input file

  // clean tc2
  ({ stdout, stderr } = exec('rm -r test/commands/create-openapi/tmp/tc2'));

  // prepare tc2
  ({ stdout, stderr } = exec('cp -r test/commands/create-openapi/tc2 test/commands/create-openapi/tmp'));

  // execute tc2
  test
    .command(['create-openapi','--wd=test/commands/create-openapi/tmp/tc2'])
    .catch(ctx => {
      expect(ctx.message).to.contain('No openapi-spec.yml file found');
    })
    .it('should end with error due to missing openapi-spec.yml');

})
