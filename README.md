# ts-json-schema-gen

Generate Typescript interfaces and functions to parse and unmarshal JSON according to some JSON schema because no one wants to do this by hand.

## Getting Started

TODO

## Usage

See `json-schema-gen.spec.ts` for an example.

## Known limitations

- JSON schema objects must have a title.
- JSON schema objects must not have the same title.
- JSON schema must be in one file (no reference support).
