
import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text, Image, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity} from 'react-native';

import InputSearch from '../../components/FormsUI/InputSearch'
import Menu from '../../components/Menu'

function Index(props){
    const { navigation } = props

    const CURRENCY_SYMBOL = process.env.CURRENCY_SYMBOL
    let type = "Mobil";

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const ItemsPerPage = 10
    
    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };
    
    
    const [Columns, setColumns] = useState(2);
    const [Orientation, setOrientation] = useState(isPortrait);
    

    useEffect(()=>{
       if(type == "Tablet"){
            console.log(isPortrait() , "ORIENTARION")
           if(Orientation){
            setColumns(3)
           }else{
            setColumns(4)
           }
        }else{
            if(Orientation){
                setColumns(2)
            }else{
                setColumns(3)
            }
        }
     }, [Orientation])

    

    const [index, setIndex]                      = useState(false);
    const [showmodalFilter, setShowModalFilter]  = useState(false);
    const [OpenMenu , setOpenMenu]               = useState(null)
    const [Search , setSearch]                   = useState(null)

    // const [ItemsProduct, setItemsProduct] = useState([])

    const [Load , setLoad]                 = useState(false)
    const [LoadScroll , setLoadScroll]     = useState(false)

    const [CurrentPage , setCurrentPage]   = useState(false)

    const [ItemsCategory, setItemsCategory] = useState([]);
    const [ModalCategory, setModalCategory] = useState([]);


    const [formInfo , setFormInfo] = useState({
        minPrice     : '',
        maxPrice     : '',
    })



    const ItemsProduct = [
        {
            "title" : "Barbera Patillera Vgr V-170",
            "description" : "Maquina patillera de acero inoxidable, De alta dureza y fácil de limpiar.",
            "price" : "$ 120.000",
            "image" : "https://planmed.com.co/wp-content/uploads/2022/05/Screen-Shot-2022-05-13-at-5.12.37-PM.png"
        },
        {
            "title" : "Kit de máquina recargable Kemei para cortar el cabello ",
            "description" : "Batería de iones de litio de 2500 mAh de alta calidad con carga USB,    tiempo de ejecución completo de 300 minutos con uso continuo y la luz LED indica la energía restante de la batería.",
            "price" : "$ 180.000",
            "image" : "https://planmed.com.co/wp-content/uploads/2022/05/Screen-Shot-2022-05-13-at-5.13.34-PM.png"
        },
        {
            "title" : "Kit de máquina recargable Bestbomg para corte de cabello ",
            "description" : "batería de 2000 mAh recargable potente y duradera con un tiempo de funcionamiento de hasta 4 horas después de 2-3 horas de carga.",
            "price" : "$ 90.000",
            "image" : "https://planmed.com.co/wp-content/uploads/2022/05/Screen-Shot-2022-05-13-at-5.16.01-PM.png"
        },
        {
            "title" : "CUCHILLA PREMIUM VGR",
            "description" : "",
            "price" : "$ 40.000",
            "image" : "https://planmed.com.co/wp-content/uploads/2022/05/Screen-Shot-2022-05-13-at-5.17.39-PM.png"
        },

        {
            "title" : "Secador de cabello gana titanium ",
            "description" : "Motor DC 3 Temperaturas, 2 Velocidades, 1900W",
            "price" : "$ 130.000",
            "image" : "https://planmed.com.co/wp-content/uploads/2022/05/Screen-Shot-2022-05-13-at-5.20.35-PM.png"
        },

        {
            "title" : "Cabello sintético Kanekalon ",
            "description" : "Es una de las fibras sintéticas más utilizadas en la industria capilar, gracias a que es muy versátil, duradera y práctica. Además, es resistente al calor.",
            "price" : "$ 8.000",
            "image" : "https://planmed.com.co/wp-content/uploads/2022/05/kanekalon-soft-jumbo-n-l99j-x-100g-24-1.jpg"
        },


        {
            "title" : "Cabello sintético Kanekalon ",
            "description" : "Es una de las fibras sintéticas más utilizadas en la industria capilar, gracias a que es muy versátil, duradera y práctica. Además, es resistente al calor.",
            "price" : "$ 8.000",
            "image" : "https://planmed.com.co/wp-content/uploads/2022/05/kanekalon-cabello-artificial-jumbo-braids-cabello-sintetico-1.jpg"
        },

        {
            "title" : "WAHL PROFESSIONAL BARBER COMBO 5 ESTRELLAS ",
            "description" : "Viene con todas los accesorios necesarios para su uso ",
            "price" : "$ 370.000",
            "image" : "https://planmed.com.co/wp-content/uploads/2022/05/Screen-Shot-2022-05-13-at-5.26.29-PM.png"
        },

        {
            "title" : "WAHL PROFESSIONAL BARBER COMBO 5 ESTRELLAS ",
            "description" : "Viene con todas los accesorios necesarios para su uso ",
            "price" : "$ 370.000",
            "image" : "https://planmed.com.co/wp-content/uploads/2022/05/Screen-Shot-2022-05-13-at-5.27.55-PM.png"
        },

        {
            "title" : "Kit de peines completo ",
            "description" : "",
            "price" : "$ 10.000",
            "image" : "https://planmed.com.co/wp-content/uploads/2022/05/Screen-Shot-2022-05-13-at-5.29.14-PM.png"
        },


        {
            "title" : "Guantes de nitrilo ",
            "description" : "Talla S, M110 unidades, Libres de látex, libres de talco",
            "price" : "$ 28.000",
            "image" : "https://planmed.com.co/wp-content/uploads/2022/05/Screen-Shot-2022-05-13-at-5.32.27-PM.png"
        },

        {
            "title" : "Chaleco antifluido unisex",
            "description" : "Talla S, M ",
            "price" : "$ 28.000",
            "image" : "https://planmed.com.co/wp-content/uploads/2022/05/Screen-Shot-2022-05-13-at-5.34.26-PM.png"
        },

        {
            "title" : "Kit de viaje para manicure y pedicure duduer 16 piezas ",
            "description" : "",
            "price" : "$ 70.000",
            "image" : "https://planmed.com.co/wp-content/uploads/2022/05/WhatsApp-Image-2022-05-13-at-5.42.59-PM.jpeg"
        },

        {
            "title" : "Kit manicurista",
            "description" : "Incluye 20 accesorios",
            "price" : "$ 35.000",
            "image" : "https://planmed.com.co/wp-content/uploads/2022/05/WhatsApp-Image-2022-05-13-at-5.44.32-PM.jpeg"
        },

        {
            "title" : "Maleta para manicurista con división para esmalte ",
            "description" : "",
            "price" : "$ 220.000",
            "image" : "https://planmed.com.co/wp-content/uploads/2022/05/WhatsApp-Image-2022-05-13-at-5.46.01-PM.jpeg"
        },

        {
            "title" : "Maleta para manicurista con división para esmalte ",
            "description" : "",
            "price" : "$ 220.000",
            "image" : "https://planmed.com.co/wp-content/uploads/2022/05/WhatsApp-Image-2022-05-13-at-5.47.29-PM.jpeg"
        },










       
    ]




    function goToScreen(screen, data)
    {   
        navigation.navigate(screen, {data, randomCode : Math.random()})
    }

    const onChangeText = (text) =>{
        setCurrentPage(false);
        setSearch(text)
    }

    const onChangeValue = (text, key) =>{
        setFormInfo({
            ...formInfo,
            [key] : text
        })
    }


    useEffect(()=>{
       getData({
        search: Search
    });
    
    }, [Search]);

    const getData = async ({search, category, price})=>{
        let items = [];
        setLoad(true)
        setItemsProduct([])
        setLoad(false)

    }

    let stopFetchMore = true;

    const GridView = ({ data }) => (
        <TouchableOpacity style={styles.gridbox} key={data.id} onPress={()=>goToScreen("ItemDetail", data)}>
            <View style={{backgroundColor :"#000000", width : 150, height: 150, borderRadius : 24}}>
                <Image style={styles.imageItem} source={{uri : data.image}}/>
            </View>
            <Text style={styles.gridText} >{data.title}</Text>
            <Text style={styles.gridPrice} >{data.price}</Text>
        </TouchableOpacity>
    );

    const renderFooter = () => {
        if (LoadScroll) {
          return <ActivityIndicator size="large" color={"black"} />
        } else {
          return null;
        }
    };

    const modalFilter = ()=>{
        setShowModalFilter(!showmodalFilter);
    }

    const changeCategory = (cat, element)=>{
        setCurrentPage(false);
        setItemsCategory(prevState => {
            let data = prevState.map((item)=>{
                if(item.id == element.id){
                item.selected = true;
                }else{
                item.selected = false;
                }
                return item;
            });
            return data;
        });
        console.log('changeCategory')
        
        let selected = ItemsCategory[cat];

        setIndex((selected.id != 0 ? selected.id:false));

        getData({ 
            search: Search,
            category: index
        });
    }

    return(
       
        <SafeAreaView style={{ flex: 1, backgroundColor : "white", paddingTop : 40}}>
            
            
            {/* <View style={styles.contentSearch}>
                <InputSearch placeholder="Search"  width={"100%"} set = {onChangeText}/>
            </View> */}

            {ItemsProduct.length == 0 &&
                <ActivityIndicator size="large" color={"#000000"} />
            }

            {ItemsProduct.length == 0 &&
                <Text style={styles.textResult}>No results</Text>
            }
             
            <FlatList
                data={ItemsProduct}
                numColumns = {Columns}
                keyExtractor={(item, index) => index}   
                renderItem={({ item }) => <GridView key={item.id} data={item} />}
                key={item => item.id}
                
            /> 


            <Menu props={props}/>


        </SafeAreaView>
     
    )

}


const styles = StyleSheet.create({
    
    scene: {
      flex: 1,
    },
    contentNotification : {
        backgroundColor: "white",
        borderColor :"#000000",
        borderWidth : 1,
        alignItems: 'center',
        justifyContent : "center",
        borderRadius : 100
    },
    imgNotification: {
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    contentSearch : {
        flexDirection : "row", 
        alignItems : "center", 
        justifyContent : "space-between", 
        paddingHorizontal : 20,
        paddingBottom: 5
    },

    MainContainer: {
        flex: 1,
        backgroundColor: 'white'
      },
    
    gridbox: {
        flex: 1,
        height: 250,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom : 10,
        marginTop : 10
    },

    badge: {
        color: "white", 
        backgroundColor: "red", 
        padding: 4,
        top: -140,
        fontWeight: "700",
        position: "relative", 
        fontSize: 12,
        zIndex: 2, 
        elevation: 2,
        width: "35%"
    },


    gridText: {
        fontSize: 14,
        fontWeight : "500",
       
        color : "black",
        lineHeight : 19,
        marginTop : 10,
        textAlign : "left",
        alignSelf : "flex-start",
        marginLeft : 23
    },

    gridPrice: {
        fontSize: 16,
        fontWeight : "500",
      
        color : "red",
        lineHeight : 22,
        marginTop : 10,
        textAlign : "left",
        alignSelf : "flex-start",
        marginLeft : 23
    },

    newBTN: {
        marginLeft: 5,
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 10
    },

    borderSelected: {
        borderBottomColor: "#F26060",
        borderBottomWidth: 4,
    },
    
    imageItem : {
        width : 150,
        height : 150,
        borderRadius : 24,
        resizeMode : "cover"
    },

    titles :{
       
        fontStyle : "normal",
        fontWeight : "800",
        fontSize : 18,
        lineHeight : 33,
        color : "black"
    },

    subTitles :{
       
        fontStyle : "normal",
        fontWeight : "800",
        fontSize : 14,
        lineHeight : 33,
        color : "black"
    },

    paragraph : {
        fontSize : 14,
        fontStyle : "normal",
        lineHeight : 24,
        color : "#A9A9AA",
        marginTop : 15,
        fontWeight : "500",
       
    },

    textResult : {
        backgroundColor : "#063046",
        padding : 10,
        borderRadius : 12,
        color : "white",
        textAlign : "center",
        width : "90%",
        alignSelf : "center",
        marginTop : 20
      }

    
  });
  



export default Index;



