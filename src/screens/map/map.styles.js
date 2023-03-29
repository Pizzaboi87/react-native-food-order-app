import styled from "styled-components/native";
import MapView from "react-native-maps";
import { WebView } from "react-native-webview";
import { StyledText } from "../../helpers/typography/text.helper";

export const MapContainer = styled.View`
  flex: 1;
`;

export const Map = styled(MapView)`
  width: 100%;
  height: 100%;
`;

export const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

export const CompactWebView = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

export const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

export const Name = styled(StyledText)`
  text-align: center;
  margin-top: ${(props) => props.theme.sizes[0]};
`;
