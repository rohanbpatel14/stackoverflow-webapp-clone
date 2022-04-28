import Sequelize from 'sequelize'
import sequelize from '../loaders/sql'

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    full_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_type: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    picture: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    last_seen: {
        type: Sequelize.DATE,
        allowNull: false
    },
    reputation: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    question_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    answer_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    reach: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
},
    {
        timestamps: true,
        updatedAt: false
    }
)

export default User