import Badge from '../models/Badge';
import User from '../models/User';

export const getUserScoreBadges = async (userID) => {
    const badges = []
    try {
        const user = await User.findOne({ where: { id: userID } });
        const currentBadges = await Badge.destroy({ where: { user_id: userID } })

        // checking for Badge: CURIOUS
        const userQuestionCount = user.question_count
        const userAnswerCount = user.answer_count
        const userReputation = user.reputation
        const userUpvotes = user.upvotes
        const userDownvotes = user.downvotes

        if (user.question_count !== 0) {
            if (userQuestionCount <= 2) {
                badges.push({ badge_name: 'Curious', badge_type: 'bronze' })
            } else if (userQuestionCount < 5 && userQuestionCount > 2) {
                badges.push({ badge_name: 'Curious', badge_type: 'silver' })
            } else {
                badges.push({ badge_name: 'Curious', badge_type: 'gold' })
            }
        }

        if (userAnswerCount !== 0) {
            if (userAnswerCount <= 2) {
                badges.push({ badge_name: 'Helpfulness', badge_type: 'bronze' })
            } else if (userAnswerCount < 5 && userAnswerCount > 2) {
                badges.push({ badge_name: 'Helpfulness', badge_type: 'silver' })
            } else {
                badges.push({ badge_name: 'Helpfulness', badge_type: 'gold' })
            }
        }

        if (userReputation !== 0) {
            if (userReputation <= 10) {
                badges.push({ badge_name: 'Popular', badge_type: 'bronze' })
            } else if (userReputation < 15 && userReputation > 10) {
                badges.push({ badge_name: 'Popular', badge_type: 'silver' })
            } else {
                badges.push({ badge_name: 'Popular', badge_type: 'gold' })
            }
        }

        if (userUpvotes !== 0) {
            if (userUpvotes <= 2) {
                badges.push({ badge_name: 'Sportsmanship', badge_type: 'bronze' })
            } else if (userUpvotes < 5 && userUpvotes > 2) {
                badges.push({ badge_name: 'Sportsmanship', badge_type: 'silver' })
            } else {
                badges.push({ badge_name: 'Sportsmanship', badge_type: 'gold' })
            }
        }

        if (userDownvotes !== 0) {
            if (userUpvotes <= 2) {
                badges.push({ badge_name: 'Critic', badge_type: 'bronze' })
            } else if (userUpvotes < 5 && userUpvotes > 2) {
                badges.push({ badge_name: 'Critic', badge_type: 'silver' })
            } else {
                badges.push({ badge_name: 'Critic', badge_type: 'gold' })
            }

            // TODO: BADGES(NOTABLE, FAMOUS) based on --> Views Count for Question and number of comments
        }

        console.log(badges);
        badges.forEach(element => {
            // Sequalize 
        });
        //return cb(null, result);
    } catch (e) {
        console.log(e);
        //return cb(e, null)
    }
}

export const getQuestionScoreBadges = async (user) => {

}