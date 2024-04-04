import {
  Button,
  Card,
  Grid,
  InlineGrid,
  Layout,
  Page,
  Spinner,
  TextField,
} from "@shopify/polaris";
import PaddingWrapper from "~/components/PaddingWrapper";
import image from "../img/img.png";

const UI = () => {
  return (
    <Page>
      <Layout>
        {/* //---------------------------------------GRID------------------------------------
        //----------------------------------------------------------------------------------
        //----------------------------------------------------------------------------------
        //---------------------------------------------------------------------------------- */}
        <Layout.Section>
          <Grid columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
            <Grid.Cell>
              <Card>
                <TextField label="Store name" autoComplete="off" />
                <Button variant="primary">Click me</Button>
              </Card>
            </Grid.Cell>
            <Grid.Cell>
              <Card>
                <TextField label="Store name" autoComplete="off" />
                <Button variant="primary">Click me</Button>
              </Card>{" "}
            </Grid.Cell>
          </Grid>
        </Layout.Section>
        {/* //---------------------------------------INLINE-GRID---------------------------------
        //----------------------------------------------------------------------------------
        //----------------------------------------------------------------------------------
        //---------------------------------------------------------------------------------- */}
        <Layout.Section>
          <PaddingWrapper padding="5px">
            <InlineGrid
              columns={{ xs: 1, sm: 3, md: 3, lg: 3, xl: 3 }}
              gap="500"
            >
              <Button>hello</Button>
              <Button>hello</Button>
              <Button>hello</Button>
            </InlineGrid>
          </PaddingWrapper>
        </Layout.Section>
        {/* //---------------------------------------WIDGETS---------------------------------
        //----------------------------------------------------------------------------------
        //----------------------------------------------------------------------------------
        //---------------------------------------------------------------------------------- */}
        <Layout.Section>
          <Spinner accessibilityLabel="Spinner example" size="large" />
          <img
            style={{
              width: "200px", // Set the width of the image
              height: "auto", // Maintain aspect ratio
              borderRadius: "8px", // Add border radius
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            src={image}
            alt="Description of the image"
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default UI;
