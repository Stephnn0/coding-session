import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { Button, Layout, Page } from "@shopify/polaris";
import { authenticate } from "~/shopify.server";

export async function action(args: ActionFunctionArgs) {
  console.log("------hit-------");
  const { admin } = await authenticate.admin(args.request);

  try {
    const shippingObject = await admin.graphql(
      `#graphql
          mutation CreateMetaobjectDefinition($definition: MetaobjectDefinitionCreateInput!) {
          metaobjectDefinitionCreate(definition: $definition) {
              metaobjectDefinition {
              name
              type
              fieldDefinitions {
                  name
                  key
              }
              }
              userErrors {
              field
              message
              code
              }
          }
          }`,
      {
        variables: {
          definition: {
            name: "BetterFreeShipping5",
            type: "advancebetterfreeshipping1",
            // access: {
            //   admin: "MERCHANT_READ",
            //   storefront: "NONE",
            // },
            fieldDefinitions: [
              {
                name: "code A",
                key: "codeA",
                type: "json",
              },
              {
                name: "code B",
                key: "codeB",
                type: "single_line_text_field",
              },
            ],
          },
        },
      },
    );

    if (shippingObject.ok) {
      console.log(shippingObject);
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
  }
  return null;
}

// export async function loader(args: LoaderFunctionArgs) {}

const Webhook = () => {
  const submit = useSubmit();
  const generateWebhook = () => submit({}, { replace: true, method: "POST" });
  const actionData = useActionData<typeof action>();
  console.log(actionData, "actionData");

  //loading states
  const navigate = useNavigation();

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Form onSubmit={generateWebhook} method="POST">
            <Button submit>trigger webhook</Button>
          </Form>
        </Layout.Section>
        <Layout.Section></Layout.Section>
      </Layout>
    </Page>
  );
};

export default Webhook;
