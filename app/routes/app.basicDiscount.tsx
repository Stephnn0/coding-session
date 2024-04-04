import { ActionFunctionArgs, json } from "@remix-run/node";
import { useActionData, useRouteError, useSubmit } from "@remix-run/react";
import { Button, Form, Layout, Page } from "@shopify/polaris";
import React from "react";
import { authenticate } from "~/shopify.server";
import { ErrorBoundary } from "./app";

type Props = {};

export async function action(args: ActionFunctionArgs) {
  const { admin } = await authenticate.admin(args.request);

  console.log("hit");

  try {
    const response = await admin.graphql(
      `#graphql
        mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
      discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
        codeDiscountNode {
          id
          codeDiscount {

              ... on DiscountCodeFreeShipping {
                title
                summary
  
              }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `,
      {
        variables: {
          shippingFreeCodeDiscount: {},
        },
      },
    );

    if (response) {
      console.log("hit");
      const data = await response.json();
      console.log(data);

      return json({
        data: data.data,
      });
    }
  } catch (err) {
    console.log(err, "response");

    const errorObj = err as {
      graphQLErrors: unknown[];
      message: string;
      networkStatusCode: number;
    };
    const { graphQLErrors, message, networkStatusCode } = errorObj;

    console.log(graphQLErrors, "graphQLErrors");
    console.log(message, "message");
    console.log(networkStatusCode, "message");

    // throw new Error("Oh no! Something went wrong!", err as any);
  }

  return null;
}

const BasicDiscount = (props: Props) => {
  const submit = useSubmit();
  const generateShiipingCode = () =>
    submit({}, { replace: true, method: "POST" });

  const error = useRouteError();

  console.log(error, "error");

  const actionData = useActionData<typeof action>();
  console.log(actionData, "actionData");

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Form method="post" onSubmit={generateShiipingCode}>
            <Button submit>Submit</Button>
          </Form>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default BasicDiscount;
