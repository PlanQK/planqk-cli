# PlanQK Custom Docker Container Coding Template for Python

This is a simple Python application that takes a JSON file as input, sums up the values in the `values` property, and returns the result as a JSON object.
It also provides an optional flag to round up the sum.

Please note that the Node.js application implements the PlanQK Platform interface for custom Docker containers.
The platform runtime uses the input provided via the Service API in the form of `{ "data": <data>, "params": <params> }`.
The runtime then mounts the input data to `/var/input/data.json` and the parameters to `/var/input/params.json` of the container.
Both files must contain valid JSON strings.
Additionally, the platform requires that any output produced by the service to be in a specific format.
Specifically, the output must be printed to the standard output (stdout) and prefixed with `PlanQK:Job:Result:`.
Only the last stdout output using this marker will be used as the final output of the service.
The output itself must also be a valid JSON string.

> More information about the PlanQK Platform interface for custom Docker containers can be found in the [PlanQK documentation](https://docs.platform.planqk.de/docs/service-platform/managed-services-custom-container.html).

## Usage

### Python

To run the application using Python, make sure you have Python 3.x installed on your system, navigate to the root directory of the project, and run the following command:

```bash
python main.py
```

The application reads the input data from the file `/var/input/data.json` by default.
If the file is not found, it falls back to the `./input/data.json` file.
The application also reads parameters from the file `/var/input/params.json` by default.
If the file is not found, it falls back to the `./input/params.json` file, otherwise it assumes that `round_up` is `false`.

### Docker

To run the application using Docker, make sure you have Docker installed on your system, navigate to the root directory of the project, and run the following commands:

```bash
docker build -t planqk-python-app .

PROJECT_ROOT=(`pwd`)
docker run -v $PROJECT_ROOT/input:/var/input planqk-python-app
```

This assumes that you have the input data file `data.json` and the optional parameters file `params.json` in `./input`.
The -v option is used to mount this directory as volumes in the Docker container.
The Docker container runs the application and returns the result as output.
