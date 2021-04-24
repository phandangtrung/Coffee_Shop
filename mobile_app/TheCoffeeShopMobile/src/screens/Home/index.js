import 'react-native-gesture-handler';
import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  DrawerLayoutAndroid,
  ScrollView,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SearchBar} from 'react-native-elements';

import DropShadow from 'react-native-drop-shadow';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';

import ProductTag from '../../components/productTag/index';
import ProductCart from '../../components/productCart/index';
import Loading from '../../components/loading/Loading';

import connect1 from '../../api/connect1.tsx';

import {serport} from '../../config/port';

const Home = ({navigation}) => {
  const [search, setsearch] = useState('');

  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [probyCate, setProByCate] = useState({});
  const [isloading, setIsloading] = useState(false);
  useEffect(() => {
    getListCategory();
    return () => {};
  }, []);

  const getListCategory = () => {
    const apiURL = `${serport}/categories`;
    setIsloading(true);
    fetch(apiURL)
      .then((res) => res.json())
      .then((resJson) => {
        setCategories(resJson.categories);
        return resJson.categories;
      })
      .then((_categories) => {
        getListProduct(_categories);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  const getListProduct = (_categories) => {
    const apiURL = `${serport}/products`;
    fetch(apiURL)
      .then((res) => res.json())
      .then((resJson) => {
        let productsByCat = {};
        resJson.products.map((_product) => {
          let title = '';
          _categories.forEach((cate) => {
            if (cate._id === _product.categoryId) title = cate.name;
          });

          productsByCat = {
            ...productsByCat,
            [_product.categoryId]:
              _product.categoryId in productsByCat
                ? [
                    ...productsByCat[_product.categoryId],
                    {..._product, catName: title},
                  ]
                : [{..._product, catName: title}],
          };
        });
        setProduct(resJson.products);
        setProByCate(productsByCat);
        setIsloading(false);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  const renderProduct = (proByCate) => {
    let viewArr = [];
    for (const id in proByCate) {
      viewArr.push(
        <View key={id}>
          <Text
            style={{
              zIndex: 999,
              color: 'white',
              fontFamily: 'Oswald-VariableFont_wght',
              fontSize: 25,
              paddingLeft: 20,
              paddingBottom: 10,
              textShadowRadius: 20,
            }}>
            {proByCate[id][0].catName}
          </Text>
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
              paddingRight: 20,
            }}
            style={{zIndex: 2}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {proByCate[id].map((products) => (
              <ProductTag
                onclickProduct={onclickProduct}
                color="red"
                key={products._id}
                name={products.name}
                description={products.description}
                prices={products.prices}
                imagesProduct={products.imagesProduct}
              />
            ))}
          </ScrollView>
        </View>,
      );
    }
    return viewArr;
  };

  const renderItem = ({item, index}) => {
    return (
      <View>
        <Text style={{color: 'black'}}>{item.name}</Text>
      </View>
    );
  };
  const drawer = useRef(null);
  const onclickProduct = () => {
    navigation.navigate('Product');
  };
  const navigationView = () => (
    <View style={{backgroundColor: 'white', paddingTop: 10}}>
      <ScrollView style={{height: '80%'}}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
              color: 'grey',
            }}>
            {'TÓM TẮT ĐƠN HÀNG'}
          </Text>
          <ProductCart />
          <ProductCart />
          <ProductCart />
          <ProductCart />
        </View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          height: '20%',
          padding: 10,

          borderTopWidth: 0.3,
          borderColor: 'grey',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            paddingBottom: 20,
          }}>
          <Text style={{fontSize: 18}}>{'Tổng cộng'}</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{'59.000đ'}</Text>
        </View>
        <View>
          <Button
            onPress={() => navigation.navigate('Checkout')}
            style={{fontSize: 20}}
            color="#ffb460"
            title="Đặt đơn"
          />
        </View>
      </View>
    </View>
  );
  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="right"
      renderNavigationView={navigationView}>
      <SafeAreaView style={{backgroundColor: '#ffd494', flex: 1}}>
        {isloading === true ? (
          <Loading />
        ) : (
          <ScrollView>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#8e9174', '#465a50']}
              style={{
                borderBottomRightRadius: 30,
                borderBottomLeftRadius: 30,
                flexDirection: 'column',
                height: 250,
                zIndex: 1,
                marginBottom: -70,
              }}>
              <View>
                <View style={styles.banner}>
                  <Text style={styles.title}>Coffee Time</Text>
                  <Text style={styles.ads_content}>
                    {
                      ' A good day starts with a good coffee. How do you want to start your day'
                    }
                  </Text>
                </View>
                <View>
                  <DropShadow
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 0,
                      },
                      shadowOpacity: 0.8,
                      shadowRadius: 5,
                    }}>
                    <Image
                      source={{
                        uri:
                          'https://i.pinimg.com/originals/96/c2/d0/96c2d06fbe198b29deed800ebc97c338.png',
                      }}
                      style={{
                        width: 130,
                        height: 130,

                        resizeMode: 'contain',
                        marginLeft: 230,
                        marginTop: -70,
                      }}
                    />
                  </DropShadow>
                </View>
              </View>
            </LinearGradient>
            {renderProduct(probyCate)}
          </ScrollView>
        )}

        {/* <FlatList
          data={product}
          renderItem={renderItem}
          keyExtractor={(item) => `key-${item._id}`}
        /> */}

        {/* <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
          <View
            style={{
              backgroundColor: '#ffb460',
              width: '100%',
              height: 40,
              borderRadius: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
              }}>
              {'Xem giỏ hàng'}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
              }}>
              {'30.000đ'}
            </Text>
          </View>
        </TouchableOpacity> */}
      </SafeAreaView>
    </DrawerLayoutAndroid>
  );
};
export default Home;
