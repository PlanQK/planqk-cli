# Development

## Run your Commands

```shell
./bin/dev <command>
```

## Debug a Command

* Create a copy of the `Debug (Template)` run config in IntelliJ
* In the `Application parameters` text field, replace `<command>` with the command you want to debug
* Run your config in debug mode and add respective break points

> **Note:** Please do not change the `Debug (Template)` run config.

---

# Package the Tarballs

```shell
npx oclif@latest pack tarballs
```

---

# Update the OpenAPI Client

```shell
npm install -g @openapitools/openapi-generator-cli

cd src
openapi-generator-cli generate -g typescript-node -i https://platform.planqk.de/qc-catalog/docs -o client
```
