import React from "react";
import PropTypes from "prop-types";
import {
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet
} from "react-native";

import BaseInput from "./BaseInput";

export default class Sae extends BaseInput {
  static propTypes = {
    height: PropTypes.number,
    /*
     * This is the icon component you are importing from react-native-vector-icons.
     * import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
     * iconClass={FontAwesomeIcon}
     */
    iconClass: PropTypes.func.isRequired,
    /*
     * Passed to react-native-vector-icons library as name prop
     */
    iconName: PropTypes.string,
    /*
     * Passed to react-native-vector-icons library as color prop.
     * This is also used as border color.
     */
    iconColor: PropTypes.string,
    labelHeight: PropTypes.number,
    padding: PropTypes.number
  };

  static defaultProps = {
    iconColor: "white",
    inputHeight: 48,
    animationDuration: 300,
    iconName: "pencil"
  };

  render() {
    const {
      iconClass,
      iconColor,
      iconName,
      label,
      style: containerStyle,
      inputHeight,
      inputStyle,
      labelStyle,
      labelHeight: LABEL_HEIGHT,
      padding: PADDING
    } = this.props;
    const { width, focusedAnim, value } = this.state;
    const AnimatedIcon = Animated.createAnimatedComponent(iconClass);

    return (
      <View
        style={[
          styles.container,
          containerStyle,
          {
            height: inputHeight + PADDING
          }
        ]}
        onLayout={this._onLayout}
      >
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={{
              position: "absolute",
              bottom: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, LABEL_HEIGHT + PADDING]
              })
            }}
          >
            <Animated.Text
              style={[
                styles.label,
                labelStyle,
                {
                  fontSize: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [14, 12]
                  })
                }
              ]}
            >
              {label}
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TextInput
          ref="input"
          {...this.props}
          style={[
            styles.textInput,
            inputStyle,
            {
              width,
              height: inputHeight
            }
          ]}
          value={value}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
          underlineColorAndroid="transparent"
        />
        <TouchableWithoutFeedback onPress={this.focus}>
          <AnimatedIcon
            name={iconName}
            color={iconColor}
            style={{
              position: "absolute",
              bottom: 0,
              right: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, width + PADDING]
              }),
              transform: [
                {
                  rotate: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "-90deg"]
                  })
                }
              ],
              fontSize: 20,
              backgroundColor: "transparent"
            }}
          />
        </TouchableWithoutFeedback>
        {/* bottom border */}
        <Animated.View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            height: 0.5,
            width: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, width]
            }),
            backgroundColor: iconColor
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden"
  },
  label: {
    backgroundColor: "transparent",
    color: "#7771ab",
    fontSize: 12
  },
  textInput: {
    position: "absolute",
    bottom: -8,
    left: 0,
    paddingTop: 8,
    paddingLeft: 0,
    color: "white",
    fontSize: 18
  }
});
