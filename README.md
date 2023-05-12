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
@anaqor/planqk/1.4.2 linux-x64 node-v16.16.0
$ planqk --help [COMMAND]
USAGE
  $ planqk COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`planqk autocomplete [SHELL]`](#planqk-autocomplete-shell)

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
<!-- commandsstop -->
