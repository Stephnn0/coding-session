import type { AdminOperations } from '@shopify/admin-api-client';

type GraphQLResponse<QueryType, AdminOperations> = {
    data: QueryType;
    operations: AdminOperations;
}

interface CreateCustomerResponseType {
}


export async function createAutomaticDiscount(admin: any, email: string): Promise<GraphQLResponse<CreateCustomerResponseType, AdminOperations >> {

    try {
        const response = await admin.graphql(
            `#graphql
            mutation customerCreate($input: CustomerInput!) {
              customerCreate(input: $input) {
                userErrors {
                  field
                  message
                }
                customer {
                  id
                  email
                  phone
                  firstName
                  lastName
                  smsMarketingConsent {
                    marketingState
                    marketingOptInLevel
                  }
                  addresses {
                    address1
                    city
                    country
                    phone
                    zip
                  }
                }
              }
            }`,
            {
                variables: {
                  "input": {
                    "email": email,
                    "phone": "+17066765434",
                    "firstName": name,
                    "lastName": "tapia",
                    "acceptsMarketing": true,
                    "addresses": [
                      {
                        "address1": "905 BRICKELL BAY DR",
                        "city": "Miami",
                        "province": "FL",
                        "phone": "1234911030",
                        "zip": "33131",
                        "lastName": "paul",
                        "firstName": "richard",
                        "country": "USA"
                      }
                    ]
                  }
                },
              },            
        );
        return response as GraphQLResponse<CreateCustomerResponseType, AdminOperations>; 

    } catch(err){
        console.error('Error creating automatic discount:', err);
        throw err; // Rethrow the error to handle it in the caller
    }
}

