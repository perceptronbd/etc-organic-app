import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import tailwind from "twrnc";
import COLOR from "../../constants/COLOR";
import { StyledText } from "../texts/StyledText";

const { width } = Dimensions.get("window");
const carouselItem = require("./carousel.json");
const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };

export function Carousel() {
  let flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  // Function to automatically slide the carousel
  const autoSlide = () => {
    const nextIndex = (currentIndex + 1) % carouselItem.length;
    setCurrentIndex(nextIndex);
    scrollToIndex(nextIndex);
  };

  useEffect(() => {
    const interval = setInterval(autoSlide, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItems = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => console.log("clicked")}
        activeOpacity={1}
      >
        <Image source={{ uri: item.url }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={tailwind`flex h-full w-full items-center justify-center rounded-xl bg-neutral-200`}
      >
        <StyledText
          variant="titleLarge"
          type="b"
          style={{
            color: COLOR.neutralDark,
          }}
        >
          কোন অফার চলছে না
        </StyledText>
      </View>
      {/* <FlatList
        data={carouselItem}
        renderItem={renderItems}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={(ref) => {
          flatListRef.current = ref;
        }}
        style={styles.carousel}
        viewabilityConfig={viewConfigRef}
      /> */}

      {/* <View style={styles.dotView}>
        {carouselItem.map((_, index) => {
          return (
            <TouchableOpacity
              key={index.toString()}
              style={{
                width: currentIndex === index ? 8 : 5,
                height: currentIndex === index ? 8 : 5,
                borderRadius: 50,
                marginHorizontal: 5,
                backgroundColor: currentIndex === index ? "black" : "gray",
              }}
              onPress={() => scrollToIndex(index)}
            />
          );
        })}
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 230,
    width,
    marginTop: 5,
  },
  carousel: {
    width,
    maxHeight: 230,
  },
  image: {
    width: width - 20,
    height: 210,
    resizeMode: "cover",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  dotView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
});
