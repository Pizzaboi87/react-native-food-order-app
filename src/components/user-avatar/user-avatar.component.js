import React, { useContext } from "react";
import { UserImageContext } from "../../services/user-image/user-image.context";
import { UserPhoto, UserAvatar } from "./user-avatar.styles";

export const AvatarImage = ({ size }) => {
  const { userImage } = useContext(UserImageContext);
  return userImage ? (
    <UserPhoto size={size} source={{ uri: userImage }} />
  ) : (
    <UserAvatar size={size} />
  );
};
