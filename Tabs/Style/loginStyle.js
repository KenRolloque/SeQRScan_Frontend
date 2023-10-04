import { StyleSheet } from "react-native";

const loginStyle = StyleSheet.create({

    mainContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#ffffff"
    },

    logoContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        paddingHorizontal:10,
       
    },

    logoText:{
        fontSize:25,
        color:"#00BF63",
        fontWeight:'bold'
    },

    loginBttn:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        width:"70%",
        marginTop:40,
        // borderWidth:1,
        paddingVertical:15,
        paddingHorizontal:20,
        borderRadius:30,
        backgroundColor:"#e8e8e8"
        // backgroundColor:"#dbdbdb"

    },
    image:{
        width:40, 
        height:40, 
        borderWidth:1,
     
    },
    contGoogle:{
        width:"64%",
        fontFamily:"Roboto-Regular",
        fontSize:15,
        

    }
})

export {loginStyle}