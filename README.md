planqk-cli
==========

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @anaqor/planqk
$ planqk COMMAND
running command...
$ planqk (--version)
@anaqor/planqk/1.3.0 darwin-arm64 node-v18.15.0
$ planqk --help [COMMAND]
USAGE
  $ planqk COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`planqk autocomplete [SHELL]`](#planqk-autocomplete-shell)
* [`planqk init`](#planqk-init)
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

_See code: [dist/commands/init/index.ts](https://github.com/PlanQK/planqk-cli/blob/v1.3.0/dist/commands/init/index.ts)_

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

_See code: [dist/commands/login/index.ts](https://github.com/PlanQK/planqk-cli/blob/v1.3.0/dist/commands/login/index.ts)_

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

_See code: [dist/commands/logout/index.ts](https://github.com/PlanQK/planqk-cli/blob/v1.3.0/dist/commands/logout/index.ts)_

## `planqk up`

Creates and updates a PlanQK Service

```
USAGE
  $ planqk up

DESCRIPTION
  Creates and updates a PlanQK Service

EXAMPLES
  $ planqk up
```

_See code: [dist/commands/up/index.ts](https://github.com/PlanQK/planqk-cli/blob/v1.3.0/dist/commands/up/index.ts)_
<!-- commandsstop -->
