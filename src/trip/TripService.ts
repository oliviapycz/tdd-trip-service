import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
    public getTripsByUser(userToCheck: User): Trip[] {
        let tripList: Trip[] = [];
        const loggedUser: User = this.getLoggedUserFromUserService();

        if (loggedUser != null) {
    
            // tripList = this.isFriendWithUserToCheck(userToCheck, loggedUser)
            //     ? this.getTripListFromUser(userToCheck)
            //     : [];

            if (this.isFriendWith(userToCheck, loggedUser)) {
                tripList = this.getTripListFromUser(userToCheck);
            }

            return tripList;
        } else {
            throw new UserNotLoggedInException();
        }
    }

    public getLoggedUserFromUserService(): User {
        return UserSession.getLoggedUser();
    }

    public getTripListFromUser(userToCheck): Trip[] {
        return TripDAO.findTripsByUser(userToCheck);
    }

    private isFriendWith(userToCheck, loggedUser): boolean {
        for (const friend of userToCheck.getFriends()) {
            if (friend === loggedUser) {
                return true;
            }
            return false;
        }
    }
}
