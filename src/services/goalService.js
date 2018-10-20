import apiClient from './../utils/apiClient';

class GoalService{
    
    getGoals(){
        return apiClient.post('goals/userGoals', {});
    }
}

export default GoalService;