import { View, Text, FlatList, Dimensions} from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SearchInput from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import PokemonCard from '../components/PokemonCard';
import {styles} from '../theme/appTheme';
import Loading from '../components/Loading';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = usePokemonSearch();
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);
  const [term, setTerm] = useState('');

    useEffect(() => {
        if(term.length === 0){
            return setPokemonFiltered([]);
        }


        if(isNaN(  Number(term))){
            setPokemonFiltered(
                simplePokemonList.filter(
                    poke => poke.name.toLocaleLowerCase()
                       .includes(term.toLocaleLowerCase())
                )
    
            )

        }else{
            const pokemonById = simplePokemonList.find(poke => poke.id ===term )
            setPokemonFiltered(  
                pokemonById? [pokemonById]: []
            )
        }
        
    
    }, [term])
    




  if (isFetching) {
    return <Loading />;
  }

  return (
    <View
      style={{
     
        flex: 1,
        marginHorizontal: 20,
      }}>
      <SearchInput
         onDebounce={(value) =>  setTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: top + 30,
        }}
      />

      <View style={{alignItems: 'center'}}>
        <FlatList
          data={pokemonFiltered}
          keyExtractor={pokemon => pokemon.id}
          numColumns={2}
          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
                paddingBottom: 10,
                marginTop: top + 80,
              }}>
              {term}
            </Text>
          }
          renderItem={({item}) => <PokemonCard pokemon={item} />}
        />
      </View>
    </View>
  );
};

export default SearchScreen;
