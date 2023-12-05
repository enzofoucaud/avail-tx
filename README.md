# avail-tx

## Description

This is a simple tool to make it easier to do transactions on the [Avail](https://www.availproject.org/) platform.

## Installation

Install node.js and npm. Then run:

```bash
npm install
```

## Usage

Create a file called `address.txt` with the address of the account you want to be the recipient of the transaction.
Example:

```txt
5XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
5XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
5XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Create a file called `seeds.txt` with the seed phrases of the accounts you want to use to send the transaction.
Example:

```txt
seed phrase 1
seed phrase 2
seed phrase 3
```

Then run:

```bash
npm start
```
