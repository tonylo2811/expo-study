// temparary index page for starting development
import { Redirect} from "expo-router";

export default function Index() {
  
  return (
    <Redirect href="/(tabs)/home" />
  );
}

