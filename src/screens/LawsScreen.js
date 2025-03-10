import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  Share,
  Alert,
  useColorScheme,
} from "react-native";
import { Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  principalAuthoredBills,
  coAuthoredBills,
  committeeMembership,
} from "../../LawData"; // Ensure this path is correct
import { Linking } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons"; // Import icon libraries

const { width } = Dimensions.get("window");
const HEADER_HEIGHT = 120;

/**
 * LawsScreen Component: Displays laws and legislation information.
 */
export default function LawsScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  // State variables
  const [selectedSection, setSelectedSection] = useState(
    "Principal Authored Bills"
  );
  const [loading, setLoading] = useState(true); // Initial loading state
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null); // Error state for data fetching
  const [savedItems, setSavedItems] = useState({});

  // Animated values for header animation
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const headerHeight = useRef(new Animated.Value(HEADER_HEIGHT)).current;

  // Data sections
  const sections = {
    "Principal Authored Bills": principalAuthoredBills,
    "Co-Authored Bills": coAuthoredBills,
    "Committee Membership": committeeMembership,
  };

  const sectionKeys = Object.keys(sections);

  // Animated header style
  const animatedHeaderStyle = {
    height: headerHeight,
    backgroundColor: isDarkMode ? "#121212" : "#003366", // Dark mode header color
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: "hidden",
  };

  // Header title opacity animation
  const headerTitleOpacity = scrollX.interpolate({
    inputRange: [0, width / 2, width],
    outputRange: [1, 0, 1],
    extrapolate: "clamp",
  });

  // Dynamic styles based on color scheme
  const dynamicStyles = {
    backgroundColor: isDarkMode ? "#333333" : "#f9f9f9",
    textColor: isDarkMode ? "#ffffff" : "#333333",
    cardBackgroundColor: isDarkMode ? "#444444" : "#ffffff",
    cardTextColor: isDarkMode ? "#ffffff" : "#333333",
  };

  /**
   * Handles scroll events for section selection.
   */
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const activeIndex = Math.round(offsetX / width);
        setSelectedSection(sectionKeys[activeIndex]);
      },
    }
  );

  // useEffect to scroll to the selected section
  useEffect(() => {
    const index = sectionKeys.indexOf(selectedSection);
    const offset = index * width;
    scrollViewRef.current?.scrollTo({ x: offset, animated: true });
  }, [selectedSection]);

  /**
   * Simulates fetching data. Replace with actual API call.
   */
  const fetchData = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a random error occurrence
        if (Math.random() < 0.2) {
          reject("Failed to fetch data."); // Simulate an error
        } else {
          resolve(); // Resolve after the simulated delay
        }
      }, 2000);
    });
  };

  /**
   * Initial data loading effect.
   */
  const initialLoad = async () => {
    try {
      setLoading(true);
      await fetchData(); // Fetch initial data
      setError(null); // Reset error state on successful fetch
      await loadSavedItems(); // Load saved items from AsyncStorage
    } catch (err) {
      setError(err); // Set error state on failure
    } finally {
      setLoading(false); // Ensure loading is set to false after fetch
    }
  };

  /**
   * Handles refresh control functionality.
   */
  const onRefresh = useCallback(() => {
    const refreshData = async () => {
      try {
        setRefreshing(true);
        await fetchData(); // Fetch fresh data
        setError(null); // Reset error state on successful refresh
      } catch (err) {
        setError(err); // Set error state on failure
      } finally {
        setRefreshing(false); // Stop refreshing animation
      }
    };

    refreshData();
  }, []);

  useEffect(() => {
    initialLoad();
  }, []);

  /**
   * Handles sharing functionality using React Native's Share API.
   * @param {string} message - The message to be shared.
   */
  const handleShare = async (message) => {
    try {
      const result = await Share.share({
        message: message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("Shared successfully!");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      Alert.alert("Sharing failed", error.message);
    }
  };

  /**
   * Saves an item to AsyncStorage.
   * @param {string} key - The key to store the item under.
   * @param {object} item - The item to be saved.
   */
  const saveItem = async (key, item) => {
    try {
      const newItem = { ...savedItems, [key]: item };
      const jsonValue = JSON.stringify(newItem);
      await AsyncStorage.setItem("savedItems", jsonValue);
      setSavedItems(newItem);
      Alert.alert("Item Saved", "This item has been saved successfully!");
    } catch (e) {
      Alert.alert("Saving Failed", "There was an error saving the item.");
    }
  };

  /**
   * Loads saved items from AsyncStorage.
   */
  const loadSavedItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("savedItems");
      return jsonValue != null
        ? setSavedItems(JSON.parse(jsonValue))
        : null;
    } catch (e) {
      Alert.alert(
        "Loading Failed",
        "There was an error loading the saved items."
      );
    }
  };

  /**
   * Checks if an item is currently saved.
   * @param {string} key - The key of the item to check.
   * @returns {boolean} - True if the item is saved, false otherwise.
   */
  const isItemSaved = (key) => {
    return !!savedItems[key];
  };

  // Loading indicator or error message display
  if (loading) {
    return (
      <View
        style={[styles.loadingContainer, { backgroundColor: dynamicStyles.backgroundColor }]}
      >
        <ActivityIndicator size="large" color="#003366" />
        <Text style={[styles.loadingText, { color: dynamicStyles.textColor }]}>
          Loading Laws...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[styles.errorContainer, { backgroundColor: dynamicStyles.backgroundColor }]}
      >
        <Text style={[styles.errorText, { color: dynamicStyles.textColor }]}>
          {error}
        </Text>
        <TouchableOpacity onPress={onRefresh} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: dynamicStyles.backgroundColor }]}>
      <View style={[styles.container, { backgroundColor: dynamicStyles.backgroundColor }]}>
        {/* Animated Header */}
        <Animated.View style={[styles.header, animatedHeaderStyle]}>
          <Animated.Text
            style={[
              styles.headerTitle,
              { opacity: headerTitleOpacity, textAlign: "center" },
            ]}
          >
            Laws & Legislation
          </Animated.Text>
        </Animated.View>
        {/* Scrollable content */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          onMomentumScrollEnd={(e) => {
            const contentOffset = e.nativeEvent.contentOffset.x;
            const index = Math.round(contentOffset / width);
            setSelectedSection(sectionKeys[index]);
          }}
          style={styles.contentScrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              enabled={!loading}
              progressBackgroundColor="#ffffff"
              colors={["#003366"]}
              title="Refreshing..."
              titleColor="#003366"
              progressViewOffset={40} // Add offset to prevent accidental triggers
            />
          }
        >
          {/* Mapping through sections */}
          {Object.keys(sections).map((section) => (
            <View key={section} style={styles.page}>
              <Text style={[styles.sectionTitle, { color: dynamicStyles.textColor }]}>{section}</Text>
              <FlatList
                data={sections[section]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Card style={[styles.card, { backgroundColor: dynamicStyles.cardBackgroundColor }]}>
                    <Card.Content>
                      {/* Conditional rendering for Committee Membership */}
                      {section === "Committee Membership" ? (
                        <>
                          <Text style={[styles.committeeTitle, { color: dynamicStyles.cardTextColor }]}>
                            {item.committee}
                          </Text>
                          <Text style={[styles.lawDetail, { color: dynamicStyles.cardTextColor }]}>
                            <Text style={styles.boldText}>Position:</Text>
                            {item.position || "N/A"}
                          </Text>
                          <Text style={[styles.lawDetail, { color: dynamicStyles.cardTextColor }]}>
                            <Text style={styles.boldText}>
                              Journal Number:
                            </Text>
                            {item.journalNumber || "N/A"}
                          </Text>
                          {/* Additional details specific to committee */}
                          {item.additionalInfo && (
                            <Text style={[styles.lawDetail, { color: dynamicStyles.cardTextColor }]}>
                              <Text style={styles.boldText}>
                                Additional Info:
                              </Text>
                              {item.additionalInfo}
                            </Text>
                          )}
                        </>
                      ) : (
                        <>
                          <Text style={[styles.lawTitle, { color: dynamicStyles.cardTextColor }]}>{item.title}</Text>
                          {/* Displaying more details about the bill */}
                          <View style={styles.lawDetailsContainer}>
                            <Text style={[styles.lawDetail, { color: dynamicStyles.cardTextColor }]}>
                              <Text style={styles.boldText}>Summary:</Text>
                              {item.summary || "No summary available."}
                            </Text>
                            <Text style={[styles.lawDetail, { color: dynamicStyles.cardTextColor }]}>
                              <Text style={styles.boldText}>Significance:</Text>
                              {item.significance || "N/A"}
                            </Text>
                            <Text style={[styles.lawDetail, { color: dynamicStyles.cardTextColor }]}>
                              <Text style={styles.boldText}>Date Filed:</Text>
                              {item.dateFiled || "N/A"}
                            </Text>
                            <Text style={[styles.lawDetail, { color: dynamicStyles.cardTextColor }]}>
                              <Text style={styles.boldText}>
                                Principal Author/s:
                              </Text>
                              {Array.isArray(item.principalAuthors) &&
                              item.principalAuthors.length > 0
                                ? item.principalAuthors.join(", ")
                                : "N/A"}
                            </Text>
                            {/* Additional details about the bill */}
                            {item.amendments && (
                              <>
                                <Text style={[styles.lawDetail, { color: dynamicStyles.cardTextColor }]}>
                                  <Text style={styles.boldText}>
                                    Amendments:
                                  </Text>
                                  {item.amendments.join(", ") || "None"}
                                </Text>
                              </>
                            )}
                            {/* Adding a link to view full text of the bill */}
                            {item.fullLink && (
                              <TouchableOpacity
                                onPress={() => Linking.openURL(item.fullLink)}
                              >
                                <Text style={[styles.link, styles.lawDetail, { color: "#007bff" }]}>
                                  View Full Text of Bill
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </>
                      )}
                    </Card.Content>
                    {/* Action buttons for sharing or saving */}
                    <Card.Actions style={styles.buttonContainer}>
                      {/* Share button */}
                      <TouchableOpacity
                        onPress={() =>
                          handleShare(
                            `${item.title}\n\n${item.summary}\n\n${item.fullLink}`
                          )
                        }
                        style={styles.actionButton}
                      >
                        <Feather name="share" size={18} color="#007bff" style={{ marginRight: 5 }} />
                        <Text style={[styles.actionButtonText, { color: "#007bff" }]}>Share</Text>
                      </TouchableOpacity>

                      {/* Save button */}
                      <TouchableOpacity
                        onPress={() => saveItem(item.title, item)}
                        disabled={isItemSaved(item.title)}
                        style={styles.actionButton}
                      >
                        {isItemSaved(item.title) ? (
                          <>
                            <MaterialIcons name="bookmark" size={18} color="gray" style={{ marginRight: 5 }} />
                            <Text style={[styles.actionButtonText, { color: "gray" }]}>Saved</Text>
                          </>
                        ) : (
                          <>
                            <MaterialIcons name="bookmark-border" size={18} color="#007bff" style={{ marginRight: 5 }} />
                            <Text style={[styles.actionButtonText, { color: "#007bff" }]}>Save</Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </Card.Actions>
                  </Card>
                )}
                scrollEnabled={!refreshing} // Disable during refresh
                nestedScrollEnabled // Enable nested scrolling for FlatList
                contentContainerStyle={{ flexGrow: 1 }} // Add this for better layout handling
              />
            </View>
          ))}
        </ScrollView>
        {/* Link to view more details */}
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://www.congress.gov.ph/house-members/view/?member=K034&name=Fresnedi%2C+Jaime+R.&page=0"
            )
          }
        >
          <Text style={[styles.viewMoreLink, { color: dynamicStyles.textColor }]}>View More Details</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    backgroundColor: "#003366",
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  contentScrollView: {
    flex: 1,
  },
  page: {
    width,
    height: "100%",
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  card: {
    borderRadius: 12,
    elevation: 3, // Adding shadow
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    backgroundColor: "#fff",
  },
  committeeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  lawTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  lawDetailsContainer: {
    marginBottom: 10,
  },
  lawDetail: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
  },
  boldText: {
    fontWeight: "bold",
    color: "#333",
  },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
  buttonContainer: {
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  actionButton: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "600",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007bff",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  viewMoreLink: {
    fontSize: 16,
    color: "#007bff",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
    textDecorationLine: "underline",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  loadingText: {
    fontSize: 18,
    marginTop: 10,
    color: "#555",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
  },
  errorText: {
    fontSize: 18,
    color: "#cc0000",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#003366",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});