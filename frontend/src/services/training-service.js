import BaseService from './base-service';
 
class TrainingServices extends BaseService {
   constructor(url,message){
       super(url,message)
   }
    async getAllTrainings(currentDate) {
        const trainingRequest = await fetch(`${this.backendUrl}/trainings/?date=${currentDate}`);
        const trainings = await trainingRequest.json();
        return trainings.trainings;
    }
}
export default TrainingServices;