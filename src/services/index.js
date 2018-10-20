import AccountService from './accountService';
import GoalService from './goalService';

// register services here
let accountService = new AccountService(),
    goalService = new GoalService();

export {
    accountService,
    goalService
};

