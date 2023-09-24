import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import share from '../assets/share.png';
import like from '../assets/like.png';
import view from '../assets/view.png';
export default function NewPost(props) {
    
    
    function gotoDetailsComponent(){
        console.log("clicked")
        props.gotoDetails(props)
    }
    return (
        <View>
            <View style={styles.headingContainer}>
                <Text style={styles.departmentName}>{props.departmentName}</Text>
                <Text style={styles.time}>{props.time} hours ago</Text>
            </View>
            <TouchableOpacity onPress={()=>{gotoDetailsComponent()}}>

            <PostContent props={props} />
            </TouchableOpacity>
           

            <View style={styles.statesContainer}>
                <TouchableOpacity><Text>{props.views} <Image source={view} /></Text></TouchableOpacity>
                <TouchableOpacity><Text>{props.shares} <Image source={share} /></Text></TouchableOpacity>
                <TouchableOpacity><Text>{props.likes} <Image source={like} /></Text></TouchableOpacity>
            </View>
            <ImageOverlay img={props.image} length={props.image?.length - 3}/>
        </View>
    )
}

function PostContent({ props }) {
    // console.log(props)
    if (props.image && props.text) {
        return(
            <View>
                <Text style={styles.postText}>{props.text}</Text>
                <ImageContainer images={props.image}/>
            </View>
            
        )
    }
    else if (props.image) {
        return (
            <ImageContainer images={props.image}/>
        )

    } else if (props.text) {
        return (
            <View>
                <Text style={styles.postText}>{props.text}</Text>
            </View>
        )

    }
}

function ImageContainer({images}) {
    console.log(images)
    if (Array.isArray(images)) {
        if (images.length <= 4) {
            return(
                <View style={styles.multiImgContainer}>
            {images.map(img=> {
                return(
                    <Image source={img.img} style={styles.multiImg}></Image>
                )
            })}
            </View>
            )
           
        } else {
            return(
                <View style={styles.multiImgContainer}>
            {images.slice(0,4).map((img,index)=> {
                return(
                    <OverLayedImage img={img} index={index}/>
                   
                )
            })}
            </View>
            )
        }
    } else {
        return(
            <View style={styles.imageContainer}>
                <Image
                    source={images.img}
                    style={styles.image}
                ></Image>
            </View>
        )
    }
}

function OverLayedImage({img,index}) {
    console.log(index)
    if (index==3) {
        return(
            <Image source={img.img} style={styles.multiImg}></Image>
    )
        
    }
    return(
        <Image source={img.img} style={styles.multiImg}></Image>
    )
}

function ImageOverlay({img, length}) {
    if(Array.isArray(img) && img.length > 4) {
        return(
            <Text style={styles.overlay}>+{length-1}</Text>
        )
    }
}


const styles = StyleSheet.create({
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        backgroundColor: '#fff',
        paddingHorizontal: 15
    },
    departmentName: {
        fontSize: 16,
        fontWeight: '600'
    },
    time: {
        fontWeight: '500'
    },
    imageContainer: {
        maxHeight: 300
    },
    image: {
        width: '100%',
        height: '100%'
    },
    postText: {
        backgroundColor: "#fff",
        paddingTop: 8,
        paddingBottom: 15,
        paddingHorizontal: 15,
        fontWeight: "700",
        fontSize: 16
    },
    statesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#fff'
    },
    multiImgContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center"
    }, 
    multiImg: {
        width: "45%",
        height: 200,
        margin: 5
    },
    overlay: {
        fontSize: 40,
        position: "absolute",
        bottom: 135,
        right: "20%",
        color: "#fff",
    }
})