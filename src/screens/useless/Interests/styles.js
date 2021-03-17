import { StyleSheet, Dimensions } from 'react-native';
import { registration } from '../../AppStyles';

// screen sizing
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const ICONNumColums = 3;
// item size
const ICON_ITEM_OFFSET = 20;
const ICON_ITEM_MARGIN = ICON_ITEM_OFFSET * 2;

const styles = StyleSheet.create({
  container: registration.container,
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: ICON_ITEM_OFFSET,
    marginTop: 20,
    width: (SCREEN_WIDTH - ICON_ITEM_OFFSET) / ICONNumColums - ICON_ITEM_MARGIN,
    height: (SCREEN_WIDTH - ICON_ITEM_OFFSET) / ICONNumColums - ICON_ITEM_MARGIN,
    borderColor: '#ffff',
    backgroundColor: '#ffff',
    borderRadius: 60
  },
  selectedCardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: ICON_ITEM_OFFSET,
    marginTop: 20,
    width: (SCREEN_WIDTH - ICON_ITEM_OFFSET) / ICONNumColums - ICON_ITEM_MARGIN,
    height: (SCREEN_WIDTH - ICON_ITEM_OFFSET) / ICONNumColums - ICON_ITEM_MARGIN,
    borderColor: '#7265E3',
    backgroundColor: '#7265E3',
    borderRadius: 60
  },
  cardImg: {
    margin: 5,
    width: (SCREEN_WIDTH - ICON_ITEM_OFFSET) / ICONNumColums - ICON_ITEM_MARGIN - 35,
    height: (SCREEN_WIDTH - ICON_ITEM_OFFSET) / ICONNumColums - ICON_ITEM_MARGIN - 35
  },
  cardTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#2d3142',
    marginTop: 5
  },
  mainText: {
    fontSize: 24,
    margin: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2d3142'
  },
  middleContainer: {
    marginTop: 40
  }
});

export default styles;
