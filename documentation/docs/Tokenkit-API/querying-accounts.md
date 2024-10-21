---
sidebar_position: 3
title: "Querying All Accounts"
---

## Getting accounts/contracts

To query all accounts/contracts, we direct the request to:

Sepolia

```txt
https://sepolia.api.token-kit.io/api/accounts
```

Mainnet

```txt
https://mainnet.api.token-kit.io/api/accounts
```

### Making a Sample Request with Axios

Once you have your API key, you can make requests to the Tokens API. Here’s a quick example of how to query the accounts endpoint using Axios:

```javascript
import axios from 'axios';

// Set your API key
const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Ensure this is set in your environment variables

// Function to fetch accounts/contracts data
const fetchAccountsData = async () => {
    try {
        const response = await axios.get('https://sepolia.api.token-kit.io/api/accounts', {
            headers: {
                'api-key': apiKey,
            }
        });

        console.log('Account Data:', response.data);
    } catch (error) {
        console.error('Error fetching account data:', error);
    }
};

// Example usage
fetchAccountsData();
```