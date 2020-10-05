import React, { useRef, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Animated, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const MainScreen = () => {
  const events = [
    {
      name: "YF Aftershow",
      img: require('../assets/event1.jpeg'),
    },
    {
      name: "YF Aftershow",
      img: require('../assets/event2.jpeg'),
    },
    {
      name: "YF Aftershow",
      img: require('../assets/event4.jpeg'),
    },
    {
      name: "YF Aftershow",
      img: require('../assets/event2.jpeg'),
    },
    {
      name: "YF Aftershow",
      img: require('../assets/event1.jpeg'),
    },
  ];

  const size = [], translations = [], opacities = [];
  for (let i = 0; i < events.length; i++) {
    size.push(useRef(new Animated.Value(1)).current);
    translations.push(useRef(new Animated.Value(-360)).current);
    opacities.push(useRef(new Animated.Value(0)).current);
  }

  const [activeEvent, setActiveEvent] = useState(-1);
 
  const inceaseSize = (index) => {
    return Animated.timing(size[index], {
      toValue: 2.2,
      duration: 2000,
      useNativeDriver: true
    });
  };

  const decreaseSize = (index) => {
    // Will change width value to 0 in 5 seconds
    return Animated.timing(size[index], {
      toValue: 1,
      duration: 2000
    });
  };

  const moveUp = (index) => {
    return Animated.timing(translations[index], {
      toValue: -450,
      duration: 2000,
      useNativeDriver: true
    });
  };

  const moveDown = (index) => {
    return Animated.timing(translations[index], {
      toValue: -360,
      duration: 2000,
      useNativeDriver: true
    });
  };

  const fadeIn = (index) => {
    return Animated.timing(opacities[index], {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    });
  };
 
  const fadeOut = (index) => {
    return Animated.timing(opacities[index], {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true
    }).start(()=> {setActiveEvent(-1);});
  };

  const hideEventDetails = (index) => {
    Animated.parallel([
      decreaseSize(index),
      moveDown(index),
      fadeOut(index)
    ]).start(() => setActiveEvent(-1));    ;
  };

  const viewEventDetails = (index) => {
    setActiveEvent(index);
    Animated.parallel([
      inceaseSize(index),
      moveUp(index),
      fadeIn(index)
    ]).start();  
  };

  const searchForEvents = () => {
    // to be implemented
  };

  return (
    <View style={styles.body}>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>What are you up for, Kate?</Text>
        <Text style={styles.sectionDescription}>
          These are happening events around you today
        </Text>
        <TextInput
          style={styles.sectionInput}
          onChangeText={(text) => searchForEvents(text)}
          placeholder="Search for Events"
          placeholderTextColor="gray"
        />
      </View>
      <View style={styles.eventsSection}>
        <Text style={styles.suggestions}>Suggestions</Text>
        <ScrollView
          directionalLockEnabled={true}
          horizontal={true}
          style={styles.eventsWrapper}
        >
          {events.map((event, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => viewEventDetails(index)}
            >
              <Image style={styles.eventImg} source={event.img} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {activeEvent !== -1 && (
        <>
      <TouchableOpacity onPress={() => hideEventDetails(index)}>
        <Image style={{height: 30, width:30, position: "absolute", top: 30, bottom: 30}} source={require('../assets/icon-back.png')}></Image>
      </TouchableOpacity>
        <Animated.View
          style={
            {
              transform: [
                { translateY: translations[activeEvent] },
              ],
            }
          }
        >
          <Animated.Image
            style={{
              ...styles.eventImg,
              opacity: opacities[activeEvent],
              transform: [
                { translateX: 95 },
                { scale: size[activeEvent] },
                { translateY: -35 },
              ],
            }}
            source={events[activeEvent].img}
          />
          <View style={styles.eventExpanded}>
            <View style={styles.tabs}>
              <Text style={styles.tab}>Details</Text>
              <Text style={styles.tab}>Current List</Text>
              <Text style={styles.tab}>Feed</Text>
            </View>
            <View>
              <Text style={styles.details}>297 Guests</Text>
              <Text style={styles.details}>Germany</Text>
              <Text style={styles.details}>Today</Text>
            </View>
          </View>
        </Animated.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "orange",
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 50,
    color: "white",
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  sectionDescription: {
    marginTop: 20,
    marginBottom: 26,
    fontSize: 18,
    fontWeight: "400",
    color: "white",
  },
  sectionInput: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  eventsSection: {
    paddingVertical: 30,
    margin: 24,
    borderRadius: 26,
    backgroundColor: "white",
  },
  eventsWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  eventImg: {
    height: 200,
    width: 200,
    borderRadius: 20,
    margin: 12,
  },
  suggestions: {
    color: "gray",
    margin: 12,
    marginBottom: 0,
  },
  eventExpanded: {
    backgroundColor: "white",
    height: "100%",
    borderRadius: 26,
  },
  details: {
    paddingLeft: 66,
    paddingBottom: 10,
  },
  tabs: {
    marginVertical: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  tab: {
    color: "gray",
  },
});

export default MainScreen;
