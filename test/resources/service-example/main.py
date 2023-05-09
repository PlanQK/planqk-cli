import json


def read_json_file(filepath, default_value=None):
    try:
        with open(filepath) as f:
            return json.load(f)
    except:
        return default_value


# Read the input files
input_data = read_json_file('/var/input/data.json') or read_json_file('./input/data.json')
input_params = read_json_file('/var/input/params.json') or read_json_file('./input/params.json', {'round_up': False})

if not input_data:
    print('Error: data.json file not found')
    exit(1)

# Sum the values in the "values" property
sum_ = sum(input_data.get('values', []))

# Round up the sum if "round_up" is true
result = {'sum': round(sum_ if not input_params.get('round_up') else sum_, 0)}

# Return the result as a JSON object
print("PlanQK:Job:Result:", json.dumps(result))
