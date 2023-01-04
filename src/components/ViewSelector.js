import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';

function areEqual(prevProps, nextProps) {
  return prevProps.viewType === nextProps.viewType; // change when false.
}

function ViewSelector(props) {
  const {viewType, viewChange} = props;
  const [currentView, setCurrentView] = React.useState(0);

  const onPressHandler = () => {
    var current = (currentView + 1) % 4;
    setCurrentView(current);
    viewChange(current);
  };

  return (
    <TouchableHighlight style={styles.btnViewType} onPress={onPressHandler}>
      <Text style={styles.textChage}>Tap to change view Type: {viewType}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  btnViewType: {
    height: 60,
    paddingTop: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textChage: {
    color: 'white',
  },
});
export default React.memo(ViewSelector, areEqual);
