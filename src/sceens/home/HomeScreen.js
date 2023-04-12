import React, { useEffect } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RecyclerListView, DataProvider } from "recyclerlistview";
import { ModalPortal } from "react-native-modals";
import { useDispatch, useSelector } from "react-redux";
import ImageRender from "../../components/ImageRender";
import ViewSelector from "../../components/ViewSelector";
import { getData } from "../../until/DataUntil";
import { GetLayoutProvider } from "../../until/LayoutUntil";
import { getDataImage, updateLoading } from "../../redux/actions";
import LoadingIndicator from "../../components/LoadingIndicator";
import Constants from "../../constants";

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.appReduces.isLoading);

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
    dispatch(getDataImage(count, 20));

    const image = await getData(count, 20);
    setDataProvider(dataProvider.cloneWithRows(images.concat(image)));
    setImages(images.concat(image));
    setCount(count + 20);
    dispatch(updateLoading(false));
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
          console.log("index:  ", JSON.stringify(index));
          if (index == 0) {
            navigation.navigate(Constants.IMAGE_DETAIL);
          } else {
            handlerClickImage(indexImage);
          }
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
      {isLoading && <LoadingIndicator />}
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

export default HomeScreen;
