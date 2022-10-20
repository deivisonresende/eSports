import React, { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { styles } from './styles';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])

  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps){
    navigation.navigate('game', { id, title, bannerUrl });
  }

  useEffect(() => {
    fetch('http://192.168.100.5:3333/games')
    .then(response => response.json())
    .then(data => setGames(data)) 
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image 
          source={logoImg}
          style={styles.logo}
        />

        <Heading 
          title="Encontre o seu duo."
          subtitle="Selecione o game que deseja jogar..."
        />

      <FlatList 
        contentContainerStyle={styles.contentList}
        data={games}
        keyExtractor={game => game.id}
        renderItem={({ item }) => (
          <GameCard 
          data={item} 
          onPress={ ()=> handleOpenGame(item)}
          />

        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      </SafeAreaView>
    </Background>
  );
}
