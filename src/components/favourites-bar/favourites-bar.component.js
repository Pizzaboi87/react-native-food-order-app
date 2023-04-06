import React, { useContext } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { FavouritesWrapper, CardBox, Title } from "./favourites-bar.styles";
import { FavouritesContext } from "../../services/favourites/favourites.context";
import { Item, CompactImage, Name } from "../../screens/map/map.styles";

export const FavouritesBar = ({ onDetail }) => {
  const { favourites } = useContext(FavouritesContext);

  return (
    <FavouritesWrapper>
      <Title variant="caption">
        {favourites
          ? "My Favourite Restaurants"
          : "You don't have favourites yet."}
      </Title>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((restaurant) => {
          const key = restaurant.name.split(" ").join("");
          return (
            <TouchableOpacity onPress={() => onDetail(restaurant)} key={key}>
              <CardBox>
                <Item>
                  <CompactImage source={{ uri: restaurant.photo }} />
                  <Name center variant="caption" numberOfLines={3}>
                    {restaurant.name}
                  </Name>
                </Item>
              </CardBox>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </FavouritesWrapper>
  );
};
