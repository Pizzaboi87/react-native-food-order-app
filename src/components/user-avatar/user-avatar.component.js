import React, { useContext } from "react";
import { UserImageContext } from "../../services/user-image/user-image.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { UserPhoto, UserAvatar } from "./user-avatar.styles";

export const AvatarImage = ({ size }) => {
  const { userImage } = useContext(UserImageContext);
  const { currentUser } = useContext(AuthenticationContext);

  return userImage ? (
    <UserPhoto size={size} source={{ uri: userImage }} />
  ) : currentUser.photoURL ? (
    <UserPhoto size={size} source={{ uri: currentUser.photoURL }} />
  ) : (
    <UserAvatar size={size} />
  );
};
