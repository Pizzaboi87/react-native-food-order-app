import styled from "styled-components/native";
import MapView from "react-native-maps";

export const MapContainer = styled.View`
  flex: 1;
`;

export const Map = styled(MapView)`
  width: 100%;
  height: 100%;
`;
