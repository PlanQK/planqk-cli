# PROJECT MOVED TO GITLAB

**NOTICE:** This project is no longer maintained on GitHub. It has been moved to GitLab for continued updates and development. You can find the latest version of this project at [https://gitlab.com/planqk-foss/planqk-cli](https://gitlab.com/planqk-foss/planqk-cli).

---

# planqk-cli

[![npm](https://img.shields.io/npm/v/%40anaqor%2Fplanqk)](https://www.npmjs.com/package/@anaqor/planqk)
[![npm](https://img.shields.io/npm/dm/%40anaqor%2Fplanqk)](https://www.npmjs.com/package/@anaqor/planqk)

The PlanQK Command Line Interface (CLI) lets you interact with the PlanQK Platform directly from your terminal.
We have installation instructions to guide you through the initial setup in our
[quickstart](https://docs.platform.planqk.de/quickstart.html) guide.

Detailed information about the supported commands can be found in our
[CLI reference](https://docs.platform.planqk.de/cli-reference.html).

## Installation

To install the PlanQK CLI, you must install Node.js and the npm command line interface using either a
[Node version manager](https://github.com/nvm-sh/nvm) or a [Node installer](https://nodejs.org/en/download).

**Make sure you install Node.js version 18 or higher.**

Then install the PlanQK CLI globally using npm:

```bash
npm install -g @anaqor/planqk
```

You can use the `--help` flag to get information about the supported commands:

``` bash
planqk --help
```

You may also get information about a specific command:

``` bash
planqk <command> --help
```

> **Troubleshooting:**
> If you experience EACCES permissions errors during installation, we recommend using [Node version manager](https://github.com/nvm-sh/nvm) (nvm).
> Further, you may refer to the official [npm documentation](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) how to resolve such issues.

## License

Apache-2.0 | Copyright 2023-2024 Anaqor AG
