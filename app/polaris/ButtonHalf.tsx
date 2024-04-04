import { ButtonGroup, Button } from "@shopify/polaris";
import { useCallback } from "react";

export function ButtonHalf({
  isFirstButtonActive,
  setIsFirstButtonActive,
}: any) {
  const handleFirstButtonClick = useCallback(() => {
    if (isFirstButtonActive) return;
    setIsFirstButtonActive(true);
  }, [isFirstButtonActive, setIsFirstButtonActive]);

  const handleSecondButtonClick = useCallback(() => {
    if (!isFirstButtonActive) return;
    setIsFirstButtonActive(false);
  }, [isFirstButtonActive, setIsFirstButtonActive]);

  return (
    <ButtonGroup variant="segmented">
      <Button pressed={isFirstButtonActive} onClick={handleFirstButtonClick}>
        Discount Code
      </Button>
      <Button pressed={!isFirstButtonActive} onClick={handleSecondButtonClick}>
        Automatic Discount
      </Button>
    </ButtonGroup>
  );
}
