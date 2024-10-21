---
sidebar_position: 2.1
title: "Authorization"
---

## Authorization with the Tokens API

To access the Tokenkit API, authorization is done exclusively through the `api-key` header. This ensures secure communication between your application and the API.

### Obtaining Your API Key

To get started, you need to obtain your API key from the TokenKit platform. Follow these steps:

1. **Sign Up or Log In**: Visit the TokenKit website and create an account or log in if you already have one.
2. **Generate Your API Key**: Navigate to the API settings section of your account to generate a new API key.

### Key Points

- **Authorization Header**: The `api-key` is included in the request headers for authorization.
- **Environment Variables**: Store your API key securely in environment variables to prevent exposure in your codebase.
- **Network Selection**: Ensure you use the correct API key corresponding to your selected network (e.g., Sepolia or Mainnet).

By following these steps, you'll be able to securely access tokens data from the Tokenkit API and integrate it into your applications seamlessly!
