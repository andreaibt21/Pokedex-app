import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {PokemonFull} from '../interfaces/pokemonInterfaces';
import {ScrollView} from 'react-native-gesture-handler';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: PokemonFull;
}
export const PokemonDetails = ({pokemon}: Props) => {
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject,
      }}>
      <View
        style={{
          ...styles.container,
          marginTop: 370,
        }}>
        <Text style={{...styles.title}}> Types</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon.types.map(({type}) => (
            <Text
              key={type.name}
              style={{...styles.regularText, marginRight: 10}}>
              {type.name}
            </Text>
          ))}
        </View>
        <Text style={{...styles.title}}> Weight</Text>
        <Text style={{...styles.regularText}}> {pokemon.weight} kg</Text>
      </View>

      <View style={{...styles.container}}>
        <Text style={{...styles.title}}> Sprites</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={styles.basicSprite}
        />
      </ScrollView>

      <View
        style={{
          ...styles.container,
        }}>
        <Text style={{...styles.title}}> Base abilities</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon.abilities.map(({ability}) => (
            <Text
              key={ability.name}
              style={{...styles.regularText, marginRight: 10}}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>

      <View
        style={{
          ...styles.container,
        }}>
        <Text style={{...styles.title}}>Moves</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {pokemon.moves.map(({move}) => (
            <Text
              key={move.name}
              style={{
                ...styles.regularText,
                marginRight: 10,
                textAlign: 'justify',
              }}>
              {capitalize(move.name)}
            </Text>
          ))}
        </View>
      </View>

      <View
        style={{
          ...styles.container,
        }}>
        <Text style={{...styles.title}}>Stats</Text>
        <View style={{}}>
          {pokemon.stats.map((stat, i) => (
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap'}}
              key={stat.stat.name + i}>
              <Text
                style={{...styles.regularText, marginRight: 10, width: 150}}>
                {capitalize(stat.stat.name)}
              </Text>
              <Text style={{...styles.regularText, fontWeight: 'bold'}}>
                {stat.base_stat}
              </Text>
            </View>
          ))}
        </View>

        <View  
           style={{marginBottom: 70,
           alignItems: 'center'}}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicSprite}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  regularText: {
    fontSize: 19,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
});
