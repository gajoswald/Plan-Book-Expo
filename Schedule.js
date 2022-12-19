import {DateTime, Interval} from 'luxon';
import regularSchedule from './assets/regularSchedule.json';
import specialSchedules from './assets/specialSchedules.json';

export default class Schedule {
  static generateDates() {
    let dates = [];
    let startDate = DateTime.local(2021,9,2);
    let endDate = DateTime.local(2022,6,7);
    let holidays = [DateTime.local(2021,9,6), DateTime.local(2021,9,7), DateTime.local(2021,9,16), DateTime.local(2021,11,24), DateTime.local(2021,11,25),DateTime.local(2021,11,26), DateTime.local(2022,1,17), DateTime.local(2022,2,21), DateTime.local(2022,4,15), DateTime.local(2022,5,30)];
    let noClasses = [DateTime.local(2021,10,8), DateTime.local(2021,10,11), DateTime.local(2021,10,22), DateTime.local(2021,11,19), DateTime.local(2021,11,29), DateTime.local(2022,2,18), DateTime.local(2022,3,11), DateTime.local(2022,4,22)];
    let winterBreak = Interval.fromDateTimes(DateTime.local(2021,12,18), DateTime.local(2022,1,2));
    let springBreak = Interval.fromDateTimes(DateTime.local(2022,3,24), DateTime.local(2022,4,3));
    let skipDays = [...holidays, ...noClasses];
    let today = DateTime.local();
    let currentDate = startDate;
    let currentDateIndex;
    while( currentDate < endDate ) {
      if( currentDate.hasSame( today, 'day' ) ) {
        currentDateIndex = dates.length;
      }
      if( currentDate.weekday != 6 && currentDate.weekday != 7 
        && !skipDays.some( d => d.hasSame( currentDate, 'day')) 
        && !winterBreak.contains(currentDate) 
        && !springBreak.contains(currentDate) ) {
        dates.push(currentDate);
      }
      currentDate = currentDate.plus({days:1});    
    }
    dates.push(endDate);  
    return dates;  
  }

  static generateSchedule() {
    const dates = Schedule.generateDates();
    let alteredScheduleDays = [DateTime.local(2021,10,13), DateTime.local(2022,3,21),DateTime.local(2022,3,22),DateTime.local(2022,3,23),DateTime.local(2022,5,29),DateTime.local(2022,6,1),DateTime.local(2022,6,2),DateTime.local(2022,6,3),DateTime.local(2022,6,8),DateTime.local(2022,6,7),DateTime.local(2022,6,8)]    
    const schedule = { 
      description: "US - 2021-2022",
      dailySchedule: []
    };
    for( let i = 0; i < dates.length; i++ ) {
      const date = dates[i];
      const formatted = date.toFormat('yyyy-MM-dd');
      schedule.dailySchedule.push( specialSchedules.find( s => s.date === date.toFormat('yyyy-MM-dd') ) || { date: formatted, notes:[], schedule: regularSchedule[i%7].schedule } );      
    }
    return schedule;
  }
}