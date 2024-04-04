import type { AdminOperations } from '@shopify/admin-api-client';

type GraphQLResponse<QueryType, AdminOperations> = {
    data: QueryType;
    operations: AdminOperations;
}

interface CreateCustomerResponseType {
}


export async function createAutomaticDiscount(admin: any, title: string): Promise<GraphQLResponse<CreateCustomerResponseType, AdminOperations >> {

    try {
        const response = await admin.graphql(
            `#graphql

            `
        );
        return response as GraphQLResponse<CreateCustomerResponseType, AdminOperations>; 

    } catch(err){
        console.error('Error creating automatic discount:', err);
        throw err; // Rethrow the error to handle it in the caller
    }
}