// const periods = ["A","B","C","D","E","F","G","H"];
// const skips = [["F","G"],["C","D"],["A","G","H"],["D","E"],["A","B"],["E","F","H"],["B","C"]];
// const allPeriods = ["A1","B1","C1","D1","E1","H1","A2","B2","E2","F2","G2","H2","B3","C3","D3","E3","F3","A4","B4","C4","F4","G4","H4","C5","D5","E5","F5","G5","H5","A6","B6","C6","D6","G6","A7","D7","E7","F7","G7","H7"];
// const allPeriods = skips.reduce( (arr, skip, i) => [...arr, ...periods.filter( p => !skip.includes(p) ).map( p => `${p}${i+1}`)],[] );

  // const [checks, setChecks] = React.useState([B,C,D,A1,D1,H1,E2,F3,B4,F5,G5,C6,H7]);
  // const [checks, setChecks] = React.useState({A:true,B:true,C:true,D:true,E:true,F:true,G:true,H:true,Community: true, Meeting:true,Lunch:true,Flex:true});
  // const [individualPeriodChecks, setIndividualPeriodChecks] = React.useState( allPeriods.reduce((obj,period) => {
  //   obj[period] = true
  //   return obj;
  // },{}));
  // const [periodChecks, setPeriodChecks] = React.useState({A:true,B:true,C:true,D:true,E:true,F:true,G:true,H:true});
  // const [usTimeChecks, setUSTimeChecks] = React.useState({Break: true, Community: true, Meeting:true,Lunch:true,Flex:true});

                //   <View>
                //   {periodCheckboxes}
                // </View>
                // <View>
                //   {usTimeCheckboxes}       
                // </View>