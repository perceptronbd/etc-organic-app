import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export const renderIcon = (iconProps) => {
  const { library, name, size, color } = iconProps;
  switch (library) {
    case "Ionicons":
      return <Ionicons name={name} size={size} color={color} />;
    case "MaterialIcons":
      return <MaterialIcons name={name} size={size} color={color} />;
    case "Feather":
      return <Feather name={name} size={size} color={color} />;
    default:
      return null;
  }
};
