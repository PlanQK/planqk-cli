# Development

## Run your Commands

```shell
./bin/dev <command>
```

## Enable Debug Output

Set the environment variable `DEBUG=*` to print all the debug output to the screen.
Depending on your shell you may need to escape this with `DEBUG=\*`.
On Windows you can’t set environment variables in line, so you’ll need to run set `DEBUG=*` before running the command.

```shell
DEBUG=* ./bin/dev <command>
```

## Package the Tarballs

```shell
npx oclif@latest pack tarballs
```

## Update the OpenAPI Client

```shell
npm install -g @openapitools/openapi-generator-cli

cd src
openapi-generator-cli generate -g typescript-fetch -i https://platform.planqk.de/qc-catalog/docs -o client
# or
openapi-generator-cli generate -g typescript-fetch -i http://34.90.225.20.nip.io/qc-catalog/docs -o client
```

## Generate command overview

```bash
cd planqk-cli
npm run build
cd docs
npx oclif readme
```

### Usage

<!-- usage -->

```sh-session
$ npm install -g @anaqor/planqk
$ planqk COMMAND
running command...
$ planqk (--version)
@anaqor/planqk/1.8.0 darwin-arm64 node-v18.15.0
$ planqk --help [COMMAND]
USAGE
  $ planqk COMMAND
...
```

<!-- usagestop -->

### Commands

<!-- commands -->

* [`planqk autocomplete [SHELL]`](#planqk-autocomplete-shell)
* [`planqk get-context`](#planqk-get-context)
* [`planqk init`](#planqk-init)
* [`planqk list-contexts`](#planqk-list-contexts)
* [`planqk login`](#planqk-login)
* [`planqk logout`](#planqk-logout)
* [`planqk run [SERVICEID]`](#planqk-run-serviceid)
* [`planqk services`](#planqk-services)
* [`planqk set-context [CONTEXTID]`](#planqk-set-context-contextid)
* [`planqk up`](#planqk-up)

## `planqk autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ planqk autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  display autocomplete installation instructions

EXAMPLES
  $ planqk autocomplete

  $ planqk autocomplete bash

  $ planqk autocomplete zsh

  $ planqk autocomplete --refresh-cache
```

_See
code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v2.1.9/src/commands/autocomplete/index.ts)_

## `planqk get-context`

Get the current context, i.e., the personal or organization account you are currently working with.

```
USAGE
  $ planqk get-context

DESCRIPTION
  Get the current context, i.e., the personal or organization account you are currently working with.

EXAMPLES
  $ planqk get-context
```

_See code: [dist/commands/get-context/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_

## `planqk init`

Initialize a PlanQK project.

```
USAGE
  $ planqk init

DESCRIPTION
  Initialize a PlanQK project.

EXAMPLES
  $ planqk init
```

_See code: [dist/commands/init/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_

## `planqk list-contexts`

Retrieves the available contexts, i.e., the personal or organizational accounts available to you to work with.

```
USAGE
  $ planqk list-contexts

DESCRIPTION
  Retrieves the available contexts, i.e., the personal or organizational accounts available to you to work with.

EXAMPLES
  $ planqk list-contexts
```

_See code: [dist/commands/list-contexts/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_

## `planqk login`

Login with your PlanQK Platform credentials

```
USAGE
  $ planqk login [-t <value>]

FLAGS
  -t, --token=<value>  Your personal access token

DESCRIPTION
  Login with your PlanQK Platform credentials

EXAMPLES
  $ planqk login -t <personal access token>
```

_See code: [dist/commands/login/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_

## `planqk logout`

Logout of the PlanQK Platform

```
USAGE
  $ planqk logout

DESCRIPTION
  Logout of the PlanQK Platform

EXAMPLES
  $ planqk logout
```

_See code: [dist/commands/logout/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_

## `planqk run [SERVICEID]`

Creates a job execution of a PlanQK Service

```
USAGE
  $ planqk run [SERVICEID] [-d <value>] [-p <value>] [--data-file <value>] [--params-file <value>]
    [--detached]

FLAGS
  -d, --data=<value>     Input data as JSON string.
  -p, --params=<value>   Parameters as JSON string.
  --data-file=<value>    Relative path to file containing input data.
  --detached             Executes the job in detached mode, i.e., without waiting for it to finish.
  --params-file=<value>  Relative path to file containing params.

DESCRIPTION
  Creates a job execution of a PlanQK Service

EXAMPLES
  $ planqk run

  $ planqk run --detached

  $ planqk run -d '{"values": [10,12]}' -p '{"round_up": true}'

  $ planqk run --data-file=./input/data.json --params-file=./input/params.json
```

_See code: [dist/commands/run/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_

## `planqk services`

List all available services of the current selected context.

```
USAGE
  $ planqk services

DESCRIPTION
  List all available services of the current selected context.

EXAMPLES
  $ planqk services
```

_See code: [dist/commands/services/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_

## `planqk set-context [CONTEXTID]`

Set the current context, i.e., the personal or organization account you are currently working with.

```
USAGE
  $ planqk set-context [CONTEXTID]

DESCRIPTION
  Set the current context, i.e., the personal or organization account you are currently working with.

EXAMPLES
  $ planqk set-context

  $ planqk set-context <context-id>
```

_See code: [dist/commands/set-context/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_

## `planqk up`

Creates or updates a PlanQK Service

```
USAGE
  $ planqk up [--silent]

FLAGS
  --silent  Suppresses all outputs, helpful when executed in a CI/CD pipeline.

DESCRIPTION
  Creates or updates a PlanQK Service

EXAMPLES
  $ planqk up
```

_See code: [dist/commands/up/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_

<!-- commandsstop -->
