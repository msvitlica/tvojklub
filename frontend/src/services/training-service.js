class TrainingServices {
    constructor(backendUrl){
        this.backendUrl = backendUrl;
    }

    async getAllTrainings(currentDate,abortController) {
        const trainingRequest = await fetch(`${this.backendUrl}/trainings/?date=${currentDate}`, abortController);
        const trainings = await trainingRequest.json();
        return trainings.trainings;
    }
}

export default TrainingServices;