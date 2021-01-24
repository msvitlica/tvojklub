class TrainingServices {
    constructor(backendUrl){
        this.backendUrl = backendUrl;
    }

    async getAllTrainings(currentDate,abortController) {
        const trainingRequest = await fetch(`${this.backendUrl}/trainings/?date=${currentDate}`, abortController);
        const trainings = await trainingRequest.json();
        return trainings.trainings;
    }
    async saveTraining(trainingObject){
        const saveTrainingRequest = await fetch(`${this.backendUrl}/trainings`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trainingObject)
        });
        return await saveTrainingRequest.json();
    }
}

export default TrainingServices;