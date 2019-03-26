import { createAppContainer,createDrawerNavigator } from "react-navigation";
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';

const DrawerNavigator = createDrawerNavigator(
    {
        Home:{
            screen: HomeScreen
        },
        Profile: {
            screen: ProfileScreen
        },
        Setting: {
            screen: SettingScreen
        }
    }
);

export default createAppContainer(DrawerNavigator);