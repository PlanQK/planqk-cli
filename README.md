planqk-cli
==========

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g planqk
$ planqk COMMAND
running command...
$ planqk (--version)
planqk/1.1.0 darwin-arm64 node-v18.15.0
$ planqk --help [COMMAND]
USAGE
  $ planqk COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`planqk autocomplete [SHELL]`](#planqk-autocomplete-shell)
* [`planqk login`](#planqk-login)
* [`planqk logout`](#planqk-logout)
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

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v2.1.9/src/commands/autocomplete/index.ts)_

## `planqk login`

Login with your PlanQK Platform credentials

```
USAGE
  $ planqk login [--help] [-t <value>]

FLAGS
  -t, --token=<value>  Your personal access token
  --help               Show CLI help.

DESCRIPTION
  Login with your PlanQK Platform credentials

EXAMPLES
  $ planqk login -t <personal access token>
```

_See code: [dist/commands/login/index.ts](https://gitlab.com/StoneOne/planqk/planqk-cli/blob/v1.1.0/dist/commands/login/index.ts)_

## `planqk logout`

Logout of the PlanQK Platform

```
USAGE
  $ planqk logout [--help]

FLAGS
  --help  Show CLI help.

DESCRIPTION
  Logout of the PlanQK Platform

EXAMPLES
  $ planqk logout
```

_See code: [dist/commands/logout/index.ts](https://gitlab.com/StoneOne/planqk/planqk-cli/blob/v1.1.0/dist/commands/logout/index.ts)_

## `planqk up`

Creates and updates a PlanQK Service

```
USAGE
  $ planqk up [--help] [-n <value>] [-d <value>] [-q NONE|IBM|DWAVE] [--file <value>] [--api-spec
    <value>]

FLAGS
  -d, --description=<value>       The description of your PlanQK Service
  -n, --name=<value>              The name of your PlanQK Service
  -q, --quantum-backend=<option>  The quantum backend used by your PlanQK Service
                                  <options: NONE|IBM|DWAVE>
  --api-spec=<value>              The OpenAPI definition file describing your service API
  --file=<value>                  The ZIP archive containing your service source that follows the PlanQK user code
                                  template
  --help                          Show CLI help.

DESCRIPTION
  Creates and updates a PlanQK Service

EXAMPLES
  $ planqk up
```

_See code: [dist/commands/up/index.ts](https://gitlab.com/StoneOne/planqk/planqk-cli/blob/v1.0.0/dist/commands/up/index.ts)_
<!-- commandsstop -->
