import React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackParams} from '../navigator/Tab1';
import {FadeInImage} from '../components/FadeInImage';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageColors from 'react-native-image-colors';
import {usePokemon} from '../hooks/usePokemon';
import {PokemonDetails} from '../components/PokemonDetails';


interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;
  const {name, id, picture} = simplePokemon;
  const {top} = useSafeAreaInsets();
  const [textColor, setTextColor] = useState('white');
  const {isLoading, pokemon} = usePokemon(id);

  ImageColors.getColors(picture, {fallback: 'white'}).then(colors => {
    if (colors.platform === 'android') {
      setTextColor(colors.average || 'white');
    }
    if (colors.platform === 'ios') {
      setTextColor(colors.background || 'white');
    }
  });

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...styles.backButton,
            top: top + 15,
          }}
          onPress={() => navigation.pop()}>
          <Icon name="arrow-back-outline" color="white" size={35} />
        </TouchableOpacity>

        <Text
          style={{
            ...styles.pokemonName,
            top: top + 45,
            color: textColor,
          }}>
          {name.charAt(0).toUpperCase() + name.slice(1) + '\n'}#{id}
        </Text>

        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={{
            ...styles.pokebola,
          }}
        />

        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>

      {/* DETALLES */}

      {isLoading ? (
        <View style={styles.loadinIndicator}>
          <ActivityIndicator color={color} size={80} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    // borderTopLeftRadius: 500,
    // borderTopEndRadius: 500,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokebola: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  loadinIndicator: {
    flex: 1,
    //height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PokemonScreen;
