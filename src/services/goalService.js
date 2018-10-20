import HttpMock from './../utils/httpMock';
import { Data } from './../utils/mockDb';

class GoalService{
    
    getGoals(){
        return HttpMock.post(() => {
            return Data('goals');
        });
    }
}

export default GoalService;