/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RecyclerListView, DataProvider } from "recyclerlistview";
import ImageRender from "./src/components/ImageRender";
import ViewSelector from "./src/components/ViewSelector";
import { getData } from "./src/until/DataUntil";
import { GetLayoutProvider } from "./src/until/LayoutUntil";
import { ModalPortal } from "react-native-modals";
import { useDispatch, useSelector } from "react-redux";
import { updateLoading } from "./src/redux/actions";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state);
  console.log("isLoading: ", JSON.stringify(isLoading));
  const [dataProvider, setDataProvider] = React.useState(
    new DataProvider((r1, r2) => {
      return r1 != r2;
    })
  );

  const [layoutProvider, setLayoutProvider] = React.useState(
    GetLayoutProvider(0)
  );
  const [images, setImages] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [viewType, setViewType] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = async () => {
    dispatch(updateLoading(true));
    const image = await getData(count, 20);
    setDataProvider(dataProvider.cloneWithRows(images.concat(image)));
    setImages(images.concat(image));
    setCount(count + 20);
  };

  // Click item image.
  const handlerClickImage = (indexImage) => {
    //todo.
  };

  const rowRenderer = (type, data, index) => {
    return (
      <ImageRender
        imageUrl={data}
        indexImage={index}
        handlerOnClick={(indexImage) => {
          handlerClickImage(indexImage);
        }}
      />
    );
  };

  const viewChangehanlder = (viewType) => {
    setLayoutProvider(GetLayoutProvider(viewType));
    setViewType(viewType);
  };

  const handleListEnd = () => {
    fetchMoreData();
    // set state empty.
  };

  const renderFooter = () => {
    return (
      <ActivityIndicator style={{ margin: 10 }} size="large" color={"black"} />
    );
  };

  return (
    <View style={styles.container}>
      <ViewSelector
        viewType={viewType}
        viewChange={(viewType) => {
          viewChangehanlder(viewType);
        }}
      />
      {count > 0 ? (
        <RecyclerListView
          style={styles.recyclerView}
          contentContainerStyle={{ margin: 3 }}
          onEndReached={handleListEnd}
          dataProvider={dataProvider}
          layoutProvider={layoutProvider}
          rowRenderer={(type, data, index) => rowRenderer(type, data, index)}
          renderFooter={renderFooter}
          scrollViewProps={{
            refreshControl: (
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  setLoading(true);
                  //todo
                  setTimeout(() => {
                    setLoading(false);
                  }, 3000);
                }}
              />
            ),
          }}
        />
      ) : null}
      <ModalPortal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recyclerView: {
    flex: 1,
  },
});

export default App;
