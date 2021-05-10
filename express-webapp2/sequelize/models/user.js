const { Model, Sequelize } = require("sequelize");

// 함수를 내보내겠다. 
module.exports = (sequelize, DataTypes) => {
    // 모델 클래스 선언 - ES6 
    class User extends Model {
        static associate(models) { 
            /* 
                정적 메소드인 이유는 클래스 이름으로 막바로 메소드 호출해야 하니까. 
                매개변수로 models 받는 이유는 db를 넘겨주니까. 
            */
           // 일 대 다 
           models.User.hasMany(models.Board, {foreignKey:"bwriter", sourceKey:"userid"});
           models.User.hasMany(models.Order, {foreignKey:"userid", sourceKey:"userid"});
        }
    }

    //  DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의 
    User.init({  // init(): Model이 가진 정적 메소드 
        userid: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userpassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userauthority: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userenabled: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: false, // createAt과 updateAt 컬럼을 자동으로 만들지 말라는 의미 
    });

    return User; // 모델 클래스 리턴    
};