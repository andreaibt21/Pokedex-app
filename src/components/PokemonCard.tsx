import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
  search?: boolean;
}

const PokemonCard = ({pokemon, search}: Props) => {
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (!isMounted.current) return;
    ImageColors.getColors(pokemon.picture, {fallback: 'grey'}).then(colors => {
      if (colors.platform === 'android') {
        setBgColor(colors.dominant || 'grey');
      }
      if (colors.platform === 'ios') {
        setBgColor(colors.background || 'grey');
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() =>
        navigation.navigate('PokemonScreen', {
          simplePokemon: pokemon,
          color: bgColor,
        })
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: (!search?  windowWidth * 0.4: windowWidth * 0.9),
          backgroundColor: bgColor,

        }}>
        {/* Nombre del pokemon y ID */}
        <View>
          <Text style={styles.name}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            {'\n#' + pokemon.id}
          </Text>
        </View>
        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>
        <FadeInImage
          uri={pokemon.picture}
          style={{
            ...styles.pokemonImage,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 10,
    right: 10,
    textAlign: 'right',    
    textShadowRadius: 8,

  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -20,
    left: -20,
    
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    left: -8,
    bottom: -10,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    opacity: 0.5,
    borderRadius: 10,

  },
});

export default PokemonCard;
