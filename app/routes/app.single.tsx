import { ActionFunction } from "@remix-run/node";
import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { Button, Layout, Page } from "@shopify/polaris";
import { MONTHLY_PLAN, authenticate } from "~/shopify.server";

export const action: ActionFunction = async ({ request }) => {
  console.log("hitt");
  const { billing } = await authenticate.admin(request);

  const billingCheck = await billing.require({
    plans: [MONTHLY_PLAN],
    isTest: true,
    onFailure: async () =>
      billing.request({
        plan: MONTHLY_PLAN,
        isTest: true,
      }),
  });

  const subscription = billingCheck.appSubscriptions[0];

  const canceledsusbscription = await billing.cancel({
    subscriptionId: subscription.id,
    isTest: true,
    prorate: true,
  });

  console.log("canceledsusbscription", canceledsusbscription);

  if (canceledsusbscription) {
    console.log("----- cancel susbscription message--------");
    return canceledsusbscription;
  }

  return null;
};

const Single = () => {
  const fecther = useFetcher();

  const fun = () => {
    fecther.load("/app/checksubscription");
    fecther.data;
    console.log(fecther.data, "data fetcher");
    console.log(fecther, "fetcher");
  };

  const susbcribe = () => {
    fecther.load("/app/subscription");
  };

  const cancel = () => {
    fecther.load("/app/cancelsubscription");
  };

  const data: any = useLoaderData();
  console.log(data);

  const submit = useSubmit();
  const actionData = useActionData<typeof action>();
  console.log(actionData, "actionData");
  const startSub = () => submit({}, { replace: true, method: "POST" });

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Button onClick={fun}>check subscription</Button>
          <Button onClick={susbcribe}>susbcribe</Button>
          <Form onSubmit={startSub} method="post" action="/app/single">
            <Button onClick={cancel}>cancel</Button>
          </Form>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Single;
