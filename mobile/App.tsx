import { StatusBar } from 'react-native';
import { useRef, useEffect } from 'react';
import { 
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
 } from '@expo-google-fonts/inter';
 import { Subscription } from 'expo-modules-core'
import { Background } from './src/components/Background';
import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';
import * as Notifications from 'expo-notifications';
import './src/services/notificationConfigs';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';

export default function App() {

const geNotificationListener = useRef<Subscription>()
const responseNotificationListener = useRef<Subscription>()

useEffect(() => {
  getPushNotificationToken()
})

useEffect(() => {
  geNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    console.log('receive notification', notification)
  })

  responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(notification => {
    console.log('res notification', notification)
  })

  return () => {
    if(geNotificationListener.current && responseNotificationListener.current){
      Notifications.removeNotificationSubscription(geNotificationListener.current)
      Notifications.removeNotificationSubscription(responseNotificationListener.current)
    }
  }
}, [])

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })

  return (
    <Background>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}