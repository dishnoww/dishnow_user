import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Animated, Easing } from 'react-native';

import TabHome from '../container/tabHome';
import Departure from '../container/stackDeparture';
import onWait from '../container/onWait';
import List from './liststack';
import Callout from '../container/callout';
import Booked from '../container/List/ListMenu/booked';

const HomeStack = createStackNavigator(
    {
        TabHome : { screen : TabHome },
        Departure : {screen : Departure },
        onWait : {screen : onWait },
        List,
        Callout,
        Booked,
    },
    {
        initialRouteName : 'TabHome',
        headerMode : 'none',
        /*
        transitionConfig : () => ({
            transitionSpec: {
              duration: 0,
              timing: Animated.timing,
              easing: Easing.step0,
              },
          }),
          */
    }
)

HomeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
}

export default HomeStack;