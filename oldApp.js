// import "react-native-reanimated";
// import "react-native-gesture-handler";

// import { Linking, Platform, StatusBar, UIManager } from "react-native";
// import React, { useEffect, useState } from "react";

// import BootSplash from "react-native-bootsplash";
// import ChargesContext from "./src/appContext/ChargesContext";
// import Config from "./src/constants/constants";
// import DeviceTokenContext from "./src/appContext/DeviceToken";
// import DrawerNavigation from "./src/routers/DrawerTabNavigator";
// import FilterContext from "./src/appContext/FilterContext";
// import HomeContext from "./src/appContext/HomeContext";
// import Loader from "./src/screens/customcomponents/Loader";
// import LoadingContext from "./src/appContext/LoadingContext";
// import { NavigationContainer } from "@react-navigation/native";
// import NetInfo from "@react-native-community/netinfo";
// import NoInternet from "./src/screens/customcomponents/NoInternet";
// import NotificationContext from "./src/appContext/NotificationContext";
// import PushNotificationController from "./src/utils/PushNotificationController";
// import { StripeProvider } from "@stripe/stripe-react-native";
// import Toast from "react-native-toast-message";
// import UserContext from "./src/appContext/UserContext";
// import { getAsyncStorageItem } from "./src/utils/config";
// import { navigationRef } from "./src/utils/NavigationService";
// import toastConfig from "./src/utils/toastConfig";

// const App = () => {
//   const [loading, setLoading] = useState(false);
//   const [deviceToken, setDeviceToken] = useState("");
//   const [userDetails, setUserDetails] = useState({});
//   const [chargesAmount, setChargesAmount] = useState({
//     tax: "",
//     delivery: "",
//     totalAmount: "",
//     commission: "",
//   });
//   const [filterData, setFilterData] = useState({
//     wineColor: "",
//     minPrice: 0,
//     maxPrice: 1000,
//     country: {
//       id: "",
//       name: "",
//     },
//     region: "",
//     appellation: "",
//     chateau: "",
//     vintage: "",
//     bottleSize: "",
//     bottleNumber: "",
//   });
//   const [notificationCount, setNotificationCount] = useState({
//     order: false,
//     chat: false,
//     received_order: false,
//     orderTab: false,
//     notificationCount: 0,
//   });

//   const [homeData, setHomeData] = useState({
//     categories: [],
//     featuredWines: [],
//     topSallers: [],
//   });

//   const [isConnected, setIsConnected] = useState(true);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener((state) => {
//       setIsConnected(state.isConnected);
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     hideSplash();
//   }, []);

//   const hideSplash = async () => {
//     await BootSplash.hide({ fade: true });

//     let notificaitons = await getAsyncStorageItem(
//       `notificationCount${userDetails._id}`
//     );

//     if (notificaitons != null) {
//       setNotificationCount(notificaitons);
//     }
//   };

//   if (Platform.OS === "android") {
//     if (UIManager.setLayoutAnimationEnabledExperimental) {
//       UIManager.setLayoutAnimationEnabledExperimental(true);
//     }
//   }

//   useEffect(() => {
//     Linking.getInitialURL().then((url) => {
//       if (url) {
//         console.log("App opened with URL:", url);
//       }
//     });
//   }, []);

//   const config = {
//     screens: {
//       MainStackNavigator: {
//         screens: {
//           WineDetails: {
//             path: ":wineID",
//             parse: {
//               wineID: (id) => `${id}`,
//             },
//           },
//         },
//       },
//     },
//   };

//   const linking = {
//     prefixes: ["omnicave://"],
//     config,
//   };

//   if (!isConnected) {
//     return <NoInternet setIsConnected={setIsConnected} />;
//   }

//   return (
//     <StripeProvider publishableKey={Config.Strip_PK}>
//       <DeviceTokenContext.Provider value={{ deviceToken, setDeviceToken }}>
//         <NotificationContext.Provider
//           value={{ notificationCount, setNotificationCount }}
//         >
//           <LoadingContext.Provider value={{ loading, setLoading }}>
//             <ChargesContext.Provider
//               value={{ chargesAmount, setChargesAmount }}
//             >
//               <UserContext.Provider value={{ userDetails, setUserDetails }}>
//                 <FilterContext.Provider value={{ filterData, setFilterData }}>
//                   <HomeContext.Provider value={{ homeData, setHomeData }}>
//                     <NavigationContainer
//                       independent="true"
//                       ref={navigationRef}
//                       linking={linking}
//                     >
//                       <StatusBar
//                         barStyle={"light-content"}
//                         translucent
//                         backgroundColor={"transparent"}
//                       />
//                       <DrawerNavigation />
//                       <Loader />
//                       <PushNotificationController />
//                       <Toast
//                         config={toastConfig}
//                         ref={(ref) => Toast.setRef(ref)}
//                       />
//                     </NavigationContainer>
//                   </HomeContext.Provider>
//                 </FilterContext.Provider>
//               </UserContext.Provider>
//             </ChargesContext.Provider>
//           </LoadingContext.Provider>
//         </NotificationContext.Provider>
//       </DeviceTokenContext.Provider>
//     </StripeProvider>
//   );
// };

// export default App;
