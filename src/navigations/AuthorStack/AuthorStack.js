import { createStackNavigator } from "@react-navigation/stack";
import Constants from "../../constants";
import { TabNavigator } from "../UserStack/TabNavigator";

const Author = createStackNavigator();
export const AuthorStack = (props) => {
  return (
    <Author.Navigator>
      <Author.Screen
        name={Constants.BOTTOM_TAB}
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Author.Navigator>
  );
};
