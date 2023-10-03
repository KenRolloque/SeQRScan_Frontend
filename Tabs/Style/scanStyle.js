import { StyleSheet } from "react-native";


const scanStyle = StyleSheet.create({


    mainContainer:{
        flex:1
    },

    cameraContainer:{
       
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center"
  
    },

    buttonContainer:{

        borderWidth:1,
        alignItems:"center",
  
    },

    buttonContainer2:{
        width:"100%",    
       
    },

    sectionOne:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginTop:50,

    },

    sliderContainer:{

        width:"70%",
        alignItems:"center",
        // borderWidth:1,
      
        borderRadius:30,
        paddingVertical:5,
        paddingHorizontal:15,
        backgroundColor:"#0085C6"
       
    },

    slider:{
        width:"90%",
        height: 40,
         
    },

    
    buttons:{
        width:"100%",
        flexDirection:"row",
        // borderWidth:1,
        justifyContent:"space-around",
        borderRadius:10,
        marginBottom:10,
        paddingVertical:10

       
    },


    torchButton:{
        width:"100%",
        paddingVertical:10,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:50
    },

    uploadButton:{
        width:"100%",
        paddingVertical:10,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:50,
        backgroundColor:"#f0f0f0",
        

    },


    buttonLabel:{
        textAlign:"center", 
        marginTop:5, 
        borderWidth:0, 
        color:"white",

        
    }
})

export {scanStyle}