import React from "react";
import { View } from "react-native";
import { Gif } from "../../helpers/gif-plus-text/gif-plus-text.helper";
import {
  DataInput,
  PersonalContainer,
  PersonalTitle,
  RowView,
  Submit,
} from "./personal-data.styles";

export const PersonalDataScreen = () => {
  return (
    <PersonalContainer>
      <Gif source={require("../../../assets/wait.gif")} />
      <PersonalTitle variant="title">Edit Your Personal Data</PersonalTitle>
      <View>
        <RowView>
          <DataInput width={180} label="City" />
          <DataInput width={100} label="ZIP" />
        </RowView>
        <DataInput width={300} label="Street" />
        <RowView>
          <DataInput width={90} label="House" />
          <DataInput width={90} label="Floor" />
          <DataInput width={90} label="Door" />
        </RowView>
      </View>
      <Submit>Submit</Submit>
    </PersonalContainer>
  );
};
