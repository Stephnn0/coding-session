import { Button, Card, Layout, Page } from "@shopify/polaris";
import { Link } from "@remix-run/react";

const Home = () => {
  return (
    <Page>
      <ui-title-bar title="Custom Free Shipping">
        <button variant="primary">Add Rule</button>
      </ui-title-bar>
      <Layout>
        <Layout.Section>
          <Card>
            <h1>Add your first shipping discount</h1>
            <p>
              Create custom shipping discounts with an advanced set of rules
              with our easy shipping discount creator.
            </p>
            <Link to="/app/rule">
              <Button variant="primary">Create Shipping Discount</Button>
            </Link>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Home;
