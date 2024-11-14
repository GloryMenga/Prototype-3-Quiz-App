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
        name="pages/Home" 
        options={{
          title: "Home"
        }}
      />
      <Stack.Screen 
        name="pages/CreateRoom" 
        options={{
          title: "Create Room"
        }}
      />
      <Stack.Screen 
        name="pages/JoinRoom" 
        options={{
          title: "Join Room"
        }}
      />
      <Stack.Screen 
        name="pages/PlayersWaiting" 
        options={{
          title: "Waiting for players"
        }}
      />
      <Stack.Screen 
        name="pages/RolePicking" 
        options={{
          title: "Pick your role"
        }}
      />
      <Stack.Screen 
        name="pages/WaitingForPlayer" 
        options={{
          title: "Waiting for a player"
        }}
      />
      <Stack.Screen 
        name="pages/WaitingForQuizmaster" 
        options={{
          title: "Waiting for a quizmaster"
        }}
      />
    </Stack>
  );
}