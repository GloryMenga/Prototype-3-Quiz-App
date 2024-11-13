import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="home" 
        options={{
          title: "Home"
        }}
      />
      <Stack.Screen 
        name="createroom" 
        options={{
          title: "Create Room"
        }}
      />
      <Stack.Screen 
        name="joinroom" 
        options={{
          title: "Join Room"
        }}
      />
    </Stack>
  );
}