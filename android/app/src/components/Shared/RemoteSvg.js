import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SvgUri } from 'react-native-svg';

const RemoteSvg = ({ uri }) => {
  return (
        <View style={styles.container}>
          <SvgUri width="100" height="100" uri={uri} />
        </View>
      );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 20 },
  title: { marginTop: 10, fontSize: 16, fontWeight: 'bold' },
});

export default RemoteSvg;
