import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ tabBarLabel:"Home", title: "Home" }}/>
      <Tabs.Screen name="walldrobe" options={{  tabBarLabel:"Wardrobe", title: "Wardrobe"}}/>
      <Tabs.Screen name="laundry" options={{  tabBarLabel:"Laundry", title: "Laundry"}} />
      <Tabs.Screen name="addScan" options={{  tabBarLabel:"Add/Scan", title: "Add/Scan" }} />
      <Tabs.Screen name="account" options={{  tabBarLabel:"Account", title: "Account" }} />
    </Tabs>
  );
};

export default TabsLayout;
