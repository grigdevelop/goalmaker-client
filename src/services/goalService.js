import apiClient from './../utils/apiClient';

class GoalService{
    
    getGoals(){
        return apiClient.post('goals/userGoals', {});
    }

    createGoal(goal){
        return apiClient.post('goals/create', goal);
    }
}

export default GoalService;