import Badge from '../models/badge';
import User from '../models/User';

export const getAllBadges = async (userID) => {
    try {
        const userBadges = await Badge.findAll({
            where: {
                user_id: userID
            }
        })
        console.log(`User Badges for ${userID} : ${userBadges}`);
        return userBadges;

    } catch (error) {
        console.log(error)
        return null;
    }
}


// FOR TESTING AND ADDING BADGES THROUGH POSTMAN/Manual call ONLY
export const postABadge = async (badgeData) => {
    const { badge_name, badge_type, user_id } = badgeData
    console.log(badgeData, typeof (badgeData.user_id));
    try {
        const badge = await Badge.create({
            badge_name: badgeData.badge_name,
            badge_type: badgeData.badge_type,
            user_id: badgeData.user_id
        });
        var message = {
            message: 'badge added!',
            badge: badge
        }
        return message
    } catch (e) {
        console.log(e)
        return null;
    }
}

export const getQuestionScoreBadges = async (user) => {

}