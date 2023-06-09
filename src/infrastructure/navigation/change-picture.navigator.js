import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CameraScreen } from "../../screens/camera/camera.screen";
import { ChangePictureScreen } from "../../screens/change-picture/change-picture.screen";

const PictureStack = createStackNavigator();

export const ChangePictureNavigator = () => {
  return (
    <PictureStack.Navigator screenOptions={{ headerShown: false }}>
      <PictureStack.Screen
        name="Change Profile Picture"
        component={ChangePictureScreen}
      />
      <PictureStack.Screen name="Camera" component={CameraScreen} />
    </PictureStack.Navigator>
  );
};
