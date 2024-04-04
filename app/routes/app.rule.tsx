import { Form, useSubmit } from "@remix-run/react";
import { Button, Card, Layout, Page, Text } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { ButtonHalf } from "~/polaris/ButtonHalf";
import { authenticate } from "~/shopify.server";
import { createAutomaticDiscount } from "~/graphql/createAutomaticDiscount";
import { TextField } from "@shopify/polaris";

//---------------------------------------BACKEND------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------

export async function action(args: ActionFunctionArgs) {
  const formData = await args.request.clone().formData();
  const _action = formData.get("_action");
  if (_action === "AUTOMATIC_DISCOUNT") {
    await automaticDiscountAction(args, formData);
  }
  if (_action === "MANUAL_DISCOUNT") {
    return manualDiscountAction(args);
  }
  return json({ ok: true });
}

async function automaticDiscountAction(
  args: ActionFunctionArgs,
  formData: FormData,
) {
  console.log("🧡 atomaticDiscountAction", formData);
  const { admin } = await authenticate.admin(args.request);

  const startsAt = "2022-06-21T00:00:00Z";
  const endsAt = "2024-09-21T00:00:00Z";
  const minimumRequirementSubtotal = 2;
  const discountAmount = 100;
  const dynamicTitle = "messi";

  try {
    const res = await createAutomaticDiscount(
      admin,
      dynamicTitle,
      startsAt,
      endsAt,
      minimumRequirementSubtotal,
      discountAmount,
    );
    if (res) {
      const responseJson = await args.request.json();
      console.log("created discount");

      return json({
        discount: responseJson.data,
      });
    }
  } catch (err) {
    console.log(err, "error discount");
  }
  json({ ok: true });
}
async function manualDiscountAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get("id");
  console.log("🔁 manualDiscountAction", id);
  return null;
}

//---------------------------------------FRONTEND-----------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------

const Rule = () => {
  const navigate = useNavigate();
  const [isFirstButtonActive, setIsFirstButtonActive] = useState(true);
  console.log(isFirstButtonActive, "isFirstButtonActive");

  const navigateBack = (to: any) => {
    navigate(-1);
  };

  const [value, setValue] = useState("");

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  const submit = useSubmit();
  const triggerAction = () => submit({}, { replace: true, method: "POST" });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const actionValue = isFirstButtonActive
      ? "AUTOMATIC_DISCOUNT"
      : "MANUAL_DISCOUNT";
    formData.set("_action", actionValue);

    try {
      const response = submit(formData, { replace: true, method: "POST" });
      // Handle response if needed
      console.log("Form submitted successfully:", response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Page>
      <ui-title-bar title="Free Shipping Rule">
        <button variant="primary" onClick={navigateBack}>
          Back
        </button>
      </ui-title-bar>
      <Layout>
        <Form onSubmit={handleSubmit} method="post">
          <Layout.Section>
            <Card>
              <Text variant="headingMd" as="h6">
                Method
              </Text>
              <ButtonHalf
                isFirstButtonActive={isFirstButtonActive}
                setIsFirstButtonActive={setIsFirstButtonActive}
              />
              <br />
              <TextField
                label="Shipping discount code                "
                value={value}
                onChange={handleChange}
                autoComplete="off"
              />
            </Card>
          </Layout.Section>

          <Layout.Section>
            {isFirstButtonActive ? (
              <button type="submit" name="_action" value="AUTOMATIC_DISCOUNT">
                Like
              </button>
            ) : (
              <button type="submit" name="_action" value="MANUAL_DISCOUNT">
                Retweet
              </button>
            )}
          </Layout.Section>
        </Form>
      </Layout>
    </Page>
  );
};

export default Rule;
