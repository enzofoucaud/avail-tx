# avail-tx

## Description

This is a simple tool to make it easier to do transactions on the [Avail](https://www.availproject.org/) platform.

## Installation

Install node.js and npm. Then run:

```bash
npm install
```

## Usage

Copy the `config.example.json` file to `config.json` and fill in the values.

```bash
cp config.example.json config.json
```

- token - The token get from Discord cookie (string)
- seeds - The seeds to use for the transactions (list of strings)

Then run:

```bash
npm start
```
