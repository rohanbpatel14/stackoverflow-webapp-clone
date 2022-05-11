import sequelize from '../loaders/sql';

const Badge = sequelize.define('Badge', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    badge_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    badge_type: {
        type: sequelize.ENUM("bronze", "silver", "gold"),
        allowNull: false
    },
    user_id: {
        type: sequelize.STRING,
        allowNull: false
    },
},
    {
        timestamps: true,
        updatedAt: false
    }
)

export default Badge;