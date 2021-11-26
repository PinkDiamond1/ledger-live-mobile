import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Flex, Text, Button } from "@ledgerhq/native-ui";

import { TrackScreen } from "../../../analytics";
import nanoS from "../assets/nanoS";
import nanoX from "../assets/nanoX";
import Touchable from "../../../components/Touchable";
import { ScreenName } from "../../../const";
import OnboardingView from "../OnboardingView";

const devices = [nanoS, nanoX];

function OnboardingStepDeviceSelection() {
  const [devicePicked, setDevicePicked] = useState<null | string>(null);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const next = () => {
    // TODO: FIX @react-navigation/native using Typescript
    // @ts-ignore next-line
    navigation.navigate(ScreenName.OnboardingUseCase, {
      deviceModelId: devicePicked,
    });
  };

  return (
    <OnboardingView
      hasBackButton
      title={t("onboarding.stepSelectDevice.title")}
      footer={
        <Flex flexDirection="row" justifyContent="center">
          <Button
            disabled={!devicePicked}
            onPress={next}
            testID={`Onboarding Device - Selection|${devicePicked}`}
            type="main"
          >
            {t("onboarding.stepSelectDevice.chooseDevice")}
          </Button>
        </Flex>
      }
    >
      {devices.map(Device => (
        <Touchable
          key={Device.id}
          event="Onboarding Device - Selection"
          eventProperties={{ id: Device.id }}
          testID={`Onboarding Device - Selection|${Device.id}`}
          onPress={() => setDevicePicked(Device.id)}
        >
          <Flex
            pt={9}
            paddingX={3}
            pb={11}
            justifyContent="center"
            alignItems="center"
            backgroundColor={
              devicePicked === Device.id ? "palette.neutral.c30" : null
            }
          >
            <Device />
            <Text variant="small" fontSize={2} mt={8}>
              Ledger
            </Text>
            <Text variant="h1" fontSize={8} mt={3}>
              {t(`onboarding.stepSelectDevice.${Device.id}`)}
            </Text>
          </Flex>
        </Touchable>
      ))}
      <TrackScreen category="Onboarding" name="SelectDevice" />
    </OnboardingView>
  );
}

export default OnboardingStepDeviceSelection;
