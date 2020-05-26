import "jest";
import TripService from '../src/trip/TripService'
import User from "../src/user/User";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import Trip from "../src/trip/Trip";

describe("TripServiceShould", () => {
    it("throws an error when user not logged in", () => {
        class TripServiceTest extends TripService {
            public getLoggedUserFromUserService(): User {
                return null
            }
        }
        // GIVEN
        const tripService = new TripServiceTest()
        const userToCheck = new User()
        // WHEN
        try {
            tripService.getTripsByUser(userToCheck)
        } catch(err) {
            // THEN
            expect(err).toBeInstanceOf(UserNotLoggedInException);
        } 
    })

    it("returns an empty tripList when user has no friend", () => {
        class TripServiceTest extends TripService {
            public getLoggedUserFromUserService(): User {
                return new User()
            }
        }
        // GIVEN
        const tripService = new TripServiceTest()
        const userToCheck = new User()
        userToCheck.getFriends()
        // WHEN
        const expectedResult = tripService.getTripsByUser(userToCheck)
        tripService.getTripsByUser(userToCheck)
        // THEN
        expect(expectedResult).toEqual(<Trip[]>[])
    })

    it("returns an empty tripList when user has one friend but not loggued", () => {
        class TripServiceTest extends TripService {
            public getLoggedUserFromUserService(): User {
                return new User()
            }
        }
        // GIVEN
        const tripService = new TripServiceTest()
        const userToCheck = new User()
        userToCheck.addFriend(new User())
        userToCheck.getFriends()
        // WHEN
        const expectedResult = tripService.getTripsByUser(userToCheck)
        // THEN
        expect(expectedResult).toEqual(<Trip[]>[])
    })

    it("returns a tripList with one trip when user has is our friend", () => {
        const loggedUser = new User()
        class TripServiceTest extends TripService {
            public getLoggedUserFromUserService(): User {
                return loggedUser
            }
            public getTripListFromUser(): Trip[] {
                return [new Trip()]
            }
        }
        // GIVEN
        const tripService = new TripServiceTest()
        const userToCheck = new User()
        
        userToCheck.addFriend(loggedUser)
        userToCheck.getFriends()
        userToCheck.addTrip(new Trip())
        // WHEN
        const expectedResult = tripService.getTripsByUser(userToCheck)
        // THEN
        expect(expectedResult).toEqual(<Trip[]>[new Trip()])
    })
});
