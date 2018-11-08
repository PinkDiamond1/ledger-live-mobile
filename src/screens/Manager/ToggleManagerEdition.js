/* @flow */
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import { Trans, translate } from "react-i18next";
import Touchable from "../../components/Touchable";
import LText from "../../components/LText";
import colors from "../../colors";

class ToggleManagerEdition extends Component<*> {
  onPress = () => {
    const { navigation } = this.props;
    const editMode = !navigation.getParam("editMode");
    navigation.setParams({ editMode });
  };

  render() {
    return (
      <Touchable onPress={this.onPress}>
        <LText secondary semiBold style={styles.text}>
          <Trans i18nKey="common.edit" />
        </LText>
      </Touchable>
    );
  }
}

export default translate()(withNavigation(ToggleManagerEdition));

const styles = StyleSheet.create({
  text: {
    color: colors.darkBlue,
    fontSize: 16,
    padding: 10,
  },
});
