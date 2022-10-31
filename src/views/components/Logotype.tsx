import { Image, ImageStyle, StyleProp } from "react-native";

export default function Logotype({ style }: { style: StyleProp<ImageStyle> }) {
  return (
    <Image style={style} source={require('../../../assets/images/logo.png')}/>
  )
}
