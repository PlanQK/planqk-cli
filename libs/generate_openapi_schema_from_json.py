import json
from typing import Union

with open('data.json', 'r') as f:
    data = json.load(f)

def get_literal_type(data) -> Union[None, str]:
    if type(data) == type(None):
        return "null"
    elif type(data) == bool:
        return "boolean"
    elif type(data) == int:
        return "integer"
    elif type(data) == float:
        return "number"
    elif type(data) == str:
        return "string"
    else:
        return None

def json_to_openapi_schema(data):
    schema = {}

    if not isinstance(data, (dict, list)):
        literal_type = get_literal_type(data)
        if literal_type:
            schema["type"] = literal_type
        schema["example"] = data
        return schema
    
    if isinstance(data, list):
        if data:
            # schema["type"] = "array"
            if isinstance(data[0], dict):
                schema["items"] = {
                    "type": "object",
                    "properties": json_to_openapi_schema(data[0]),
                    "example": data[0]
                }
            else:
                schema["items"] = json_to_openapi_schema(data[0])
                schema["example"] = data
        else:
            schema["type"] = "array"
            schema["example"] = []
        return schema
    

    for key, value in data.items():
        if isinstance(value, dict):
            schema[key] = {
                "type": "object",
                "properties": json_to_openapi_schema(value),
                "example": value
            }
        elif isinstance(value, list):
            if value:
                if isinstance(value[0], dict):
                    schema[key] = {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": json_to_openapi_schema(value[0])
                        }
                    }
                else:
                    schema[key] = {
                        "type": "array",
                        "items": json_to_openapi_schema(value[0])
                    }
                schema[key]["example"] = value
            else:
                schema[key] = {"type": "array",
                               "example": []}

        elif isinstance(value, str):
            schema[key] = {"type": "string"}
            schema[key]["example"] = value
        elif isinstance(value, bool):
            schema[key] = {"type": "boolean"}
            schema[key]["example"] = value
        elif isinstance(value, (int, float)):
            schema[key] = {"type": "number"}
            schema[key]["example"] = value
        elif value is None:
            schema[key] = {"type": "null"}            
    return schema

if __name__ == "__main__":
    print(json.dumps(json_to_openapi_schema(data), indent=2))