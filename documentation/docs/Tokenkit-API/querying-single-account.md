---
sidebar_position: 4
title: "Querying a Single Account/Contract Address"
---
## Getting single account/contract

To query a single account/contract, we direct the request to:

Sepolia

```txt
https://sepolia.api.token-kit.io/api/accounts?search=ADDRESS
```

Mainnet

```txt
https://mainnet.api.token-kit.io/api/accounts?search=ADDRESS
```

In this case, we are making a search, and if the count is atleast 1 then we read the first account from the results property.

### Making a Sample Request with Axios

Once you have your API key, you can make requests to the Tokens API. Here’s a quick example of how to query the accounts endpoint using Axios:

```javascript
import axios from 'axios';

// Set your API key
const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Ensure this is set in your environment variables

// Function to fetch account data
const fetchAccountData = async (accountAddress) => {
    try {
        const response = await axios.get('https://sepolia.api.token-kit.io/api/accounts', {
            headers: {
                'api-key': apiKey,
            },
            params: {
                search: accountAddress, // Specify the account address as a query parameter
            },
        });

        console.log('Account Data:', response.data);
    } catch (error) {
        console.error('Error fetching account data:', error);
    }
};

// Example usage
fetchAccountData('YOUR_ACCOUNT_ADDRESS_HERE'); // Replace with actual account address
```