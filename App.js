import * as React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';
import Schedule from './Schedule';
import {DateTime} from 'luxon';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { Card, Paragraph, Checkbox, Portal, Provider as PaperProvider, Modal, FAB, DefaultTheme, ProgressBar, ToggleButton } from 'react-native-paper';
import defaultChecks from './checks.json';
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#003b70',
    accent: '#cf0a2c',
    background: '#003b70',
    text: '#003b70',
  },
};



export default function App() {
  // const getSelectedPeriods = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('selectedPeriods');
  //     if(value !== null) {
  //       setChecks( JSON.parse(value) );
  //     }
  //   } catch(e) {
  //     // error reading value
  //   }
  // }  

  // const saveSelectedPeriods = async () => {
  //   try {
  //     const jsonValue = JSON.stringify(checks);
  //     await AsyncStorage.setItem('selectedPeriods', jsonValue)
  //   } catch (e) {
  //     // saving error
  //   }    
  // }

  // React.useEffect(() => {
  //    getSelectedPeriods();
  // }); 
  const [schedule, setSchedule] = React.useState( Schedule.generateSchedule() );

  let today = DateTime.local().toFormat('yyyy-MM-dd');
  // let schedule = Schedule.generateSchedule(); 
  let currentDateIndex = schedule.dailySchedule.findIndex( date => date.date === today );

  const renderItem = (item, index) => {
    let schedule = [];
    for( let i = 0; i < item.notes.length; i++ ) {
      schedule.push(<Paragraph key={`note-${i}-${item.date}`} style={styles.scheduleNotes}>{item.notes[i]}</Paragraph>);
    }
    for( const block of item.schedule) {
      let [period,times] = block.split(':');
      // if( periodChecks[p] || usTimeChecks[p] ) {
        schedule.push(<Paragraph key={period+"-"+item.date} style={styles.paragraph}>{block}</Paragraph>);
      // }
      
    }    //toFormat('EEEE MMMM dd, yyyy')
    return (
    <Card style={styles.scheduleCard}>
      <Card.Title title={item.date} subtitle={`Day ${(index%7)+1}`} />
      <Card.Content>
        {schedule}
      </Card.Content>
    </Card>
  );
  }

  const [flatListRef, setFlatListRef] = React.useState(null);
  const [checks, setChecks] = React.useState(defaultChecks);
  console.log(checks);

  // const [checks, setChecks] = React.useState({
  //   all: true,
  //   classes: periods.reduce((obj,period)=> {
  //     obj[period] = {
  //       selected: true,
  //       individualPeriods: allPeriods.filter( p => p.charAt(0) === period ).reduce( (subObj, subPeriod) => {
  //         subObj[subPeriod] = true;
  //         return subObj;
  //       }, {})
  //     }
  //     return obj
  //   },{}),
  //   usTime: {
  //     selected: true,
  //     individualPeriods: ["Meeting","Break", "Community","Lunch","Flex"].reduce( (obj,period) => {
  //       obj[period] = true; 
  //       return obj;
  //     },{})
  //   }
  // })



  const [settingsVisible, setSettingsVisible] = React.useState(false);

  const showModal = () => {
    // fetch settings
    setSettingsVisible(true);
  }

  const hideModal = () => {
    // save settings
    setSettingsVisible(false);
    // saveSelectedPeriods();

  }

  const [groupOpen,setGroupOpen] = React.useState(false);
  
  const flipCheck = (period, checkSet, updater) => {
    const newCheckSet  = {...checkSet};
    newCheckSet[period] = !checkSet[period];
    updater(newCheckSet);
  }

  // const createCheckSet = (checkSet, updater) => {
  //   return Object.keys(checkSet).map( period => {
  //     let rPeriods;
  //     if( !checkSet[period] ) {
  //       rPeriods = allPeriods.filter( p => p.charAt(0) === period );
  //       // then create checkboxes that match rPeriods
  //     }
  //     return (
  //       <View style={styles.checkSet}>
  //         <Text>{period}</Text>
  //         <Checkbox status={checkSet[period] ? 'checked' : 'unchecked' } onPress={() => flipCheck(period, checkSet, updater)}/>
  //       </View>
  //     )
  //   });
  // }

  // const periodCheckboxes = createCheckSet( periodChecks, setPeriodChecks);
  // const usTimeCheckboxes = createCheckSet( usTimeChecks, setUSTimeChecks);
  const classToggles = Object.keys(checks.classes).map( period => 
    <ToggleButton 
      icon=<MaterialCommunityIcons name={`alpha-${period.toLowerCase()}-circle-outline`} color="black"/>
      status={checks.classes[period] ? "checked" : "unchecked"}
    />
  );

  return (
    <PaperProvider theme={theme}>
      <Portal>
        <View style={styles.container}>
          <FlatList
            data={schedule.dailySchedule}
            ref={(ref)=>setFlatListRef(ref)}
            renderItem={({item,index}) => renderItem(item,index)}
            keyExtractor={item => item.date}
            initialScrollIndex={currentDateIndex}
          />
        </View>    
        <FAB.Group
          open={groupOpen}
          icon={groupOpen ? 'close' : 'plus'}
          actions={[{
            icon:'check',
            label:'Periods',
            onPress: showModal,
          },
          {
            icon:'calendar-today',
            label:'Today',
            onPress: () => flatListRef.scrollToIndex({animated: true, index: currentDateIndex}),
          }
          ]}
          onStateChange={({open}) => setGroupOpen(open)}
          style={styles.fab}
          small
        />    
        <Modal animationType="slide" visible={settingsVisible} onDismiss={hideModal} >
          <View style={styles.centeredView}>
            <Card style={styles.modalView}>
              <Card.Title title="Settings" subtitle="Eventually, you can select individual occurences" />
              <Card.Content>
                <Paragraph>Select a Period</Paragraph>
                <View style={styles.checkSet}>
                  {classToggles}
                </View>
              </Card.Content>
            </Card>
          </View>
        </Modal>                
      </Portal>          

    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  checks: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  checkSet: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  scheduleNotes: {
    margin: 12,
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.accent,
  },
  paragraph: {
    margin: 12,
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },  
  scheduleCard: {
    marginBottom: 4,
  },
});